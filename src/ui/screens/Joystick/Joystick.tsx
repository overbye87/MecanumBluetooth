import { useNavigation } from '@react-navigation/native';
import React, { memo, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator, Alert, SafeAreaView, StatusBar, StyleSheet, View,
} from 'react-native';
import { BleError, Device } from 'react-native-ble-plx';
import { config } from '../../../config';
import { useTypedSelector } from '../../../store/store';
import { toBase64 } from '../../../utils/base64';
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
    // if (x1 !== prevX1 || y1 !== prevY1 || x2 !== prevX2 || y2 !== prevY2) {

    if (JSON.stringify(position.current) !== JSON.stringify(prevPosition.current)) {
      console.log('*');
      console.log('curr', position.current);
      console.log('prev', prevPosition.current);
      console.log('=');

      const message = `$${x1} ${y1};${x2}@${y2}!`;
      prevPosition.current = position.current;
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

  enum IndexNumbers {
    first = 1,
    second = 2,
  }

  const handleOnValue = (x: number, y: number, i: IndexNumbers) => {
    console.log(x,y,i)
    prevPosition.current[`x${i}`] = position.current[`x${i}`];
    prevPosition.current[`y${i}`] = position.current[`y${i}`];
    position.current[`x${i}`] = Math.round(x * config.scaleFactor);
    position.current[`y${i}`] = Math.round(y * config.scaleFactor);
  };

  return (
    <View style={styles.сontainer}>
      <MultiTouchJoyStick
        onValue={
          (x, y) => {
            handleOnValue(x, y, IndexNumbers.first);
          }
        }
      />
      {!isConnected && <ActivityIndicator size="large" />}
      <MultiTouchJoyStick
        onValue={
          (x, y) => {
            handleOnValue(x, y, IndexNumbers.second);
          }
        }
      />
      <BackButton
        style={styles.backButton}
        onPress={() => navigate('Main')}
      />
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
  backButton: {
    position: 'absolute',
    bottom: 15,
    left: 15,
  },
});

export default Joystick;
