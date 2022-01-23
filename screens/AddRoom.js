import { StyleSheet, Text, View } from 'react-native';

export default function AddRoomsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text21}>AddRoomsScreen</Text>
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
