import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Device } from 'react-native-ble-plx';
import { useTypedSelector } from '../../../../store/store';
import { NavigationAppStack } from '../../../navigation/AppNavigation';
import { theme } from '../../../styles/theme';

interface Props {
  device: Device;
  index: number;
}
const DeviceCard: React.FC<Props> = ({ device, index }) => {
  const selectedDeviceIndex = useTypedSelector(({ main }) => main.selectedDeviceIndex);
  const [isConnected, setIsConnected] = useState(false);
  const { navigate } = useNavigation<NavigationAppStack<'Main'>>();
  useEffect(() => {
    (async () => {
      setIsConnected(await device.isConnected());
    })();
  }, [device]);
  return (
    <TouchableOpacity
      style={[styles.container, selectedDeviceIndex === index && styles.selected]}
      onPress={() => navigate('DeviceScreen', { index })}
    >
      <Text style={styles.id}>{`Id : ${device.id}`}</Text>
      <Text style={styles.name}>{`Name : ${device.name}`}</Text>
      <Text style={isConnected ? styles.connected : null}>{`Is connected : ${isConnected}`}</Text>
      <Text>{`RSSI : ${device.rssi}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  selected: {
    backgroundColor: theme.colours.button,
  },
  id: {
  },
  name: {
    fontSize: 20,
  },
  connected: {
    color: 'darkgreen',
  },
});

export default DeviceCard;
