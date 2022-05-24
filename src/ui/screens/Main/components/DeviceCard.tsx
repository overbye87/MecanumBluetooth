import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Device } from 'react-native-ble-plx';

interface Props {
  device: Device;
}
const DeviceCard: React.FC<Props> = ({ device }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // is the device connected?
    device.isConnected().then(setIsConnected);
  }, [device]);

  const string = device.manufacturerData?.replace(/[=]/g, '');
  // const manufacturer = Buffer.from(string || '').toString('base64');

  return (
    <TouchableOpacity
      style={styles.container}
    // navigate to the Device Screen
      // onPress={() => navigation.navigate('Device', { device })}
    >
      <Text>{`Id : ${device.id}`}</Text>
      <Text>{`Name : ${device.name}`}</Text>
      <Text>{`Is connected : ${isConnected}`}</Text>
      <Text>{`RSSI : ${device.rssi}`}</Text>
      {/* Decode the ble device manufacturer which is encoded with the base64 algorythme */}
      <Text>
        {`Manufacturer : ${string}`}

      </Text>
      <Text>{`ServiceData : ${device.serviceData}`}</Text>
      <Text>{`UUIDS : ${device.serviceUUIDs}`}</Text>
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
