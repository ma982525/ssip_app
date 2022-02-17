import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import styles from "../const/styles"
import SocialButton from "../components/SocialButton";
import { authicaton, database } from "../const/firebase";
import { firestore } from "../const/firebase";
import {addDoc,collection} from "firebase/firestore"
import { createUserWithEmailAndPassword , updateProfile } from "firebase/auth"
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,ScrollView
} from "react-native";
import {windowHeight, windowWidth} from "../const/Dimensions";

const Signup = ({navigation}) => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [YourName, setYourName] = useState("");
  const [errortext, setErrortext] = useState('');

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please Enter Your Email');
      return;
    }
    if (!password) {
      alert('Please Enter Your Password');
      return;
    }
    if (!confirmpassword) {
      alert('Please Enter Your Confirm Password');
      return;
    }
    if(password !== confirmpassword){
      alert('Passwords not matching');
      return;
    }
    if(password.length==6){
      alert('Password must be 6 digit');
      return;
    }
    if((userEmail!='\0')&&(password!='\0') && (confirmpassword!='\0') && (password == confirmpassword) )
    {
      createUserWithEmailAndPassword(authicaton,userEmail,password)
      .then((userCredential) => {
        const user = userCredential.user;
        try {
          const docRef =  addDoc(collection(firestore, user.uid), {
            name : YourName,
            email : userEmail
          })
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        navigation.navigate('Login');
      })
      
    }
    
  }
  return (
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
  );
}
export default Signup