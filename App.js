import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar, StyleSheet, Text, View  } from 'react-native';
import COLORS from './const/colors';
import HomeScreen from './screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnBoardScreen from './screens/OnBoardScreen';
import AddRoom from './screens/AddRoom';
import Tabs from './components/Navigation';
import React, { useEffect } from 'react';
import Login from './screens/login';
import Signup from './screens/signup';

const Stack=createStackNavigator();

const Auth = () => {
  return (<>
    <StatusBar backgroundColor={COLORS.white} barStyle='dark-content'/>
    <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Signup" component={Signup}/>
      <Stack.Screen name="home" component={ Tabs } />
    </Stack.Navigator>
    </>
  );
};


 const App = () =>  {
   const [isFirstLaunch, setIsFirstLaunch]= React.useState(null);
   useEffect(()=>{
    AsyncStorage.getItem('alreadyLaunched').then(value =>{
      if(value==null){
        AsyncStorage.setItem('alreadyLaunched','true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
   }, []);

   if(isFirstLaunch==null){
      return null;
   } else if(isFirstLaunch===false){
      return (
        <NavigationContainer>
          <StatusBar backgroundColor={COLORS.white} barStyle='dark-content'/>
          <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='BoardScreen'>
            <Stack.Screen name="BoardScreen" component={OnBoardScreen}/>
            <Stack.Screen name="Auth" component={Auth}/>
            <Stack.Screen name="Home" component={Tabs}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else{
      return (<NavigationContainer>
        <StatusBar backgroundColor={COLORS.white} barStyle='dark-content'/>
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Login'>
          <Stack.Screen name="Auth" component={Auth}/>
          <Stack.Screen name="Home" component={Tabs} backBehaviour='none'/>
        </Stack.Navigator>
      </NavigationContainer>);
    }

};

export default App;
