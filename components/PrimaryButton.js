import react from "react";
import { View,Text, TouchableOpacity, StyleSheet } from "react-native";
import COLORS from "../const/colors";

const PrimaryButton = ({title,onPress = () => {}}) => {
    return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View style={styles.btnContainer}>
            <Text style={styles.tit}>{title}</Text>
        </View>
    </TouchableOpacity>
    );
};

const styles= StyleSheet.create({
    btnContainer:{
        backgroundColor:COLORS.theme,
        height:60,
        justifyContent:'center',
        alignItems:'center',
    },
    tit:{
        color:COLORS.white,
        fontWeight:'bold',
        fontSize:18,
    }
});

export {PrimaryButton};