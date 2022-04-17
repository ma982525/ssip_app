import React,{useState,useEffect} from 'react'
import { Text,View,TouchableOpacity, Alert,StyleSheet,ActivityIndicator} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SettingButton } from '../components/SettingButton';
import COLORS from "../const/colors"
import styles from "../const/styles"
import FontAwesome from 'react-native-vector-icons/MaterialCommunityIcons';
import { LogoutButton } from '../components/LogoutButton';
import { useNavigation, StackActions } from "@react-navigation/native"

import {
  collection,
  query,
  onSnapshot,
  getDocs,
  doc,
  where,
  deleteDoc,
  deleteField,
} from "firebase/firestore";
import { authicaton, database, firestore } from "../const/firebase";


import {
  EmailAuthCredential,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
  updatePassword,
  updateProfile,
  deleteUser,
} from "firebase/auth";
import {AlertBox,fire} from "react-native-alertbox";
import { ref } from "firebase/database";


export default function SettingScreen({navigation}) {

  
  const [animating,setanimating] = useState('false');  
  const [data, setdata] = useState();
  const user = authicaton.currentUser;
  const name = user.displayName;
  const uid = user.uid;
  const nav = useNavigation();

  const Edituser = () => fire({
    title: "Edit Name",
    message: "Please enter your Name & Password for Verification",
    actions: [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Change",
        onPress: (data) => {
          setanimating('true');
          const cred = EmailAuthProvider.credential(
            user.email,
            data.Password
          );
          reauthenticateWithCredential(user, cred).then(() => {
            updateProfile(user, {
              displayName: data.Name
            }).then(() => {
              setanimating('false');
              reauthenticateWithCredential(user, cred);
              Alert.alert("Successfully Updated",
              "Your name is successfully changed.");
            }).catch((error) => {
              setanimating('false');
              console.log(error);
            });
          }).catch((e)=>{
            setanimating('false');
            console.log(e)
          });;
        },
      },
    ],
    fields: [
      {
        name: "Name",
        placeholder: "Name",
      },
      {
        name: "Password",
        placeholder: "Password",
      },
    ],
  });

  const deleteuser = () => fire({
    title: "Delete Account",
    message: "Please enter your Password for Verification",
    actions: [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: (data) => {
          setanimating('true');
          const crad = EmailAuthProvider.credential(
            user.email,
            data.Password
          );
          reauthenticateWithCredential(user, crad).then(() => {
            deleteData();
            });
        }, // It is an object that holds fields data
      },
    ],
    fields: [
      {
        name: "Password",
        placeholder: "Password",
      },
    ],
  });
  const deleteData = () => {
    const q = query(collection(firestore, "user/" + uid + "/Room"));
    const val = [];
    getDocs(q)
      .then((dw) => {
        dw.forEach((snap) => {
          val.push(snap.data());
        });
      })
      .then(() => {
        val.forEach((snap) => {
          let id = snap.RoomId.toString();
          deleteDoc(doc(firestore, "user/" + uid + "/Room/" + id));
        });
      })
      .then(() => {
        const q1 = query(collection(firestore, "user/" + uid + "/Appliance"));
        const val1 = [];
        getDocs(q1)
          .then((dw) => {
            dw.forEach((snap) => {
              val1.push(snap.data());
            });
          })
          .then(() => {
            val1.forEach((snap) => {
              let id = snap.ApId.toString();
              console.log(id);
              deleteDoc(doc(firestore, "user/" + uid + "/Appliance/" + id));
            });
          });
      })
      .then(() => {
        deleteDoc(doc(firestore, "user/" + uid ));
        deleteUser(user)
          .then(() => {
            nav.replace("Auth");
          })
          .catch((e) => {
            console.log(e);
          });
      });
    };

  const resetpassword = () => fire({
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
            setanimating('true');
            const crad = EmailAuthProvider.credential(
              user.email,
              data.OldPassword
            );
            reauthenticateWithCredential(user, crad).then(() => {
              updatePassword(user, data.NewPassword).then(() => {
                const resetAction = StackActions.replace("Auth");
                setanimating('false');
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


  return (<>
    <View style={(animating=='false')?sty.containerhide:sty.container2}>
        <ActivityIndicator
          animating={(animating=='false')?false:true}
          color="rgba(101, 88, 245, 1)"
          size="large"
          style={sty.activityIndicator} />
      </View>
    <AlertBox/>
    <ScrollView style={styles.SettingStyle}>
      <SettingButton 
      buttonTitle="Edit Details"
      btnType="account-edit"
      btnColor={COLORS.theme}
      onPress={() => {
        Edituser();
      }}
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
      navigation={navigation}
      />

    </ScrollView>
    </>
  );
}
const sty = StyleSheet.create({
  container2: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    zIndex: 10,
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.8)'
  },
  containerhide: {
    display: 'none'
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    zIndex:20,
  },
});