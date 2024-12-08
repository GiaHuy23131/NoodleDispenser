import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
//Screen
import { WelcomeScreen } from '../view';
const Stack = createStackNavigator();
const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="WellcomScreen">
            <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
        </Stack.Navigator>
    )
}
export default StackNavigator;
