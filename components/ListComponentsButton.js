
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity,StyleSheet, View} from 'react-native';
import COLORS from '../const/colors'
import FontAwesome from 'react-native-vector-icons/MaterialCommunityIcons';

const ListComponentsButton = ({
  buttonTitle,
  btnType,
  btnColor,
  name,
  id,onPress
}) => {
  const nav= useNavigation();
  console.log(btnType)
  return ( 
  <View>
    <TouchableOpacity
      style={[sty.rt,{backgroundColor: btnColor}]}      
      onPress={onPress?onPress:() => {
        nav.navigate("ApList", { RoomName1 : name , RoomId : id })
      }}
      >
        
      <View style={sty.btnTxtWrapper}>
        <FontAwesome name={btnType} size={22} color="#811212" style={{paddingLeft:10,width:'10%'}}/>
        <Text style={sty.TextOfButtonInner}>{buttonTitle}</Text>
        {/* <TouchableOpacity style={{width:'12%',backgroundColor:COLORS.red,height:'100%',alignItems:'center',justifyContent:'center',borderTopRightRadius:8,borderBottomRightRadius:8}}>
            <FontAwesome name="square-edit-outline" size={22} color={COLORS.white}/>
        </TouchableOpacity> */}
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
        color: "#811212",
        fontWeight:"bold",
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