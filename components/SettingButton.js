import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../const/styles'
import COLORS from '../const/colors'
import FontAwesome from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingButton = ({
  buttonTitle,
  btnType,
  btnColor,
  onPress
}) => {
  return (
  <View styles={{alignContent: "center"}}>
    <TouchableOpacity
    onPress={onPress}
      style={[styles.addNameHeader, {backgroundColor: btnColor},{flex: 1}, {flexDirection: 'row'},{marginTop: 20},{width: "90%"}, {height: 50}]}
      >
      <View style={styles.btnTxtWrapper}>
        <Text style={styles.TextOfButtonInner}>{buttonTitle}</Text>
      </View>
      <View style={styles.iconWrapper}>
        <FontAwesome name={btnType} style={{justifyContent: "flex-start"}} size={22} color={COLORS.white} />
      </View>
      
    </TouchableOpacity>

  </View>
  );
};

export  {SettingButton};