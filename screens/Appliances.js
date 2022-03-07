import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { ListComponentsButton } from '../components/ListComponentsButton.js';
import COLORS from "../const/colors"
import styles from "../const/styles"
import AddHeaderButton from '../components/AddHeaderButton';
import { createStackNavigator } from '@react-navigation/stack';
import RoomsScreen from '../screens/Rooms';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

// const stack = createStackNavigator();
// const AppNav = () =>{
//   return(
//     < stack.Navigator>
//       < stack.Screen name="AddRoom" component={ RoomsScreen }  options={{headerShown: false}}/>
//     </ stack.Navigator>
//   )
    
// }

export default function ProductScreen() {
  const navigation= useNavigation();
  return (
    <ScrollView style={
      { flex: 1 },
      { backgroundColor: COLORS.white }}>

      <AddHeaderButton text="All Appliances" />
      <ScrollView style={styles.SettingStyle}>
        <ListComponentsButton
          buttonTitle="SYSKA LED 15W"
          btnType="lightbulb-outline"
          btnColor={COLORS.theme}
          onPress ={ ()  => { navigation.navigate("InnerProduct",{ ApName: "SYSKA LED" })}}
        />
        <ListComponentsButton
          buttonTitle="FAN"
          btnType="fan"
          btnColor={COLORS.theme}
        />

        <ListComponentsButton
          buttonTitle="Air Condition"
          btnType="air-conditioner"
          btnColor={COLORS.theme}
        />

        <ListComponentsButton
          buttonTitle="SYSKA LED 15W"
          btnType="lightbulb-outline"
          btnColor={COLORS.theme}
        />
      </ScrollView>
    </ScrollView>
  );
}
