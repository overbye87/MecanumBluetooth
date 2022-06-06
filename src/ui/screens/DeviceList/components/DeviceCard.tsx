import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import { Device } from 'react-native-ble-plx';
import { useTypedSelector } from '../../../../store/store';
import { NavigationAppStack } from '../../../navigation/AppNavigation';
import ConnactedLogo from '../../../../assets/link-svgrepo-com.svg';
import { styles } from './DeviceCard.style';

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

export default DeviceCard;
