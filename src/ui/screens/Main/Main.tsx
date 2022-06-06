/* eslint-disable max-len */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  PermissionsAndroid,
  StyleSheet,
  View,
} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { addDevice, clearScannedDevices } from '../../../store/main/mainSlice';
import { useTypedDispatch, useTypedSelector } from '../../../store/store';
import Button from '../../components/Button';
import { NavigationAppStack } from '../../navigation/AppNavigation';
import SelectedDevice from './components/SelectedDevice';
import BluetoothLogo from '../../../assets/bluetooth-svgrepo-com.svg';
import MechanumWheelLogo from '../../../assets/mecanum_wheel.svg';

const manager = new BleManager();

const Main: React.FC = () => {
  const scannedDevices = useTypedSelector(({ main }) => main.scannedDevices);
  const selectedDeviceIndex = useTypedSelector(({ main }) => main.selectedDeviceIndex);

  const dispatch = useTypedDispatch();
  const { navigate } = useNavigation<NavigationAppStack<'Main'>>();

  const [isLoading, setIsLoading] = useState(false);

  const scanDevices = () => {
    setIsLoading(true);
    manager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        Alert.alert(error.name, error.message);
      }
      if (scannedDevice) {
        dispatch(addDevice(scannedDevice));
      }
    });
    setTimeout(() => {
      manager.stopDeviceScan();
      setIsLoading(false);
    }, 5000);
  };

  useEffect(() => {
    (async () => {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    })();
    return () => {
      manager.destroy();
    };
  }, []);

  return (
    <View style={styles.сontainer}>
      <BluetoothLogo style={styles.logo} width={100} height={100} />
      <MechanumWheelLogo style={styles.mechanum} height={140} />
      {(selectedDeviceIndex !== null) && <SelectedDevice device={scannedDevices[selectedDeviceIndex]} />}
      <Button
        title="JOYSTICK"
        onPress={() => navigate('Joystick')}
      />
      <Button
        title="QUADRUPED"
        onPress={() => navigate('Quadruped')}
      />
      <Button
        title={`DEVICE LIST (${scannedDevices.length})`}
        onPress={() => navigate('DeviceList')}
        disabled={!scannedDevices.length}
      />
      <Button
        title="SCAN DEVICES"
        onPress={scanDevices}
        loading={isLoading}
      />
      <Button
        title="CLEAR DEVICES"
        onPress={() => dispatch(clearScannedDevices())}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  сontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  mechanum: {
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default Main;
