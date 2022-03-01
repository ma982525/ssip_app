import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { PieChart, ProgressChart } from "react-native-chart-kit";
import AddBackHeaderButton from "../components/AddBackHeaderButton";
import styles from "../const/styles";
import COLORS from "../const/colors";
import { Switch } from "react-native-gesture-handler";
import {
  update,
  ref,
  getDatabase,
  onValue,
  DataSnapshot,
  set,
} from "firebase/database";
import { database } from "../const/firebase";
import { useNavigation, useRoute } from "@react-navigation/native";

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#fff",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(101, 88, 245, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const ApplianceInner = () => {
  const route = useRoute();
  const id1 = route.params.ApName;
  const key = route.params.ApKey;
  const nav = useNavigation();
  const [Voltage, setVoltage] = useState([]);

  useEffect(async () => {
    onValue(ref(database, "/" + key), (snapshot) => {
      const val = [];
      snapshot.forEach((va) => {
        val.push(va.val());
      });
      val.pop();
      setVoltage(val);
    });
    Voltage.forEach((val) => {
      console.log(val);
    });
  }, []);

  const factValue = () => {};

  const [isEnabled, setIsEnabled] = useState();
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  useEffect(async () => {
    let value;
    onValue(ref(database, "/" + key + "/Data1"), (snapshot) => {
      value = snapshot.val();
      if (value == 1) {
        setIsEnabled(true);
      } else {
        setIsEnabled(false);
      }
    });
  }, [setIsEnabled]);

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
            backgroundColor: COLORS.theme,
            margin: 20,
            borderRadius: 10,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View
            style={{ width: "80%", justifyContent: "center", paddingLeft: 20 }}
          >
            <Text style={{ color: COLORS.white }}>Working Status</Text>
          </View>
          <View style={{ width: "20%" }}>
            <Switch
              trackColor={{ false: COLORS.red, true: COLORS.greens }}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                toggleSwitch(),
                  isEnabled
                    ? update(ref(database, "/" + key), { Data1: 0 })
                    : update(ref(database, "/" + key), { Data1: 1 });
              }}
              value={isEnabled}
            />
          </View>
        </View>
        {Voltage.map((dat) => {
          return <Text style={styles.TextInput}>{dat}</Text>;
        })}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ApplianceInner;
