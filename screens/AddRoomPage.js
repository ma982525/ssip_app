import React from "react";
import { ScrollView, View, Text, TouchableOpacity,TextInput,Image } from 'react-native';
import AddHeaderButton from '../components/AddHeaderButton';
import Textfiled from "../components/Textfiled";
import COLORS from "../const/colors";
import styles from "../const/styles";
import { useNavigation } from '@react-navigation/native';
import { database , authicaton ,firestore} from "../const/firebase";
import {addDoc, collection,doc, setDoc} from "firebase/firestore"
import { useState } from "react";
import { windowHeight,windowWidth } from "../const/Dimensions";

const AddRoomPage = () => {

  const navigation=useNavigation();  
  const [Room, onChangeText] = useState();
  const user = authicaton.currentUser;
  const name = user.displayName;
  const uid = user.uid;
  
  return (
    <ScrollView style={
      { flex: 1 ,
      backgroundColor: COLORS.white }}
    >
      <AddHeaderButton text={"ADD ROOM"} />

      <View style={{width:windowWidth-40,marginLeft:20,height:windowHeight/4+40,marginVertical:20}}>
          <Image source={require('../assets/Control_home.png')} style={{width:"100%",height:"100%"}}/>
      </View>


      <View style={{marginHorizontal:20,marginBottom:20}}>
        <Text style={{fontSize:18,textAlign:'left',fontWeight:"bold"}}>Enter Room Name</Text>
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
        <TouchableOpacity onPress={() => {
          const id= Math.floor(Math.random() * 1000000000) + 1;
          const ref = doc(collection(firestore, 'user' + '/' + uid+ '/' + "Room"),id.toString());
          setDoc(ref,{
            RoomId : id,
            RoomName : Room
          });
          navigation.navigate("AddApp",{RoomId : id, RoomName : Room })}}>
          <Text style={styles.TextOfButtonInner2}>
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>

  )
}
export default AddRoomPage;