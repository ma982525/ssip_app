import { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  ActivityIndicator,
  FlatList,StyleSheet
} from "react-native";
import { ListComponentsButton } from "../components/ListComponentsButton.js";
import COLORS from "../const/colors";
import AddHeaderButton from "../components/AddHeaderButton";
import { collection, getDocs, query } from "firebase/firestore";
import { authicaton, firestore } from "../const/firebase";
import { useNavigation } from "@react-navigation/native";

export default function RoomsScreen() {
  const [RoomValue, setRoomValue] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = authicaton.currentUser;
  const uid = user.uid;
  const nav = useNavigation();

  useEffect(async () => {
    const unsubscribe = nav.addListener("focus", async () => {
      const val = [];
      await getDocs(query(collection(firestore,"user/"+ uid + "/Room"))).then(
        async (snapshot) => {
          snapshot.forEach((item) => {
            console.log(item.data())
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
        <AddHeaderButton text="All Room" />
      </View>

      <View style={{ flex: 10, justifyContent: 'flex-start', backgroundColor: COLORS.white }}>
        <FlatList
          data={RoomValue}
          style={{left:20}}
          renderItem={({ item }) => (
            <ListComponentsButton
              buttonTitle={item.RoomName}
              btnType="bed"
              btnColor={COLORS.theme}
              name={item.RoomName}
              id={item.RoomId}
            />
          )}
          keyExtractor={item => item.RoomId} />
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

