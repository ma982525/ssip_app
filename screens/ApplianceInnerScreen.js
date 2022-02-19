import React,{useState} from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, Dimensions } from "react-native";
import { PieChart, ProgressChart } from "react-native-chart-kit";
import AddBackHeaderButton from "../components/AddBackHeaderButton";
import Textfiled from "../components/Textfiled";
import COLORS from "../const/colors";
import styles from "../const/styles";
import { Switch } from 'react-native-gesture-handler';
import {update,ref} from "firebase/database"
import { database } from '../const/firebase';

const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(101, 88, 245, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const ApplianceInner = props => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {setIsEnabled(previousState => !previousState)};

    
    const { title } = props.route.params;

    const data = [
        {
            name: title.length < 10
            ? title
            : title.substring(0, 10)+'...',
            unit: 100,
            color: "rgba(101, 88, 245, 0.7)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Other",
            unit: 800,
            color: "rgba(101, 88, 245, 0.1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
        }];

    return (
        <ScrollView >
            <KeyboardAvoidingView style={{ flex: 1, height: '100%', width: '100%', marginBottom: 80 }}>

                <AddBackHeaderButton text={title} />
                <PieChart
                    data={data}
                    width={Dimensions.get('window').width-40}
                    height={200}
                    chartConfig={chartConfig}
                    accessor={"unit"}
                    backgroundColor={"transparent"}
                    paddingLeft={"0"}
                    center={[10, 10]}
                    style={{margin:20}}
                />
                <View style={{backgroundColor: COLORS.theme, margin: 20, borderRadius: 10,display:'flex',flexDirection:'row'}}>
                    <View style={{width:'80%',justifyContent:'center',paddingLeft:20}}>
                        <Text style={{color:COLORS.white}}>Working Status</Text>
                    </View>
                    <View style={{width:'20%'}}>
                        <Switch
                            trackColor={{ false: COLORS.red, true: COLORS.greens }}
                            thumbColor="#f4f3f4"
                            //ios_backgroundColor="#3e3e3e"
                            
                            onValueChange={() => {
                                toggleSwitch(),
                                isEnabled ? (update(ref(database, '/'), { Data1: 0 })) : (update(ref(database, '/'), { Data1: 1 }))
                            }
                            }
                            value={isEnabled}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default ApplianceInner;