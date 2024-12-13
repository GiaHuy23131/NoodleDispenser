import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';
import StackNavigator from './src/navigator/StackNavigator';
import { store } from './src/redux/store';
export default function App() {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
