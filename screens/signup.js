import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import styles from "../const/styles"
import SocialButton from "../components/SocialButton";
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
    navigation.navigate('Login');
  }
  return (
    <ScrollView> 
      <KeyboardAvoidingView style={{flex:1,alignItems:'center',height:'100%',marginTop:windowHeight/6}}>

      <Text style={styles.TextView}>Create An Account</Text>

      <StatusBar style="auto" />
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