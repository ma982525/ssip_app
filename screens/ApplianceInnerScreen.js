import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { PieChart, ProgressChart } from "react-native-chart-kit";
import AddBackHeaderButton from "../components/AddBackHeaderButton";
import styles from "../const/styles";
import COLORS from "../const/colors";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { ref, onValue } from "firebase/database";
import { database } from "../const/firebase";
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
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const ApplianceInner = () => {
  const route = useRoute();
  const id1 = route.params.ApName;
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

  const data = [
    {
      name: id1,
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
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <KeyboardAvoidingView
        style={{ flex: 1, height: "100%", width: "100%", marginBottom: 80 }}
      >
        <AddBackHeaderButton text={id1} />
        <Totaltime pathOfSwitchData={"/" + key} />
        <PieChart
          data={data}
          width={Dimensions.get("window").width}
          height={200}
          chartConfig={chartConfig}
          accessor={"unit"}
          backgroundColor={"transparent"}
          paddingLeft={"0"}
          center={[10, 10]}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignContent: "center",
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
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ApplianceInner;
