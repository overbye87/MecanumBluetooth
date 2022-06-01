import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Device } from 'react-native-ble-plx';
import { theme } from '../../../styles/theme';

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

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    backgroundColor: theme.colours.green,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});

export default SelectedDevice;
