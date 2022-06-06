import { useNavigation } from '@react-navigation/native';
import React, {
  useEffect, useRef, useState,
} from 'react';
import {
  ActivityIndicator, Alert, StyleSheet, View,
} from 'react-native';
import { BleError, Device } from 'react-native-ble-plx';
import { config } from '../../../config';
import { useTypedSelector } from '../../../store/store';
import { toBase64 } from '../../../utils/base64';
import Button from '../../components/Button';
import { NavigationAppStack } from '../../navigation/AppNavigation';
import BackButton from './components/BackButton';
import MultiTouchJoyStick from './components/MultiTouchJoyStick';

interface IPosition {
  x1: number; y1: number; x2: number; y2: number;
}

const Joystick: React.FC = () => {
  const { navigate } = useNavigation<NavigationAppStack<'Joystick'>>();
  const [isConnected, setIsConnected] = useState(false);
  const isConnectedRef = useRef(false);
  const scannedDevices = useTypedSelector(({ main }) => main.scannedDevices);
  const selectedDeviceIndex = useTypedSelector(({ main }) => main.selectedDeviceIndex);

  const position = useRef<IPosition>({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });
  const prevPosition = useRef<IPosition>({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });

  const send = async (device: Device, value: string) => {
    try {
      console.log(value);
      await device.writeCharacteristicWithoutResponseForService(
        config.bluetooth.serviceUUID,
        config.bluetooth.characteristicUUID,
        toBase64(value),
      );
    } catch (error) {
      const { reason, message } = error as BleError;
      Alert.alert(message, reason as string);
    }
  };

  const scale = (n: number): number => Math.round(n * config.scaleFactor);

  const tick = () => {
    const {
      x1,
      y1,
      x2,
      y2,
    } = position.current;
    const {
      x1: prevX1,
      y1: prevY1,
      x2: prevX2,
      y2: prevY2,
    } = prevPosition.current;
    if (x1 !== prevX1 || y1 !== prevY1 || x2 !== prevX2 || y2 !== prevY2) {
      const message = `$${scale(x1)} ${scale(y1)};${scale(x2)}@${scale(y2)}!`;
      prevPosition.current = { ...position.current };
      if ((selectedDeviceIndex !== null) && isConnectedRef.current) {
        send(scannedDevices[selectedDeviceIndex], message);
      }
    }
  };

  const connect = async (device: Device) => {
    try {
      if (!await device.isConnected()) {
        await device.connect();
      }
      await device.discoverAllServicesAndCharacteristics();
      setIsConnected(true);
      isConnectedRef.current = true;
    } catch (error) {
      const { reason, message } = error as BleError;
      Alert.alert(message, reason as string);
    }
  };

  useEffect(() => {
    if (selectedDeviceIndex !== null) {
      connect(scannedDevices[selectedDeviceIndex]);
    }
    const timerInterval = setInterval(tick, config.interval);
    return (() => {
      clearInterval(timerInterval);
    });
  }, []);

  return (
    <View style={styles.сontainer}>
      <MultiTouchJoyStick
        onValue={
          (x, y) => {
            position.current = { ...position.current, x1: x, y1: y };
          }
        }
      />
      {!isConnected && <ActivityIndicator size="large" />}
      <MultiTouchJoyStick
        onValue={
          (x, y) => {
            position.current = { ...position.current, x2: x, y2: y };
          }
        }
      />
      {/* <BackButton
        style={styles.backButton}
        onPress={() => navigate('Main')}
      /> */}
      <View style={styles.buttonContainer}>
        <Button
          title="BACK"
          onPress={() => navigate('Main')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  сontainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 80,
    left: 0,
  },
});

export default Joystick;
