import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import styles from "../const/styles";
import SocialButton from '../components/SocialButton'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { windowHeight, windowWidth } from "../const/Dimensions";
import Tabs from "../components/Navigation";

const Login = ({ props, navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");  
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
    navigation.replace('Home');
  }

  return (


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

        <TouchableOpacity>
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
        ) : null}

        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
        >
          <View style={{ height: 10, margin: 50 }}>
            <Text style={styles.forgot_button}>Don't have Account Create One?</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>

  );
}
export default Login