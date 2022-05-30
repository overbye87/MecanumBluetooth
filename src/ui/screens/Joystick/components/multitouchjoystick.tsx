/* eslint-disable no-mixed-operators */
import React, { memo } from 'react';
import { View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

interface propsJoystick {
  width?: number;
  height?: number;
  ballRadius?: number;
  backgroundColor?: string;
  ballColor?: string;
  onValue: (x: number, y: number) => {};
}

MultiTouchJoyStick.defaultProps = {
  backgroundColor: '#f5f5f5',
  ballColor: 'rgba(0, 0, 256, 0.5)',
  ballRadius: 30,
  height: 200,
  width: 200,
};

function MultiTouchJoyStick({
  backgroundColor,
  ballColor,
  ballRadius,
  height,
  width,
  onValue,
}: propsJoystick) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: () => { },

    onActive: (event) => {
      if (width && height) {
        if (event.translationX < width / 2 && event.translationX > -width / 2) {
          translateX.value = event.translationX;
        }
        if (event.translationY < height / 2 && event.translationY > -height / 2) {
          translateY.value = event.translationY;
        }
        runOnJS(onValue)(
          Number((translateX.value / width * 2).toFixed(2)),
          Number((translateY.value / height * 2).toFixed(2)),
        );
      }
    },
    onEnd: () => {
      runOnJS(onValue)(0, 0);
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },

  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <View
      style={{
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor,
        borderRadius: 180,
      }}
    >
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View
          style={[
            {
              width: ballRadius ? ballRadius * 2 : 30,
              height: ballRadius ? ballRadius * 2 : 30,
              backgroundColor: ballColor,
              borderRadius: 180,
            },
            rStyle,
          ]}
        />
      </PanGestureHandler>
    </View>
  );
}

export default memo(MultiTouchJoyStick);
