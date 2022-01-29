import React from "react";
import { StyleSheet, View ,TouchableOpacity , Text} from 'react-native';

const Hotten = () =>{
    return(
   <View>
      <View style={styles.container}>
      <View style={styles.RectangleShape} > 
      <Text style={styles.Text}>Add Room</Text>
        </View>
    </View>
   </View>
     
    );
  }
  
  const Cotten = () =>{
    const onPress="";
    return(
   <View>
      <View style={styles.container}>
      <View style={styles.RectangleShape2} > 
      <TouchableOpacity>
            <Text style={styles.Text}>+</Text>
        </TouchableOpacity>
      
        </View>
    </View>
   </View>
     
    );
  }

  const AddButon = () => {
      return(
        <View style={{flex: 1, flexDirection: 'row', alignContent:"center",
        justifyContent:"center",width:"100%",aspectRatio:12/2,marginHorizontal:10}}>

        <Hotten/>
        <Cotten/>
        </View>  
      )
  }
  
  const styles = StyleSheet.create({
    RectangleShape: { 
      width:'100%',
      marginRight:10,
      aspectRatio:8,
      height: 50,
      backgroundColor: '#301A4B',
      justifyContent:"center",
      borderRadius: 8
      },
      Text:{
        fontSize: 25,
        color: "white",
        alignSelf:"center"
      },
      RectangleShape2: {
        width:'100%',
        marginRight:10,
        aspectRatio:1,
        height: 50,
        backgroundColor: 'green',
        justifyContent:"center",
        borderRadius: 8
        },
  });
  
  export default AddButon;