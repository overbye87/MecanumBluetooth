import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import Main from '../screens/Main/Main';
import { DeviceList } from '../screens/DeviceList/DeviceList';
import DeviceScreen from '../screens/Device/DeviceScreen';
import Joystick from '../screens/Joystick/Joystick';
import Quadruped from '../screens/Quadruped/Quadruped';

export type AppStackParamList = {
  Main: undefined,
  DeviceList: undefined,
  DeviceScreen: { index: number },
  Joystick: undefined,
  Quadruped: undefined,
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
          options={{ headerShown: false, orientation: 'portrait_up' }}
        />
        <AppStack.Screen
          name="DeviceList"
          component={DeviceList}
          options={{ orientation: 'portrait_up' }}
        />
        <AppStack.Screen
          name="DeviceScreen"
          component={DeviceScreen}
          options={{ orientation: 'portrait_up' }}
        />
        <AppStack.Screen
          name="Joystick"
          component={Joystick}
          options={{ headerShown: false, orientation: 'landscape', statusBarHidden: true }}
        />
        <AppStack.Screen
          name="Quadruped"
          component={Quadruped}
          options={{ headerShown: false, orientation: 'portrait_up', statusBarHidden: true }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
