/* eslint-disable max-len */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  PermissionsAndroid,
  View,
} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { PERMISSIONS, requestMultiple, RESULTS } from 'react-native-permissions';
import { addDevice, clearScannedDevices } from '../../../store/main/mainSlice';
import { useTypedDispatch, useTypedSelector } from '../../../store/store';
import Button from '../../components/Button';
import { NavigationAppStack } from '../../navigation/AppNavigation';
import SelectedDevice from './components/SelectedDevice';
import BluetoothLogo from '../../../assets/bluetooth-svgrepo-com.svg';
import MechanumWheelLogo from '../../../assets/mecanum_wheel.svg';
import { styles } from './Main.style';

const manager = new BleManager();

const Main: React.FC = () => {
  const scannedDevices = useTypedSelector(({ main }) => main.scannedDevices);
  const selectedDeviceIndex = useTypedSelector(({ main }) => main.selectedDeviceIndex);

  const dispatch = useTypedDispatch();
  const { navigate } = useNavigation<NavigationAppStack<'Main'>>();

  const [isLoading, setIsLoading] = useState(false);

  const handleScanDevices = () => {
    setIsLoading(true);
    manager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        Alert.alert(error.name, JSON.stringify(error, null, 2));
      }
      if (scannedDevice) {
        dispatch(addDevice(scannedDevice));
      }
    });
    setTimeout(() => {
      manager.stopDeviceScan();
      setIsLoading(false);
    }, 3000);
  };

  const requestPermissions = async () => {
    const statuses = await requestMultiple([
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    ]);

    Object.keys(statuses).forEach((key) => {
      if (statuses[key] !== RESULTS.GRANTED) {
        Alert.alert('Statuses', JSON.stringify(key, null, 2));
      }
    });
  };

  useEffect(() => {
    requestPermissions();
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
      {/* <Button
        title="QUADRUPED"
        onPress={() => navigate('Quadruped')}
      /> */}
      <Button
        title={`DEVICE LIST (${scannedDevices.length})`}
        onPress={() => navigate('DeviceList')}
        disabled={!scannedDevices.length}
      />
      <Button
        title="SCAN DEVICES"
        onPress={handleScanDevices}
        loading={isLoading}
      />
      <Button
        title="CLEAR DEVICES"
        onPress={() => dispatch(clearScannedDevices())}
      />
    </View>
  );
};

export default Main;
