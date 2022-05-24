/* eslint-disable react/no-this-in-sfc */
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert, Button, StyleSheet, Text, View,
} from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';

const manager = new BleManager();

function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [scannedDevices, setScannedDevices] = useState<Device[]>([]);

  const scanDevices = () => {
    setIsLoading(true);
    manager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        Alert.alert(error.name, error.message);
      }
      if (scannedDevice) {
        if (scannedDevice && !scannedDevices.find((dev) => dev.id === scannedDevice.id)) {
          setScannedDevices((prev) => [...prev, scannedDevice]);
        }
      }
    });
    setTimeout(() => {
      manager.stopDeviceScan();
      setIsLoading(false);
    }, 1000);
  };

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
