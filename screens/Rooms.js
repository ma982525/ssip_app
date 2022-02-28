import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { ListComponentsButton } from '../components/ListComponentsButton.js';
import styles from '../const/styles';
import COLORS from '../const/colors';
import AddHeaderButton from '../components/AddHeaderButton';
import { collection, getDocs } from "firebase/firestore"
import { authicaton, firestore } from "../const/firebase";
import { List } from "react-native-paper";


export default function RoomsScreen() {
  const [RoomValue, setRoomValue] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const user = authicaton.currentUser;
  const uid = user.uid;

  useEffect(() => { 
    RoomValue.forEach(element => {
        delete element;
    });
    const val=[];
    getDocs(collection(firestore, uid + '/user/Room/')).then((snapshot) => {
      snapshot.forEach(item => {
        RoomValue.push(item.data());
      })
    })
    // setRoomValue(val);
    // RoomValue.forEach(data =>{
    //   console.log(data);
    // })
    
  }, [])


  return (
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
        />
      )}
      keyExtractor={item => item.RoomName}/>
    // <ScrollView style={
    //   { flex: 1 },
    //   { backgroundColor: COLORS.white }}>

    //   <AddHeaderButton text="All Room" />
    //   <ScrollView style={styles.SettingStyle}>
    //   {
    //     RoomValue.map(data => {
    //       return(   
    //     <ListComponentsButton
    //     buttonTitle={data.RoomName}
    //     btnType="bed"
    //     btnColor={COLORS.theme}
    //   />
    //       )
    //     })
    //   }
      
      
        
    //     {/* <ListComponentsButton
    //       buttonTitle="BED ROOM"
    //       btnType="bed"
    //       btnColor={COLORS.theme}
    //     />

    //     <ListComponentsButton
    //       buttonTitle="KITCHEN"
    //       btnType="food"
    //       btnColor={COLORS.theme}
    //     /> */}
    //   </ScrollView>
    // </ScrollView>
  );
}
