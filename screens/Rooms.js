import { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  ActivityIndicator,
  FlatList
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
    <View style={
      { flex: 1 },
      { backgroundColor: COLORS.white }}>
        
    <FlatList
      data={RoomValue}
      ListHeaderComponent={() => (
        <AddHeaderButton text="All Room" />
      )}
      renderItem={({item}) => (
        <ListComponentsButton
          buttonTitle={item.RoomName}
          btnType="bed"
          btnColor={COLORS.theme}
          onPress={()=>{
            nav.navigate("ApList",{ RoomName1 : item.RoomName })}}
        />
      )}
      keyExtractor={item => item.RoomName}/>
      
      </View>
  );
}
