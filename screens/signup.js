import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import styles from "../const/styles"
import SocialButton from "../components/SocialButton";
import { authicaton } from "../const/firebase";
import { createUserWithEmailAndPassword , updateProfile } from "firebase/auth"
import { ActivityIndicator } from "react-native-paper";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,ScrollView, StyleSheet
} from "react-native";
import {windowHeight, windowWidth} from "../const/Dimensions";

const Signup = ({navigation}) => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");  
  const [YourName, setYourName] = useState("");
  const [errortext, setErrortext] = useState('');
  const [animating,setanimating] = useState('false');

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
    if (!confirmpassword) {
      setanimating('false');
      alert('Please Enter Your Confirm Password');
      return;
    }
    if(password !== confirmpassword){
      setanimating('false');
      alert('Passwords not matching');
      return;
    }
    if(password.length==6){
      setanimating('false');
      alert('Password must be 6 digit');
      return;
    }
    if((userEmail!='\0')&&(password!='\0') && (confirmpassword!='\0') && (password == confirmpassword) )
    {
      createUserWithEmailAndPassword(authicaton,userEmail,password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user,{displayName : YourName })
        setanimating('false');
        navigation.navigate('Login');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          // console.log('That email address is already in use!');
          setanimating('false');
          alert('This email address is already in use!')
        }
    
        if (error.code === 'auth/invalid-email') {
          // console.log('That email address is invalid!');
          setanimating('false');
          alert('This email address is invalid!')
        }
      });
      
    }
  }
  return (
    <>
    <View style = {(animating=='false')?sty.containerhide:sty.container}>
        <ActivityIndicator
               animating = {(animating=='false')?false:true}
               color = "rgba(101, 88, 245, 1)"
               size = "large"
               style = {sty.activityIndicator}/>
      </View>

    <ScrollView> 
      <KeyboardAvoidingView style={{flex:1,alignItems:'center',height:'100%',marginTop:windowHeight/6}}>

      <Text style={styles.TextView}>Create An Account</Text>

      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Your Name"
          placeholderTextColor="#301A4B"
          onChangeText={(YourName) => setYourName(YourName)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email ID"
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

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          multiline={false}
          placeholder="Confrim Password"
          placeholderTextColor="#301A4B"
          secureTextEntry={true}
          onChangeText={(confirmpassword) => setConfirmPassword(confirmpassword)}
        />
      </View>


      <TouchableOpacity style={styles.loginBtn}
      onPress={handleSubmitPress}
      >
        <Text  style={{color:"white" , fontWeight: 'bold'}}>Sign Up</Text>
      </TouchableOpacity>


    {Platform.OS === 'android' ? (
        <View>
          <SocialButton
            buttonTitle="Sign Up with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => fbLogin()}
          />

          <SocialButton
            buttonTitle="Sign Up with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => googleLogin()}
          />
        </View>
      ) : null}
      <TouchableOpacity
    onPress={() => navigation.navigate('Login')}
    >
        <View style={{height:10 , margin:50}}>
        <Text style={styles.forgot_button}>Already have Account? Login Now!</Text>
        </View>
    </TouchableOpacity>
    </KeyboardAvoidingView>
    </ScrollView>
    </>
  );
}

const sty = StyleSheet.create ({
  container: {
     flex: 1,
     display:'flex',
     justifyContent: 'center',
     alignItems: 'center',
     height:'100%',
     width:'100%',
     zIndex:10,
     position:'absolute',
     backgroundColor:'rgba(255,255,255,0.8)'
  },
  containerhide: {
    display:'none'
 },
  activityIndicator: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     height: 80
  }
})

export default Signup