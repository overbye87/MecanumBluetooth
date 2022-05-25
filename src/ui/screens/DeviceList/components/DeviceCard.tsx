import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { BleError, Device } from 'react-native-ble-plx';
import { fromBase64, toBase64 } from '../../../../utils/base64';

interface Props {
  device: Device;
}
const DeviceCard: React.FC<Props> = ({ device }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    device.isConnected().then(setIsConnected);
  }, [device]);

  // const string = device.manufacturerData?.replace(/[=]/g, '');
  // const manufacturer = Buffer.from(string || '').toString('base64');
  const handleConnect = async () => {
    try {
      await device.connect();
      device.discoverAllServicesAndCharacteristics();
    } catch (error) {
      Alert.alert('Connect error', JSON.stringify(error, null, 2));
    }
  };

  const handleDisconnect = async () => {
    try {
      await device.cancelConnection();
    } catch (error) {
      Alert.alert((error as Error).name, (error as Error).message);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
    // navigate to the Device Screen
      onPress={handleConnect}
    >
      <Text>{`Id : ${device.id}`}</Text>
      <Text>{`Name : ${device.name}`}</Text>
      <Text>{`Is connected : ${isConnected}`}</Text>
      <Text>{`RSSI : ${device.rssi}`}</Text>
      {/* Decode the ble device manufacturer which is encoded with the base64 algorythme */}
      <Text>
        {`Manufacturer : ${fromBase64(device.manufacturerData || '')}`}

      </Text>
      {Object.entries(device.serviceData || {}).map((item) => <Text>{`uuid: ${item[0]} : ${item[1]}`}</Text>)}
      <Text>{`UUIDS : ${device.serviceUUIDs}`}</Text>
      <Button title="DISCONNECT" onPress={handleDisconnect} />

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
});

export default DeviceCard;
