import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { ListComponentsButton } from '../components/ListComponentsButton.js';
import COLORS from "../const/colors"
import styles from "../const/styles"
import AddHeaderButton from '../components/AddHeaderButton';
import { useNavigation } from '@react-navigation/native';

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
          onPress ={ ()  => { navigation.navigate("InnerProduct",{ bt : "SYSKA LED" })}}
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
