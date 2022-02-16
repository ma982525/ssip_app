import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import styles from '../const/styles';
import { windowWidth,windowHeight } from "../const/Dimensions";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from "../const/colors";
import { useNavigation } from "@react-navigation/native";

const AddHeaderButton = ({text}) => {
  
const navigation=useNavigation();

  return (
    <View style={{
      flex: 1, flexDirection: 'row', alignContent: "center",
      justifyContent: "center"
    }}>

      <View>
        <View style={styles.containerOfAddButton}>
          <View style={[styles.buttonAdd,
          { marginTop: 20 },
          { marginRight: 10 },
          { width: 50 },
          { height: 50 }]} >
            <TouchableOpacity onPress={()=>navigation.goBack()}>
              <Icon name="chevron-left" size={22} color={COLORS.white} style={{alignSelf:'center'}} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View>
        <View style={styles.ThemeHeader}>
          <View style={[styles.HeaderText, { marginTop: 20 }, { width: 3.8*(windowWidth/5) },{marginRight:5}, { height: 50 }]} >
            <Text style={styles.TextOfButtonInner2}>{text}</Text>
          </View>
        </View>
      </View>

    </View>
  )
}

export default AddHeaderButton;