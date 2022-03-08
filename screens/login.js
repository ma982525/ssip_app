import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import styles from "../const/styles";
import SocialButton from '../components/SocialButton'
import { ActivityIndicator } from "react-native-paper";
import { AlertBox, fire } from "react-native-alertbox";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet
} from "react-native";
import { windowHeight, windowWidth } from "../const/Dimensions";
import { authicaton } from "../const/firebase";
import { signInWithEmailAndPassword,sendPasswordResetEmail  } from "firebase/auth";
import COLORS from "../const/colors";

const Login = ({ props, navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errortext, setErrortext] = useState('');
  const [animating, setanimating] = useState('false');

  const fbLogin = () => {
    console.log("fb");
  }

  const handleSubmitPress = () => {
    setanimating('true');
    setErrortext('');
    if (!userEmail) {
      setanimating('false');
      alert('Please Enter Your Email');
      return;
    }
    if (!password) {
      setanimating('false');
      alert('Please Enter Your Password');
      return;
    }
    if (userEmail != "\0" && password != "\0") {

      signInWithEmailAndPassword(authicaton, userEmail, password)
        .then((userCredential) => {
          const user = userCredential.user;
          user.displayName = user.displayName;
          setanimating('false');
          navigation.replace("Home");
        })
        .catch((error) => {

          if (error.code === "auth/email-already-in-use") {
            setanimating('false');
            alert("Your Email ID Already IN Use");
          }
          else if (error.code === "auth/user-not-found") {
            setanimating('false');
            alert("User Not Found!");
          }
          else if (error.code === "auth/wrong-password") {
            setanimating('false');
            alert("Enter Correct Password!");
          }
          else {
            alert(error);
            setanimating('false');
          }
        });
    }

  }

  const ForgotPassword = () => fire({
    title: "Reset Password",
    message: "Please enter your Email",
    actions: [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Send Mail",
        onPress: (data) => {
          sendPasswordResetEmail(authicaton,data.Email)
            .then(() => {
              fire({title: 'Title', message: 'Cheack Your Mail'})
            }).catch(error =>{
              const errorCode = error.code;
              const errorMessage = error.message;
              fire({title: errorCode , message: errorMessage })
            })
        },
      },
    ],
    fields: [
      {
        name: "Email",
        placeholder: "Email",
      },
    ],
  });

  return (
    <>
      <View style={(animating == 'false') ? sty.containerhide : sty.container}>
        <ActivityIndicator
          animating={(animating == 'false') ? false : true}
          color="rgba(101, 88, 245, 1)"
          size="large"
          style={sty.activityIndicator} />
      </View>
      <AlertBox />
      <ScrollView>
        <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center', height: '100%', marginTop: windowHeight / 6 }}>
          <Text style={styles.TextView}>Login</Text>


          <StatusBar style="auto" />
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email Id"
              placeholderTextColor="#301A4B"
              onChangeText={(userEmail) => setUserEmail(userEmail)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#301A4B"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <TouchableOpacity onPress={() => {ForgotPassword()}}>
            <Text style={styles.forgot_button}>Forgot Password?</Text>
          </TouchableOpacity>
          {/* {errortext != '' ? (
          <Text style={styles.errorTextStyle}>
            {errortext}
          </Text>
        ) : null} */}
          <TouchableOpacity style={styles.loginBtn} onPress={handleSubmitPress}>
            <Text style={{ color: "white", fontWeight: 'bold' }}>LOGIN</Text>
          </TouchableOpacity>

          {/* 
        {Platform.OS === 'android' ? (
          <View>
            <SocialButton
              buttonTitle="Sign In with Facebook"
              btnType="facebook"
              color="#4867aa"
              backgroundColor="#e6eaf4"
              onPress={() => fbLogin()}
            />

            <SocialButton
              buttonTitle="Sign In with Google"
              btnType="google"
              color="#de4d41"
              backgroundColor="#f5e7ea"
              onPress={() => googleLogin()}
            />
          </View>
        ) : null} */}

          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
          >
            <View style={{ height: 10, margin: 50 }}>
              <Text style={styles.forgot_button}>Don't have Account Create One?</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
}

const sty = StyleSheet.create({
  container: {
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
    height: 80
  }
})

export default Login