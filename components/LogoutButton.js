import React from 'react';
import {Text, TouchableOpacity, View,Alert} from 'react-native';
import styles from '../const/styles'
import COLORS from '../const/colors'
import FontAwesome from 'react-native-vector-icons/MaterialCommunityIcons';

const LogoutButton = ({
  buttonTitle,
  btnType,
  btnColor,
  onPress,
  ...rest
}) => {
  return (
  <View styles={{alignContent: "center"}}>
    <TouchableOpacity
      onPress={onPress}
      style={[styles.logoutaddNameHeader, {backgroundColor: btnColor},{flex: 1}, {flexDirection: 'row'},{marginTop: 20},{width: "90%"}, {height: 50}]}
      {...rest}>
      <View style={styles.logouticonWrapper}>
        <FontAwesome name={btnType} style={{justifyContent: "flex-start"}} size={22} color={COLORS.white} />
      </View>
      <View style={styles.logoutbtnTxtWrapper}>
        <Text style={styles.logoutTextOfButtonInner}>{buttonTitle}</Text>
      </View>
      
      
    </TouchableOpacity>

  </View>
  );
};

export  {LogoutButton};