import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, TextInput, KeyboardAvoidingView } from "react-native";
import AddHeaderButton from "../components/AddHeaderButton";
import Textfiled from "../components/Textfiled";
import COLORS from "../const/colors";
import styles from "../const/styles";
import { useNavigation } from "@react-navigation/native";
import { database, authicaton,firestore } from "../const/firebase";
import {doc,collection,setDoc,addDoc} from "firebase/firestore"
const saveData = () => {
  navigation.navigate('HomeScreen')
}


const AddAppliances = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const RoomName = route.params.RoomName;


  const user = authicaton.currentUser;
  const uid = user.uid;

  const [ApplianceName, setApplianceName] = useState(null);
  const [ApplianceID, setApplianceID] = useState(null);
  const [ApplianceKey, setApplianceKey] = useState(null);
  const [ApplianceCategory, setApplianceCategory] = useState(null);

  const AddRoomDataBase = () => {
    const ref = doc(collection(firestore, uid + '/' + 'user'+ '/' + "Room"+'/'+ RoomName+'/'+"Appliance"),ApplianceName);
    setDoc(ref,{
      ApplianceName : ApplianceName,
      ApplianceID : ApplianceID,
      ApplianceKey : ApplianceKey,
      ApplianceCategory : ApplianceCategory
    });
  }

  return (
    <ScrollView >
      <KeyboardAvoidingView style={{ flex: 1, height: '100%', width: '100%', marginBottom: 80 }}>

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
              placeholder="Enter Appliance Key"
              placeholderTextColor="grey"
              onChangeText={setApplianceKey}
              value={ApplianceKey}
            />
          </View>
          <View style={styles.inputView100}>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter Appliance Category"
              placeholderTextColor="grey"
              onChangeText={setApplianceCategory}
              value={ApplianceCategory}
            />
          </View>
        </View>

        <View style={[styles.buttonAdd, { height: 50, marginLeft: 20, marginRight: 20, marginBottom: 20 }]} >
          <TouchableOpacity onPress={() => {
             AddRoomDataBase();
            setApplianceCategory(null);
            setApplianceID(null);
            setApplianceKey(null);
            setApplianceName(null);
            navigation.navigate("AddApp", { RoomName: RoomName });
          }}>
            <Text style={styles.TextOfButtonInner2}>
              Add More Appliance
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.buttonAdd, { height: 50, marginLeft: 20, marginRight: 20 }]} >
          <TouchableOpacity onPress={() => {
            AddRoomDataBase();
            navigation.goBack();
          }}>
            <Text style={styles.TextOfButtonInner2}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default AddAppliances;