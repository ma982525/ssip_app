import React from 'react'
import { Text,View,TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SettingButton } from '../components/SettingButton';
import COLORS from "../const/colors"
import styles from "../const/styles"
import FontAwesome from 'react-native-vector-icons/MaterialCommunityIcons';
import { LogoutButton } from '../components/LogoutButton';

export default function SettingScreen() {
  return (
    <ScrollView style={styles.SettingStyle}>
      <SettingButton 
      buttonTitle="Edit Details"
      btnType="account-edit"
      btnColor={COLORS.theme}
      />
      <SettingButton 
      buttonTitle="Edit Password"
      btnType="lock"
      btnColor={COLORS.theme}
      />

    <SettingButton 
      buttonTitle="Delete Account"
      btnType="delete-empty"
      btnColor={COLORS.theme}
      />

    <LogoutButton
      buttonTitle="LOGOUT"
      btnType="logout"
      btnColor={COLORS.red}
      mystyle="logout"
      />

    </ScrollView>
  );
}