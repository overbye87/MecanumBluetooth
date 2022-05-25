import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTypedDispatch, useTypedSelector } from '../../../store/store';
import { NavigationAppStack } from '../../navigation/AppNavigation';
import DeviceCard from './components/DeviceCard';

export const DeviceList = () => {
  const scannedDevices = useTypedSelector(({ main }) => main.scannedDevices);
  const dispatch = useTypedDispatch();
  const { navigate } = useNavigation<NavigationAppStack<'Main'>>();
  return (
    <View>
      <FlatList
        data={scannedDevices}
        renderItem={({ item }) => <DeviceCard device={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
