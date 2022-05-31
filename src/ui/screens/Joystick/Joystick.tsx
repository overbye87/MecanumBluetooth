import React from 'react';
import { StyleSheet, View } from 'react-native';
import Joystick from './components/multitouchjoystick';

const JoystickScreen: React.FC = () => {
  return (
    <View
      style={styles.сontainer}
    >
      <Joystick
        onValue={(x, y) => {
          // values are between -1 and 1
          console.log(x, y);
        }}
      />
      <Joystick
        onValue={(x, y) => {
          // values are between -1 and 1
          console.log(x, y);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  сontainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default JoystickScreen;
