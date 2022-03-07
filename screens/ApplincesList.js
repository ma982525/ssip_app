import { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  ScrollView
} from "react-native";
import { ListComponentsButton } from "../components/ListComponentsButton.js";
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
  const route = useRoute();
  const RoomName = route.params.RoomName1;


  useEffect(async () => {
    const unsubscribe = nav.addListener("focus", async () => {
      const val = [];
      await getDocs(query(collection(firestore, uid + "/user/Room/" + RoomName + '/Appliance/'))).then(
        async (snapshot) => {
          snapshot.forEach((item) => {
            val.push(item.data());
          });
        }
      );
      setApplianceValue(val);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <AddBackHeaderButton text={RoomName} />
      </View>
      <View style={{ flex: 10, justifyContent: 'flex-start', backgroundColor: COLORS.white }}>
        <FlatList
          data={ApplianceValue}
          style={{ left: 22 }}
          renderItem={({ item }) => (
            <ListComponentsButton
              buttonTitle={item.ApplianceName}
              btnType="bed"
              btnColor={COLORS.theme}
              onPress={() => {
                nav.navigate("AppInner", {
                  ApName: item.ApplianceName,
                  ApId: item.ApplianceName,
                  ApKey: item.ApplianceKey,
                  ApCd: item.ApplianceCategory
                })
              }}
            />
          )}
          keyExtractor={item => item.ApplianceKey}
        />
      </View>
    </>
  );
}