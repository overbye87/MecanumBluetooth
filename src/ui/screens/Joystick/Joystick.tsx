import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MultiTouchJoyStick from './components/MultiTouchJoyStick';

const Joystick: React.FC = () => {
  const x1 = useRef<number>(0);
  const y1 = useRef<number>(0);
  const x2 = useRef<number>(0);
  const y2 = useRef<number>(0);

  console.log('render');

  return (
    <View
      style={styles.сontainer}
    >
      <MultiTouchJoyStick
        onValue={React.useCallback((x, y) => {
          setPositions((prev: any) => ({ ...prev, x1: x, y1: y }));
        }, [setPositions])}
      />
      <MultiTouchJoyStick
        onValue={React.useCallback((x, y) => {
          setPositions((prev: any) => ({ ...prev, x2: x, y2: y }));
        }, [setPositions])}
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

export default Joystick;
