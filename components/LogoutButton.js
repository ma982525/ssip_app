import React from 'react';
import {Text, TouchableOpacity, View,Alert} from 'react-native';
import styles from '../const/styles'
import COLORS from '../const/colors'
import FontAwesome from 'react-native-vector-icons/MaterialCommunityIcons';
import { authicaton } from "../const/firebase";
import { signOut } from "firebase/auth";



const LogoutButton = ({
  buttonTitle,
  btnType,
  btnColor,
  navigation,
  ...rest
}) => {

  const logout = () => {
      const user = authicaton.currentUser;
      const name = user.displayName;
    
      Alert.alert("Logout", "Are you sure "+name, [
        {
          text: "No, don't",
          style: "cancel",
        },
        {
          text: "Yes, Please",
          onPress: () => {
            signOut(authicaton).then(() => {
              navigation.replace("Auth");
            }).catch(error => {
              console.log(error);
            });
          },
        },
      ]);
    }
  
  return (
  <View styles={{alignContent: "center"}}>
    <TouchableOpacity
      onPress={() => {
        logout();
      }}
      style={[styles.logoutaddNameHeader, {backgroundColor: btnColor},{flex: 1}, {flexDirection: 'row'},{marginTop: 20},{width: "90%"}, {height: 50}]}
      {...rest}>
      <View style={styles.logouticonWrapper}>
        <FontAwesome name={btnType} style={{justifyContent: "flex-start"}} size={22} color={COLORS.white} />
      </View>
      <View style={styles.logoutbtnTxtWrapper}>
        <Text style={styles.logoutTextOfButtonInner}>{buttonTitle}</Text>
      </View>
      
      
    </TouchableOpacity>

  </View>
  );
};

export  {LogoutButton};