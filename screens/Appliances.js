
import COLORS from "../const/colors"
import styles from "../const/styles"
import AddHeaderButton from '../components/AddHeaderButton';
import { useNavigation} from '@react-navigation/native';
import React,{useState} from "react";
import { View, ScrollView,  TouchableOpacity, Text, TextInput,KeyboardAvoidingView } from "react-native";
import { firestore,authicaton } from "../const/firebase";
import {doc,collection,getDocs,query,where} from "firebase/firestore";


// const stack = createStackNavigator();
// const AppNav = () =>{
//   return(
//     < stack.Navigator>
//       < stack.Screen name="AddRoom" component={ RoomsScreen }  options={{headerShown: false}}/>
//     </ stack.Navigator>
//   )
    
// }

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
      querySnapshot.forEach(async(doc) => {
       val.push(doc.data())
      });
      val.forEach(async(se) =>{
        id=se.RoomId;
      })
      navigation.navigate("AddNewApp",{ RoomId : id });
    });
  
   }

  return (
    <ScrollView style={[
      { flex: 1 },
      { backgroundColor: COLORS.white }]}>

      <AddHeaderButton text="Add Appliances" />
      
      <View style={[styles.marginsetOfTextConatiner, { paddingTop: 90 }]}>
        <Text style={{fontSize:20,textAlign:'center'}}>Enter Already exist Room Name</Text>
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
           getId();
          }}>
          <Text style={styles.TextOfButtonInner2}>
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}
