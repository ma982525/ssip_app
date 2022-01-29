import { StyleSheet, Text, View } from 'react-native';

export default function ProductScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text21}>ProductScreen</Text>
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
