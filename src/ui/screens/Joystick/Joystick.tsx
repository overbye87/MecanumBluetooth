import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator, Alert, SafeAreaView, StatusBar, StyleSheet, View,
} from 'react-native';
import { BleError, Device } from 'react-native-ble-plx';
import { useTypedSelector } from '../../../store/store';
import { toBase64 } from '../../../utils/base64';
import { NavigationAppStack } from '../../navigation/AppNavigation';
import BackButton from './components/BackButton';
import MultiTouchJoyStick from './components/MultiTouchJoyStick';

const interval = 50; // ms
const scaleFactor = 60; // maximum position value

interface IPosition {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const Joystick: React.FC = () => {
  const { navigate } = useNavigation<NavigationAppStack<'Joystick'>>();
  const [isConnected, setIsConnected] = useState(false);
  const scannedDevices = useTypedSelector(({ main }) => main.scannedDevices);
  const selectedDeviceIndex = useTypedSelector(({ main }) => main.selectedDeviceIndex);

  const position = useRef<IPosition>({
    x1: 0, y1: 0, x2: 0, y2: 0,
  });
  const prevPosition = useRef<IPosition>({
    x1: 0, y1: 0, x2: 0, y2: 0,
  });

  const send = async (device: Device, text: string) => {
    console.log(text);
    try {
      // const message = toBase64(`${text}\r\n`);
      const message = toBase64(`${text}`);
      const serviceUUIDs = '0000ffe0-0000-1000-8000-00805f9b34fb';
      const offei = '0000ffe1-0000-1000-8000-00805f9b34fb';
      await device.writeCharacteristicWithoutResponseForService(
        serviceUUIDs,
        offei,
        message,
      );
    } catch (error) {
      const { reason, message } = error as BleError;
      Alert.alert(message, reason as string);
    }
  };

  const tick = () => {
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
    <SafeAreaView
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
    </SafeAreaView>
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
