/* eslint-disable max-len */
/* eslint-disable react/no-this-in-sfc */
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert, Button, PermissionsAndroid, Platform, StyleSheet, Text, View,
} from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';

const manager = new BleManager();

function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [scannedDevices, setScannedDevices] = useState<Device[]>([]);

  const scanDevices = () => {
    setIsLoading(true);
    manager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        Alert.alert(error.name, error.message);
      }
      if (scannedDevice) {
        setScannedDevices((prev) => {
          if (prev.find((dev) => dev.id === scannedDevice.id)) return prev;
          return [...prev, scannedDevice];
        });
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
      {scannedDevices.map((device) => (
        <Text>{device.id}</Text>
      ))}
      {
        isLoading
          ? <ActivityIndicator size="large" />
          : <Button title="Scan devices" onPress={scanDevices} />
      }
      <Button
        title="Clear devices"
        onPress={() => setScannedDevices([])}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  сontainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
