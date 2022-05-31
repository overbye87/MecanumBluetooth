import React from 'react';
import { StyleSheet, View } from 'react-native';
import Joystick from './components/multitouchjoystick';

const handleOnValue = (x1?: number, y1?: number, x2?: number, y2?: number) => {
  const prevX1 = x1;
  const prevY1 = y1;
  const prevX2 = x2;
  const prevY2 = y2;
  if (!x1 && !y1) console.log(`$${prevX1} ${prevY1};${x2}@${y2}!`);
  if (!x2 && !y2) console.log(`$${x1} ${y1};${prevX2}@${prevY2}!`);
  // console.log(`$${x1} ${y1};${x2}@${y2}!`);
};

const JoystickScreen: React.FC = () => {
  console.log('render');
  return (
    <View
      style={styles.сontainer}
    >
      <Joystick
        onValue={(x, y) => {
          handleOnValue(x, y);
          // console.log(x, y);
        }}
      />
      <Joystick
        onValue={(x, y) => {
          handleOnValue(undefined, undefined, x, y);
          // console.log(x, y);
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
