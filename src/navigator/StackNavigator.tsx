import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
// Import màn hình
import { WelcomeScreen, InfomationScreen, NotificationScreen } from '../view';

// Khai báo type navigation
export type RootStackParamList = {
  WelcomeScreen: undefined;
  InfomationScreen: undefined;
  NotificationScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{headerShown: false}} >
        <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
        <Stack.Screen name='InfomationScreen' component={InfomationScreen} />
        <Stack.Screen name='NotificationScreen' component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
