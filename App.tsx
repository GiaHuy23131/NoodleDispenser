import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';
//screen
import { WelcomeScreen } from './src/view';
export default function App() {
  return (
    <NavigationContainer>
      <WelcomeScreen />
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
