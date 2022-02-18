import React from "react";
import { useState } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SettingButton } from "../components/SettingButton";
import COLORS from "../const/colors";
import styles from "../const/styles";
import { LogoutButton } from "../components/LogoutButton";
import { useNavigation, StackActions } from "@react-navigation/native";
import {deleteUser,} from "firebase/auth"
import {deleteDoc,doc,collection, getDoc} from "firebase/firestore"
import { authicaton, database , firestore } from "../const/firebase";
import {
  EmailAuthCredential,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
  updatePassword,
} from "firebase/auth";

import { AlertBox, fire } from "react-native-alertbox";


export default function SettingScreen() {

  const user = authicaton.currentUser;
  const name = user.displayName;
  const uid = user.uid;
  const nav = useNavigation();

  const deleteuser = () => {
    Alert.alert("delete User", "Are you Want to delete", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          
          deleteUser(user).then(() => {
            
            const resetAction = StackActions.replace("Auth");
            nav.dispatch(resetAction);
          });
        },
      },
    ]);
  };

  const logout = () => {

    Alert.alert("Logout", "Are you Want to log out", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          signOut(authicaton).then(() => {

            const resetAction = StackActions.replace("Auth");
            nav.dispatch(resetAction);
          });
        },
      },
    ]);
  };

  const resetpassword = () => {
    return fire({
      title: "Update Password",
      message: "Please enter your old and newPassword and then click approve",
      actions: [
        {
          text: "Close",
          style: "cancel",
        },
        {
          text: "Submit",
          onPress: (data) => {
            const crad = EmailAuthProvider.credential(
              user.email,
              data.OldPassword
            );
            reauthenticateWithCredential(user, crad).then(() => {
              updatePassword(user, data.NewPassword).then(() => {
                const resetAction = StackActions.replace("Auth");
                nav.dispatch(resetAction);
              });
            });
          }, // It is an object that holds fields data
        },
      ],
      fields: [
        {
          name: "OldPassword",
          placeholder: "OldPassword",
        },
        {
          name: "NewPassword",
          placeholder: "NewPassword",
        },
      ],
    });
  };
  
  return (
    <View style={styles.settingMainScreen}>
      <AlertBox />
      <ScrollView style={styles.SettingStyle}>
        <Text>{name}</Text>
        <SettingButton
          buttonTitle="Edit Details"
          btnType="account-edit"
          btnColor={COLORS.theme}
        />
        <SettingButton
          buttonTitle="Edit Password"
          btnType="lock"
          btnColor={COLORS.theme}
          onPress={() => {
            resetpassword();
          }}
        />

        <SettingButton
          buttonTitle="Delete Account"
          btnType="delete-empty"
          btnColor={COLORS.theme}
          onPress={() => {
            deleteuser();
          }}
        />

        <LogoutButton
          buttonTitle="LOGOUT"
          btnType="logout"
          btnColor={COLORS.red}
          mystyle="logout"
          onPress={() => {
            logout();
          }}
        />
      </ScrollView>
    </View>
  );
}
