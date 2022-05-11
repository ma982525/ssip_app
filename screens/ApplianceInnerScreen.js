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
import { Totaltime,TotalUnit } from "../components/TotalTime";
import { AlertBox, fire } from "react-native-alertbox";
import { ListComponentsButton } from "../components/ListComponentsButton";
import { Card } from "react-native-elements";

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
    let vao;
    const [hr, sethr] = useState(0);
    const [min, setmin] = useState(0);
    const [sec, setsec] = useState(0);
    const [remansec, setremansec] = useState(0);

    const route = useRoute();
    const rid = route.params.RoomId;
    const apid = route.params.ApId;
    const apcd = route.params.ApCd;
    const Name = route.params.ApName;
    const key = route.params.ApKey;
    const nav = useNavigation();
    const [lastPower, setlastPower] = useState(0);
    const [Power, setPower] = useState([]);
    const [timer, timerset] = useState(true);

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
        setPower(val);
        setlastPower(val[val.length - 1]);
        });

        onValue(ref(database, "/" + key + '/Timer'), async (snapshot) => {
            snapshot.forEach(async (data) => {
                vao = await data.val();
                let hro = Math.floor(vao / 3600);
                let extra1 = vao % 3600;
                let mino = Math.floor(extra1 / 60);
                let seco = extra1 % 60;
                vao == 0 ? (timerset(true)) : (timerset(false));
                setremansec(vao);
                sethr(hro);
                setmin(mino);
                setsec(seco);
            })
        });

    }, []);


    
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

  const setTimer = () => {
    fire({
        title: "setTime Out",
        message: "Enter All Data",
        actions: [
            {
                text: "Start Timer",
                onPress: (data) => {
                    const total = (parseInt(data.Hour) * 3600) + (parseInt(data.Minutes) * 60) + parseInt(data.Second);
                    if (total > 0) {
                        let value;
                        onValue(ref(database, "/" + key + "/data" + "/Data1"), (snapshot) => {
                            value = snapshot.val();
                        });

                        if (value == 1) {
                            update(ref(database, "/" + key + "/Timer"), { settimer: total }).then(() => {
                                nav.navigate("AppInner", {
                                    RoomId: rid,
                                    ApName: Name,
                                    ApId: apid,
                                    ApKey: key,
                                    ApCd: apcd
                                })
                            })
                        }
                        else {
                            fire({ title: "first On Switch" })
                        }
                    }
                    else {
                        fire({ title: "Enter correct Data" })
                    }
                }
            },
            {
                text: "Cancel",
                style: "cancel",
            }
        ],
        fields: [
            {
                name: "Hour",
                placeholder: "Hour",

            },
            {
                name: "Minutes",
                placeholder: "Minutes",
            },
            {
                name: "Second",
                placeholder: "Second",
            },
        ],
    })
}

const stopTimer =() =>{
    update(ref(database, "/" + key + "/data"), { Data1: 0 }).then(()=>{
        update(ref(database, "/" + key + "/Timer"), { settimer: 0 }).then(() => {
            nav.navigate("AppInner", {
                RoomId: rid,
                ApName: Name,
                ApId: apid,
                ApKey: key,
                ApCd: apcd
            })
        }) 
    })
    
}
console.log(parseFloat(hr))

    return (
    <View>
        <View style={(timer == true) ? sty.containerhide : sty.container}>
                <Card borderRadius={20} backgroundColor='rgba(242, 242, 242, 1)'>
                    <Card.Title>Timer</Card.Title>
                    <Card.Divider>
                        <Text style={styles.TextView}>{hr} hr : {min} min : {sec} second</Text>
                        <View>
                            <View style={styles.containerOfAddButton}>
                                <View style={[styles.buttonAdd,
                                { marginTop: 20 },
                                { marginRight: 20 },
                                { width: 200 },
                                { height: 50 }]} >
                                    <TouchableOpacity style={{justifyContent:"center",alignContent : "center",marginLeft : 10}} onPress={() =>{stopTimer()}}>
                                        <Text style={styles.AddPlusText}>Stop Timer</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Card.Divider>
                </Card>
            </View>
        <ScrollView >
            <AlertBox/>
            <KeyboardAvoidingView style={{ flex: 1, height: '100%', width: '100%', marginBottom: 80 }}>
                
                <AddBackHeaderButton text={Name} />
                <Totaltime pathOfSwitchData={"/" + key} />
                
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
                    tintColor="#fe7f7f"
                    backgroundColor="#ffc5c550"
                    padding={10}
                    arcSweepAngle={247}
                    rotation={237}
                    duration={4000}
                    tintTransparency={true}
                />
                <Text style={[{marginTop:windowHeight/10},{marginHorizontal:windowWidth/10}]}>Power:{lastPower}</Text>
                </View>
                
                <TotalUnit pathOfSwitchData={"/" + key}/>
                <SwitchOfNoOff pathOfSwitchData={"/" + key} />
                <View style={{width:windowWidth,marginLeft:20,marginBottom : 100}}>
                    <ListComponentsButton
                        buttonTitle={"Add Timer"}
                        btnType="alarm-plus"
                        btnColor="#ffc5c5"
                        onPress={() => { setTimer() }} />
                </View>

            </KeyboardAvoidingView>
        </ScrollView>
    </View>
    )
}

const sty = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        zIndex: 10,
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 5,
    },
    containerhide: {
        display: 'none'
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
})

export default ApplianceInner;