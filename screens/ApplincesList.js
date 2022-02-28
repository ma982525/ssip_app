import { useState, useEffect } from "react";
import {
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { ListComponentsButton } from "../components/ListComponentsButton.js";
import styles from "../const/styles";
import COLORS from "../const/colors";
import AddBackHeaderButton from "../components/AddBackHeaderButton";
import { collection, getDocs, query } from "firebase/firestore";
import { authicaton, firestore } from "../const/firebase";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

export default function ApplincesList() {
  const [ApplianceValue, setApplianceValue] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const user = authicaton.currentUser;
  const uid = user.uid;
  const nav = useNavigation();
  const route=useRoute();
  const RoomName= route.params.RoomName1;
  useEffect(async () => {
    const unsubscribe = nav.addListener("focus", async () => {
      const val = [];
      await getDocs(query(collection(firestore, uid + "/user/Room/"+ RoomName +'/Appliance/'))).then(
        async (snapshot) => {
          snapshot.forEach((item) => {
            val.push(item.data());
          });
        }
      );
      setApplianceValue(val);
      ApplianceValue.forEach((dota)=>{
          console.log(dota);
      })
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={({ flex: 1 }, { backgroundColor: COLORS.white })}>
        <AddBackHeaderButton text="All Appliance" />
      <ScrollView style={styles.SettingStyle}>
        {ApplianceValue.map((data) => {
          return (
            <ListComponentsButton
              buttonTitle={data.ApplianceName}
              btnType="bed"
              btnColor={COLORS.theme}
              onPress={()=>{
                nav.navigate("AppInner",{ 
                    ApName : data.ApplianceName, 
                    ApId: data.ApplianceName ,
                    ApKey : data.ApplianceKey,
                    ApCd : data.ApplianceCategory
                })
              }}
            />
          );
        })}
      </ScrollView>
    </ScrollView>
  );
}
