import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-web';


export default function HomeScreen() {
  return (
      <View style={styles.container}>
        <Text style={styles.text21}>Home Page</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text21:{
      fontSize: 25,
  },
});
