import React from "react";
import { useRoute } from "@react-navigation/native";
import { View, ScrollView, TouchableOpacity, Text, TextInput, KeyboardAvoidingView } from "react-native";
import AddHeaderButton from "../components/AddHeaderButton";
import styles from "../const/styles";
import { useNavigation } from "@react-navigation/native";
import { authicaton,firestore } from "../const/firebase";
import {doc,collection,setDoc,addDoc} from "firebase/firestore";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { AlertBox, fire } from "react-native-alertbox";

const AddAppliances = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const RoomName = route.params.RoomName;  
  const RoomId=route.params.RoomId;


  const user = authicaton.currentUser;
  const uid = user.uid;

  const [ApplianceName, setApplianceName] = useState(null);
  const [ApplianceID, setApplianceID] = useState(null);
  const [ApplianceKey, setApplianceKey] = useState(null);
  const [ApplianceCategory, setApplianceCategory] = useState(null);
  const AddRoomDataBase = () => {
      const id1= Math.floor(Math.random() * 10000000000) + 1;
      const ref = doc(collection(firestore, 'user' + '/' + uid + '/'+"Appliance"), id1.toString());
      setDoc(ref,{
        RoomId : RoomId ,
        ApplianceName : ApplianceName,
        ApplianceID : ApplianceID,
        ApplianceKey : ApplianceKey,
        ApplianceCategory : ApplianceCategory,
        ApId: id1
      }); 
  }

  return (
    <View>
      
    <ScrollView >
      <KeyboardAvoidingView style={{ flex: 1, height: '100%',width:'100%',marginBottom:80 }}>
      <AddHeaderButton text="Add Appliances" />
     
      <View style={[styles.marginsetOfTextConatiner, { paddingTop: 30 }]}>
      
        <Text style={{ fontSize: 18, paddingBottom: 10 }}>Enter All Details About Appliances
        </Text>
        
        <View style={styles.inputView100}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Appliance Name"
            placeholderTextColor="grey"
            onChangeText={setApplianceName}
            value={ApplianceName}
          />
        </View>
        <View style={styles.inputView100}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Appliance ID"
            placeholderTextColor="grey"
            onChangeText={setApplianceID}
            value={ApplianceID}
          />
        </View>
        <View style={styles.inputView100}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Appliance connect Pin Name"
            placeholderTextColor="grey"
            onChangeText={setApplianceKey}
            value={ApplianceKey}
          />
        </View>
        <View style={styles.inputView100}>
          <Picker
            style={{color:"black",height:0,width:"100%",borderColor:"red",borderWidth:1}}            
            selectedValue={ApplianceCategory}
            placeholder="Enter Appliance Category"
            placeholderTextColor="grey"
            onChangeText={setApplianceCategory}
            onValueChange={(itemValue,itemIndex) => setApplianceCategory(itemValue)}
          >
            <Picker.Item label="Select Item Type" value="NonSelect"/>
            <Picker.Item label="Light" value="lightbulb-on"/>
            <Picker.Item label="Fan" value="fan"/>            
            <Picker.Item label="AC" value="air-conditioner"/>            
            <Picker.Item label="other" value="view-grid"/>
          </Picker>
        </View>
      </View>

      <View style={[styles.buttonAdd, { height: 50, marginLeft: 20, marginRight: 20, marginBottom: 20 }]} >
          <TouchableOpacity onPress={() => {
            if(ApplianceCategory == null ){   
              alert("Please Select Item Type");
            }
            else
            {
            AddRoomDataBase();
            setApplianceCategory(null);
            setApplianceID(null);
            setApplianceKey(null);
            setApplianceName(null);
            navigation.navigate("AddNewApp", { RoomId : RoomId });
            }
            
          }}>
            <Text style={styles.TextOfButtonInner2}>
              Add More Appliance
            </Text>
          </TouchableOpacity>
        </View>

      <View style={[styles.buttonAdd, { height: 50, marginLeft: 20, marginRight: 20 }]} >
        <TouchableOpacity onPress={() => { 
            if(ApplianceCategory == null ){
              alert("Please Select Item Type");
            }
            else
            {
              AddRoomDataBase();
              navigation.goBack();
            }
            
          }}>
          <Text style={styles.TextOfButtonInner2}>
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </ScrollView>
    </View>
  )
}

export default AddAppliances;