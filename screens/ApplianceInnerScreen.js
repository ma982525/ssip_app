import React,{useState,useEffect} from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, Dimensions } from "react-native";
import { PieChart, ProgressChart } from "react-native-chart-kit";
import AddBackHeaderButton from "../components/AddBackHeaderButton";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Textfiled from "../components/Textfiled";
import COLORS from "../const/colors";
import styles from "../const/styles";
import { Switch } from 'react-native-gesture-handler';
import {update,ref, onValue} from "firebase/database"
import { database } from '../const/firebase';
import { useNavigation, useRoute } from "@react-navigation/native";
import { SwitchOfNoOff } from "../components/SwitchOfNoOff";
import { windowHeight, windowWidth } from "../const/Dimensions";
import { Totaltime } from "../components/TotalTime";

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

    const route = useRoute();
    const Name = route.params.ApName;
    const key = route.params.ApKey;
    const nav = useNavigation();
    const [lastPower, setlastPower] = useState(0);
    const [Power, setPower] = useState([]);

    useEffect(async () => {
        onValue(ref(database, "/" + key + '/Current'), (snapshot) => {
        const val = [];
        snapshot.forEach((va) => {
            if(va.val()<50)
            {
            val.push(0);
            }
            else
            {
            val.push(va.val());
            }
        });
        setlastPower(val[val.length - 1]);
        setPower(val);
        });
    }, []);


    // const [isEnabled, setIsEnabled] = useState(false);
    // const toggleSwitch = () => {setIsEnabled(previousState => !previousState)};

    
    // const { title } = props.route.params;

    const data = [
    {
      name: Name,
      unit: 100,
      color: "rgba(101, 88, 245, 0.7)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Other",
      unit: 800,
      color: "rgba(101, 88, 245, 0.1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

    return (
        <ScrollView >
            <KeyboardAvoidingView style={{ flex: 1, height: '100%', width: '100%', marginBottom: 80 }}>
                
                <AddBackHeaderButton text={Name} />
                <Totaltime pathOfSwitchData={"/" + key} />
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
                <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    alignContent: "center",
                    width:Dimensions.get('window').width-40,
                    justifyContent: "center"
                }}
                >
                <AnimatedCircularProgress
                    size={180}
                    width={30}
                    fill={lastPower}
                    tintColor="#00e0ff"
                    backgroundColor="#3d5875"
                    padding={10}
                    arcSweepAngle={247}
                    rotation={237}
                    duration={4000}
                    tintTransparency={true}
                />
                <Text style={[{marginTop:windowHeight/10},{marginHorizontal:windowWidth/10}]}>Power:{lastPower}</Text>
                </View>
                
                <SwitchOfNoOff pathOfSwitchData={"/" + key} />
                {/* <View style={{backgroundColor: COLORS.theme, margin: 20, borderRadius: 10,display:'flex',flexDirection:'row'}}>
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
                </View> */}
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default ApplianceInner;