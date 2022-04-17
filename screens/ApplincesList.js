import { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  ScrollView,StyleSheet
} from "react-native";
import { ListComponentsButton } from "../components/ListComponentsButton.js";
import COLORS from "../const/colors";
import AddBackHeaderButton from "../components/AddBackHeaderButton";
import { collection, getDocs,query, where } from "firebase/firestore";
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
  const RoomId = route.params.RoomId;
  console.log(RoomId);
  useEffect(async () => {
    const unsubscribe = nav.addListener("focus", async () => {
      const val = [];
      await getDocs(query(collection(firestore,"user" +'/' + uid + '/'+'Appliance'), where("RoomId", "==", RoomId ))).then(
        async (snapshot) => {
          snapshot.forEach((item) => {
            console.log(item.data());
            val.push(item.data());
          });
        }
      );
      setApplianceValue(val);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) 
  {
    return (
      <View style={styles.container2}>
        <ActivityIndicator
          animating={true}
          color="rgba(101, 88, 245, 1)"
          size="large"
          style={styles.activityIndicator} />
      </View>);
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
                  RoomId : item.RoomId,
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
const styles = StyleSheet.create({
  container2: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    zIndex: 10,
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.8)'
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  }
});

