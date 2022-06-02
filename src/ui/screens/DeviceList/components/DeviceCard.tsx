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
import ConnactedLogo from '../../../../assets/link-svgrepo-com.svg';

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
  }, [navigate]);

  return (
    <TouchableOpacity
      style={[styles.container, selectedDeviceIndex === index && styles.selected]}
      onPress={() => navigate('DeviceScreen', { index })}
    >
      <Text style={styles.id}>{`Id : ${device.id}`}</Text>
      <Text style={styles.name}>{`Name : ${device.name}`}</Text>
      {isConnected && <ConnactedLogo width={60} height={60} style={{ position: 'absolute', top: 10, right: 10 }} />}
      <Text>{`RSSI : ${device.rssi}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // borderColor: theme.colours.gray,
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
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
