import React, { useState, useEffect } from "react";
import {View,Text} from "react-native";
import COLORS from "../const/colors";
import { Switch } from "react-native-gesture-handler";
import {update,ref,onValue} from "firebase/database";
import { database } from "../const/firebase";

export const SwitchOfNoOff = ({
    pathOfSwitchData,
}) => {

  const [isEnabled, setIsEnabled] = useState();
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };
  useEffect(async () => {
    let value;
    onValue(ref(database,  pathOfSwitchData + "/data"+"/Data1"), (snapshot) => {
      value = snapshot.val();
      if (value == 1) {
        setIsEnabled(true);
      } else {
        setIsEnabled(false);
      }
    });
  }, [setIsEnabled]);

  const getUpdate=()=>{
    let val;
    onValue(ref(database,  pathOfSwitchData + "/Time"+"/second"), (snapshot) => {
      val = snapshot.val();
      if(isEnabled)
      {
          set(ref(database,  pathOfSwitchData + "/Time"),
          {
            "second" : ( val - 3) 
          })
      }
      else
      {
        set(ref(database,  pathOfSwitchData + "/Time"),
          {
            "second" : ( val + 3) 
          })
      }
    },{
      onlyOnce: true
    });
  }


  return (
    <View
      style={{
        backgroundColor: COLORS.theme,
        margin: 20,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <View style={{ width: "80%", justifyContent: "center", paddingLeft: 20 }}>
        <Text style={{ color: COLORS.white }}>Working Status</Text>
      </View>
      <View style={{ width: "20%" }}>
        <Switch
          trackColor={{ false: COLORS.red, true: COLORS.greens }}
          thumbColor="#f4f3f4"
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            toggleSwitch(),
              isEnabled
                ? update(ref(database, pathOfSwitchData + "/data"), { Data1: 0 })
                : update(ref(database, pathOfSwitchData + "/data" ), { Data1: 1 });
                getUpdate();
          }}
          value={isEnabled}
        />
      </View>
    </View>
  );
};