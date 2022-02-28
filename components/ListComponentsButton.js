import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity,StyleSheet, View} from 'react-native';
import styles from '../const/styles'
import COLORS from '../const/colors'
import FontAwesome from 'react-native-vector-icons/MaterialCommunityIcons';
import { windowWidth } from '../const/Dimensions';
import { ApplincesList } from '../screens/ApplincesList';
import ApplianceInner from '../screens/ApplianceInnerScreen';

const ListComponentsButton = ({
  buttonTitle,
  btnType,
  btnColor,
  onPress
}) => {
  const nav= useNavigation();

  return (
  <View>
    <TouchableOpacity
      onPress = {onPress}
      style={[sty.rt,{backgroundColor: btnColor}]}>
        
      <View style={sty.btnTxtWrapper}>
        <FontAwesome name={btnType} size={22} color={COLORS.white} style={{paddingLeft:10,width:'10%'}}/>
        <Text style={sty.TextOfButtonInner}>{buttonTitle}</Text>
        <TouchableOpacity style={{width:'12%',backgroundColor:COLORS.red,height:'100%',alignItems:'center',justifyContent:'center',borderTopRightRadius:8,borderBottomRightRadius:8}}>
            <FontAwesome name="square-edit-outline" size={22} color={COLORS.white}/>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>

  </View>
  );
};
const sty=StyleSheet.create({
    rt: {
      
        backgroundColor:COLORS.theme,
       alignContent:"center",
        borderRadius: 8,
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        width: "90%", 
        height: 50
    },
    TextOfButtonInner:{
        fontSize: 16,
        color: COLORS.white,
        paddingLeft:10,
        width:'78%',
      },
      btnTxtWrapper: {
        flexDirection: 'row',
        flex: 2,
        width:'100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }
   
})

export  {ListComponentsButton};