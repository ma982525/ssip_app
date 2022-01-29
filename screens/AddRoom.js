import { StyleSheet, Text, View } from 'react-native';
import AddRoomPage from './AddRoomPage';

export default function AddRoomsScreen() {
  return (
    <View style={styles.container}>
      <AddRoomPage />
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
