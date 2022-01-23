import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Tabs from './components/Navigation';



export default function App() {
  return (
    <NavigationContainer>
        <Tabs/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
