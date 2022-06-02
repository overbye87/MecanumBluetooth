export const config = {
  bluetooth: {
    name: 'AT-09_BLE', // name of ble device
    serviceUUID: '0000ffe0-0000-1000-8000-00805f9b34fb',
    characteristicUUID: '0000ffe1-0000-1000-8000-00805f9b34fb',
  },
  interval: 50, // ms
  scaleFactor: 60, // maximum position value
};
