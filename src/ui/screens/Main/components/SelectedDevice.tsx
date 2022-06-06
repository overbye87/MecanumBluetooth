import React from 'react';
import { Text, View } from 'react-native';
import { Device } from 'react-native-ble-plx';
import { styles } from './SelectedDevice.style';

interface Props {
  device: Device;
}

const SelectedDevice: React.FC<Props> = ({ device }) => {
  return (
    <View style={styles.container}>
      {device.name && <Text>{device.name}</Text>}
      <Text>{device.id}</Text>
    </View>
  );
};

export default SelectedDevice;
