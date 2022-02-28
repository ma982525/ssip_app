import { StatusBar } from "expo-status-bar";
import { React, useState } from "react";
import styles from "../const/styles";
import SocialButton from "../components/SocialButton";
import { authicaton } from "../const/firebase";
import { signInWithEmailAndPassword , signInWithPopup , GoogleAuthProvider} from "firebase/auth";
import { Text,View,TextInput,TouchableOpacity,KeyboardAvoidingView,ScrollView} from "react-native";
import { windowHeight, windowWidth } from "../const/Dimensions";
import { useNavigation } from "@react-navigation/native";


const Login = ({ props, navigation }) => {
  const nav = useNavigation()
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errortext, setErrortext] = useState("");

  const googleLogin = () =>
  {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authicaton,provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      navigation.replace("Tabs");
      const user = result.user;
     
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }


  const handleSubmitPress = () => {
    setErrortext("");
    if (!userEmail) {
      alert("Please Enter Your Email");
      return;
    }
    if (!password) {
      alert("Please Enter Your Password");
      return;
    }
    if (password.length == 6) {
      alert("Password must be 6 digit");
      return;
    }
    if (userEmail != "\0" && password != "\0") 
    {
      
        signInWithEmailAndPassword(authicaton, userEmail, password)
        .then((userCredential) => 
        {
          console.log("hllo");
          const user = userCredential.user;
          nav.replace("home");
        })
        .catch((error) => 
        {
          
          if (error.code === "auth/email-already-in-use") 
          {
            alert("Your Email ID Already IN Use");
          }
          if (error.code === "auth/user-not-found") 
          {
            alert("User Not Found!");
          }
          if (error.code === "auth/wrong-password") 
          {
            alert("Enter Correct Password!");
          }
        });
    }
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          alignItems: "center",
          height: "100%",
          marginTop: windowHeight / 6,
        }}
      >
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
        
        <TouchableOpacity style={styles.loginBtn} onPress={handleSubmitPress}>
          <Text style={{ color: "white", fontWeight: "bold" }}>LOGIN</Text>
        </TouchableOpacity>

        {Platform.OS === "android" ? (
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
              onPress={ () =>{googleLogin();} }
            />
          </View>
        ) : null}

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <View style={{ height: 10, margin: 50 }}>
            <Text style={styles.forgot_button}>
              Don't have Account Create One?
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
export default Login;
