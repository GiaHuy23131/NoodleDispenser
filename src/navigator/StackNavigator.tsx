import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
// Import màn hình
import { WelcomeScreen, InfomationScreen, NotificationScreen, OutofNoodlesScreen } from '../view';

// Khai báo type navigation
interface User {
  id: string;
  full_name: string;
  image: string;
  birthday: string;
  gender: string;
  department: string;
  cupNoodles: number;
}
export type RootStackParamList = {
  WelcomeScreen: undefined;
  InfomationScreen: User;
  NotificationScreen: undefined;
  OutofNoodlesScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false }} >
        <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
        <Stack.Screen name='InfomationScreen' component={InfomationScreen} />
        <Stack.Screen name='NotificationScreen' component={NotificationScreen} />
        <Stack.Screen name='OutofNoodlesScreen' component={OutofNoodlesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
