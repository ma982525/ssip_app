import React ,{useState} from "react";
import { ScrollView, View, Text, TouchableOpacity,TextInput } from 'react-native';
import AddHeaderButton from '../components/AddHeaderButton';
import Textfiled from "../components/Textfiled";
import COLORS from "../const/colors";
import styles from "../const/styles";
import { useNavigation } from '@react-navigation/native';
import { database , authicaton } from "../const/firebase";
import {ref,set} from "firebase/database";


const AddRoomPage = () => {

  const [Room, onChangeText] = React.useState();
  const user = authicaton.currentUser;
  const name = user.displayName;
  const uid = user.uid;

  const navigation=useNavigation();
  
  return (
    <ScrollView style={
      { flex: 1 },
      { backgroundColor: COLORS.white }}
    >
      <AddHeaderButton text={"ADD ROOM"} />
      <View style={[styles.marginsetOfTextConatiner, { paddingTop: 90 }]}>
        <Text style={{fontSize:20,textAlign:'center'}}>Enter Room Name</Text>
        <View style={styles.inputView100}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Room Name"
            placeholderTextColor="#301A4B"
            onChangeText={onChangeText}
            value={Room}
          />
        </View>
      </View>

      <View style={[styles.Submit, { height: 50 },
      { marginLeft: 20 },
      { marginRight: 20 }]} >
        <TouchableOpacity onPress={() => {navigation.navigate("AddApp",{RoomName : Room })}}>
          <Text style={styles.TextOfButtonInner2}>
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>

  )
}
export default AddRoomPage;