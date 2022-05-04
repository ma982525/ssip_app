import React,{useState} from 'react'
import { View, ScrollView,  TouchableOpacity, Text, TextInput,KeyboardAvoidingView,Image } from "react-native";
import COLORS from "../const/colors"
import styles from "../const/styles"
import AddHeaderButton from '../components/AddHeaderButton';
import { useNavigation } from '@react-navigation/native';
import { firestore,authicaton } from "../const/firebase";
import {doc,collection,getDocs,query,where} from "firebase/firestore";
import { AlertBox, fire } from "react-native-alertbox";
import { windowHeight, windowWidth } from "../const/Dimensions";

export default function ProductScreen() {
  const user = authicaton.currentUser;
  const uid = user.uid;
  const navigation= useNavigation();
  const [Room, onChangeText] = useState();

   const getId =() =>{
    
     let id;
     let val=[];
    const q = query(collection(firestore, "user"+"/"+uid+"/"+"Room"), where("RoomName", "==", Room ));
    const querySnapshot =  getDocs(q).then(async(querySnapshot)=>{
      if(querySnapshot.empty)
      {
        fire({
          message: "Room Does Not Exist"});
      }
      else {
        querySnapshot.forEach(async(doc) => {
          val.push(doc.data())
         });
         val.forEach(async(se) =>{
           id=se.RoomId;
         })
         navigation.navigate("AddNewApp",{RoomName: Room, RoomId : id });
      }
      
    });
  
   }

  return (
    <View style={[
      { flex: 1 },
      { backgroundColor: COLORS.white }]}>
      <AlertBox />
      <ScrollView>
       
      <AddHeaderButton text="Add Appliances" />

      <View style={{width:windowWidth-40,marginLeft:20,height:windowHeight/4+35,marginVertical:20}}>
          <Image source={require('../assets/home_hero.png')} style={{width:"100%",height:"100%"}}/>
      </View>
      
      <View style={[styles.marginsetOfTextConatiner ,{marginTop : 0}]}>
     
        <Text style={{fontSize:18,textAlign:'left',fontWeight:"bold"}}>Enter Already exist Room Name</Text>
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
    <View style={[{marginBottom : windowWidth}]}>
    <View style={[styles.Submit, { height: 50 },
      { marginLeft: 20 },
      { marginRight: 20 },]} >
        <TouchableOpacity onPress={() => {
           getId();
          }}>
          <Text style={styles.TextOfButtonInner2}>
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
      
    </ScrollView>
    </View>
  );
}
