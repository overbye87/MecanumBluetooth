/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Device } from 'react-native-ble-plx';
import { RootState } from '../store';

interface IInitial {
  scannedDevices: Device[],
  selectedDevice: Device | null,
}

const initialState: IInitial = {
  scannedDevices: [],
  selectedDevice: null,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    addDevice: (store, action: PayloadAction<Device>) => {
      const scannedDevice = action.payload;
      if (!store.scannedDevices.find((dev) => dev.id === scannedDevice.id)) {
        store.scannedDevices.push(scannedDevice);
      }
    },
    updateDevice: (store, action: PayloadAction<{ device: Device, index: number }>) => {
      store.scannedDevices[action.payload.index] = action.payload.device;
    },
    clearScannedDevices: (store) => {
      store.scannedDevices = [];
    },
    setSelectedDevice: (store, action: PayloadAction<Device>) => {
      store.selectedDevice = action.payload;
    },
  },
});

export const {
  addDevice,
  updateDevice,
  clearScannedDevices,
  setSelectedDevice,
} = mainSlice.actions;

export const main = (state: RootState) => state.main;

export default mainSlice.reducer;
