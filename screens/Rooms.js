import { useState, useEffect } from "react";
import {
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { ListComponentsButton } from "../components/ListComponentsButton.js";
import styles from "../const/styles";
import COLORS from "../const/colors";
import AddHeaderButton from "../components/AddHeaderButton";
import { collection, getDocs, query } from "firebase/firestore";
import { authicaton, firestore } from "../const/firebase";
import { useNavigation } from "@react-navigation/native";

export default function RoomsScreen() {
  const [RoomValue, setRoomValue] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const user = authicaton.currentUser;
  const uid = user.uid;
  const nav = useNavigation();

  useEffect(async () => {
    const unsubscribe = nav.addListener("focus", async () => {
      const val = [];
      await getDocs(query(collection(firestore, uid + "/user/Room/"))).then(
        async (snapshot) => {
          snapshot.forEach((item) => {
            val.push(item.data());
          });
        }
      );
      setRoomValue(val);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={({ flex: 1 }, { backgroundColor: COLORS.white })}>
      <AddHeaderButton text="All Room" />
      <ScrollView style={styles.SettingStyle}>
        {RoomValue.map((data) => {
          return (
            <ListComponentsButton
              buttonTitle={data.RoomName}
              btnType="bed"
              btnColor={COLORS.theme}
              onPress={()=>{
                nav.navigate("ApList",{ RoomName1 : data.RoomName })
              }}
            />
          );
        })}
      </ScrollView>
    </ScrollView>
  );
}
