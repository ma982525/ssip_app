import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, TextInput,KeyboardAvoidingView } from "react-native";
import AddHeaderButton from "../components/AddHeaderButton";
import Textfiled from "../components/Textfiled";
import COLORS from "../const/colors";
import styles from "../const/styles";

const AddAppliances = props => {
  return (
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
          />
        </View>
        <View style={styles.inputView100}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Appliance ID"
            placeholderTextColor="grey"
          />
        </View>
        <View style={styles.inputView100}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Appliance Key"
            placeholderTextColor="grey"
          />
        </View>
        <View style={styles.inputView100}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Appliance Category"
            placeholderTextColor="grey"
          />
        </View>
        {/*       
          <Textfiled 
           placeholder={"Appliances Name"}
           label={"Add Appliances Name"}
          />

          <Textfiled 
           placeholder={"Appliances ID"}
           label={"Add Appliances ID"}
          />

          <Textfiled 
           placeholder={"Appliances Key"}
           label={"Add Appliances Key"}
          />

          <Textfiled 
           placeholder={"Appliances Category"}
           label={"Add Appliances Category"}
          /> */}
      </View>

      <View style={[styles.buttonAdd, { height: 50, marginLeft: 20, marginRight: 20 }]} >
        <TouchableOpacity onPress={() => props.navigation.navigate('HomeScreen')}>
          <Text style={styles.TextOfButtonInner2}>
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default AddAppliances;