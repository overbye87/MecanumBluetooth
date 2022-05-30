import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import Main from '../screens/Main/Main';
import { DeviceList } from '../screens/DeviceList/DeviceList';
import DeviceScreen from '../screens/Device/DeviceScreen';
import Joystick from '../screens/Joystick/Joystick';

export type AppStackParamList = {
  Main: undefined,
  DeviceList: undefined,
  DeviceScreen: { index: number },
  Joystick: undefined,
};

type ScreenKeys = keyof AppStackParamList;
export type RouteAppStack<T extends ScreenKeys> = RouteProp<AppStackParamList, T>;
export type NavigationAppStack<T extends ScreenKeys> = NativeStackNavigationProp<
AppStackParamList,
  T
>;

const AppStack = createNativeStackNavigator<AppStackParamList>();

const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name="DeviceList"
          component={DeviceList}
        />
        <AppStack.Screen
          name="DeviceScreen"
          component={DeviceScreen}
        />
        <AppStack.Screen
          name="Joystick"
          component={Joystick}
          options={{ headerShown: false }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
