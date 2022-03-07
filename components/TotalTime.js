import React, { useState, useEffect } from "react";
import {View,Text,StyleSheet} from "react-native";
import COLORS from "../const/colors";
import {ref,onValue} from "firebase/database";
import { database } from "../const/firebase";
import { windowWidth } from "../const/Dimensions";


export const Totaltime = ({
    pathOfSwitchData,
}) => {

  const [isEnabled, setIsEnabled] = useState();
  const [secound,setsecound] =useState();
  const [Minuites,setMinuites] =useState();
  const [hour,sethour] =useState();
  useEffect(async () => {

    let value;
    let val;
    onValue(ref(database,  pathOfSwitchData + "/data"+"/Data1"), (snapshot) => {
      value = snapshot.val();
      if (value == 1) {
        setIsEnabled(true);
      } else {
        setIsEnabled(false);
      }
    });
    onValue(ref(database,  pathOfSwitchData + "/Time"+"/second"), (snapshot) => {
        val = snapshot.val();
        let hr= Math.floor(val/3600);
        let extra1= val % 3600;
        let min= Math.floor(extra1/60);
        let second= extra1 % 60;
        sethour(hr);
        setMinuites(min);
        setsecound(second);
      })
  }, [setIsEnabled]);

  
  return (
    <View
      style={sty.rt}>
      <View style={[{ width: "80%", paddingLeft: 20,flex: 1,flexDirection: 'row'}]}>
        <Text style={{ color: COLORS.white, width: "50%",textAlign:'right'}}> Total Time On :  </Text>
        <Text style={{ color: COLORS.white, width: "50%",textAlign:'left'}}>{hour}h {Minuites}m {secound}s</Text>
      </View>
    </View>
  );
};

const sty=StyleSheet.create({
  rt: {
      marginLeft: windowWidth / 20 ,
      backgroundColor:COLORS.greens,
      borderRadius: 8,
      flex: 1,
      flexDirection: 'row',
      marginTop: 20,
      width: "90%", 
      height: 50,
      padding:10,
      justifyContent:'center',
      alignItems:'center'
  },
  TextOfButtonInner:{
      fontSize: 16,
      color: COLORS.white,
      paddingLeft:-7,
      width:'78%',
      
    }
})