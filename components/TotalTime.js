import React, { useState, useEffect } from "react";
import {View,Text,StyleSheet} from "react-native";
import COLORS from "../const/colors";
import {ref,onValue} from "firebase/database";
import { database } from "../const/firebase";
import { windowWidth } from "../const/Dimensions";
import styles from "../const/styles";

export const TotalUnit = ({
  pathOfSwitchData,
}) => {

  const [secound, setsecound] = useState();
  const [Minuites, setMinuites] = useState();
  const [hour, sethour] = useState();
  const [lastPower, setlastPower] = useState(0);
  const [Power, setPower] = useState([]);
  const [isEnabled, setIsEnabled] = useState();

  

  useEffect(() => {

    let value;
    let val;
    onValue(ref(database, pathOfSwitchData + "/data" + "/Data1"),async(snapshot) => {
      value = snapshot.val();
      if (value == 1) {
        setIsEnabled(true);
      } else {  
        setIsEnabled(false);
      }
    });

    onValue(ref(database, pathOfSwitchData + '/Current'), async(snapshot) => {
      const val = [];
      snapshot.forEach((va) => {
        if (va.val() < 50) {
          val.push(0);
        }
        else {
          val.push(va.val());
        }
      });
      setPower(val);
      if(isEnabled)
      {
        setlastPower(val[val.length - 1]);
      }
      else
      {
        setlastPower(val[val.length - 2]);
      }
      
      
    });

    onValue(ref(database, pathOfSwitchData + "/Time" + "/second"), async(snapshot) => {
      let val = snapshot.val();
      let hr = Math.floor(val / 3600);
      let extra1 = val % 3600;
      let min = Math.floor(extra1 / 60);
      let second = extra1 % 60;
      sethour(hr);
      setMinuites(min);
      setsecound(second);
    })

  }, [])



  return (
    <View>
      <Text style={styles.TextInput}> Consumption in Units : {parseFloat(lastPower * hour) / 1000}</Text>
      <Text style={styles.TextInput}> Consumption in Rupees : {parseFloat(lastPower * hour) * 7.10 / 1000} ₹ </Text>
    </View>
  )
}

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
    onValue(ref(database,  pathOfSwitchData + "/data"+"/Data1"),async(snapshot) => {
      value = snapshot.val();
      if (value == 1) {
        setIsEnabled(true);
      } else {
        setIsEnabled(false);
      }
    });
    onValue(ref(database,  pathOfSwitchData + "/Time"+"/second"),async(snapshot) => {
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