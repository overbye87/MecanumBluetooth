import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert, PermissionsAndroid, StyleSheet, Text, View,
} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { addDevice, clearScannedDevices } from '../../../store/main/mainSlice';
import { useTypedDispatch, useTypedSelector } from '../../../store/store';
import Button from '../../components/Button';
import { NavigationAppStack } from '../../navigation/AppNavigation';

const manager = new BleManager();

const Main: React.FC = () => {
  const scannedDevices = useTypedSelector(({ main }) => main.scannedDevices);
  const dispatch = useTypedDispatch();
  const { navigate } = useNavigation<NavigationAppStack<'Main'>>();

  const [isLoading, setIsLoading] = useState(false);

  const scanDevices = () => {
    setIsLoading(true);
    navigate('DeviceList');
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
      <Button title="JOYSTICK" onPress={() => navigate('Joystick')} />
      <Button title="DEVICE LIST" onPress={() => navigate('DeviceList')} disabled={!scannedDevices.length} />
      <Button title="SCAN DEVICES" onPress={scanDevices} loading={isLoading} />
      <Button title="CLEAR DEVICES" onPress={() => dispatch(clearScannedDevices())} />
    </View>
  );
};

const styles = StyleSheet.create({
  сontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

export default Main;
