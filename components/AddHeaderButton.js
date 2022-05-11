import React from "react";
import { View, TouchableOpacity, Text,StyleSheet } from 'react-native';
import styles from '../const/styles';
import { windowWidth,windowHeight } from "../const/Dimensions";

const AddHeaderButton = ({text}) => {
  return (
    <View style={{
      flex: 1, flexDirection: 'row', alignContent: "center",
      justifyContent: "center",backgroundColor:"white"
    }}>

      <View>
        <View style={styles.ThemeHeader}>
          <View style={[styles.HeaderText, { marginTop: 20 }, { width: /*3.8*(windowWidth/5*/ windowWidth-40 },{marginHorizontal:20}, { height: 50 }]} >
            <Text style={styles.TextOfButtonInner2}>{text}</Text>
          </View>
        </View>
      </View>

      {/* <View>
        <View style={styles.containerOfAddButton}>
          <View style={[styles.buttonAdd,
          { marginTop: 20 },
          { marginRight: 10 },
          { width: 50 },
          { height: 50 }]} >
            <TouchableOpacity>
              <Text style={styles.AddPlusText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View> */}

    </View>
  )
}

export default AddHeaderButton;