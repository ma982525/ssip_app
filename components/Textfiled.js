import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from "react-native-paper";

const Textfiled = ({placeholder,label}) => {
  const [text, onChangeText] = React.useState("");
  return (
    <View style={styles.textcontenior}>
      <Text></Text>
      < TextInput
        mode='outlined'
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder={placeholder}
        label={label}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textcontenior: {
    alignContent: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#f0eaf8",
    fontSize:15,
    borderColor:"#f0eaf8",
  },
  RectangleShape: {
    height: 0,
    backgroundColor: 'green',
    justifyContent: "center",
    borderRadius: 8
  },
  font: {
  },
  Text: {
    color: "white",
    alignSelf: "center"
  },
});

export default Textfiled;