import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
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

const interval = 50; // ms
const scaleFactor = 60; // maximum position value

interface IPosition {
  x1: number; y1: number; x2: number; y2: number;
  prevX1: number, prevY1: number, prevX2: number, prevY2: number,
}

const Joystick: React.FC = () => {
  const { navigate } = useNavigation<NavigationAppStack<'Joystick'>>();
  const [isConnected, setIsConnected] = useState(false);
  const isConnectedRef = useRef(false);
  const scannedDevices = useTypedSelector(({ main }) => main.scannedDevices);
  const selectedDeviceIndex = useTypedSelector(({ main }) => main.selectedDeviceIndex);

  const position = useRef<IPosition>({
    x1: 0, y1: 0, x2: 0, y2: 0,
    prevX1: 0, prevY1: 0, prevX2: 0, prevY2: 0,
  });
  const prevPosition = useRef<IPosition>({
    x1: 0, y1: 0, x2: 0, y2: 0,
  });

  const send = async (device: Device, value: string) => {
    try {
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
      x1, y1, x2, y2,
    } = position.current;

    if (JSON.stringify(position.current) !== JSON.stringify(prevPosition.current)) {
      const message = `$${position.current.x1} ${position.current.y1};${position.current.x2}@${position.current.y2}!`;
      prevPosition.current.x1 = position.current.x1;
      prevPosition.current.y1 = position.current.y1;
      prevPosition.current.x2 = position.current.x2;
      prevPosition.current.y2 = position.current.y2;
      console.log('isConnected from tick:', isConnected);
      if ((selectedDeviceIndex !== null)) {
        send(scannedDevices[selectedDeviceIndex], message);
      }
    }
  };

  const connect = async (device: Device) => {
    try {
      if (!await device.isConnected()) {
        await device.connect();
      }
      const result = await device.discoverAllServicesAndCharacteristics();
      // Alert.alert('discoverAllServicesAndCharacteristics', JSON.stringify(result.name, null, 2));
      console.log('connacted:', await device.isConnected());
      setIsConnected(true);
      isConnectedRef.current = true;
    } catch (error) {
      const { reason, message } = error as BleError;
      Alert.alert(message, reason as string);
    }
  };

  useEffect(() => {
    console.log('selectedDeviceIndex:', selectedDeviceIndex);
    if (selectedDeviceIndex !== null) {
      connect(scannedDevices[selectedDeviceIndex]);
    }
    const timerInterval = setInterval(tick, interval);
    return (() => {
      clearInterval(timerInterval);
    });
  }, []);

  console.log('render Joystick');

  return (
    <View
      style={styles.сontainer}
    >
      <MultiTouchJoyStick
        onValue={(x, y) => {
          prevPosition.current.x1 = position.current.x1;
          prevPosition.current.y1 = position.current.y1;
          position.current.x1 = Math.round(x * scaleFactor);
          position.current.y1 = Math.round(y * scaleFactor);
        }}
      />
      {!isConnected && <ActivityIndicator size="large" />}
      <BackButton style={{ position: 'absolute', bottom: 15, left: 15 }} onPress={() => navigate('Main')} />
      <MultiTouchJoyStick
        onValue={(x, y) => {
          prevPosition.current.x2 = position.current.x2;
          prevPosition.current.y2 = position.current.y2;
          position.current.x2 = Math.round(x * scaleFactor);
          position.current.y2 = Math.round(y * scaleFactor);
        }}
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
});

export default Joystick;
