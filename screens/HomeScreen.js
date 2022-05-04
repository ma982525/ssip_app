import { Alert, Dimensions, Image, StyleSheet, Text, View,ScrollView,Linking } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-web';
import { authicaton } from '../const/firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { updateProfile } from "firebase/auth"
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';
import AnimatedLottieView from 'lottie-react-native';
import { ActivityIndicator } from 'react-native-paper';
import React, { useState } from "react";
import { LineChart,BarChart } from "react-native-chart-kit";
import tip from "../assets/tips.png";
import { windowHeight,windowWidth } from '../const/Dimensions';

const chartConfig = {
  backgroundGradientFrom: "#d4c2f8",
  backgroundGradientFromOpacity:0,
  backgroundGradientTo: "#d4c2f8",  
  backgroundGradientToOpacity:0,
  color: (opacity = 1) => `rgba(101, 88, 245, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  style: {
    borderRadius: 16,
  },
};
const chartConfig2 = {
  backgroundGradientFrom: "#d4c2f8",
  backgroundGradientFromOpacity:0,
  backgroundGradientTo: "#d4c2f8",  
  backgroundGradientToOpacity:0,
  color: (opacity = 1) => '#a48409',
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  style: {
    borderRadius: 16,
  },
};

export default function HomeScreen(props) {
  let [fontsLoaded] = useFonts({
    'Poppins': require('../assets/fonts/Poppins-Regular.ttf'),
    'PoppinsMedium': require('../assets/fonts/Poppins-Medium.ttf'),
    'PoppinsBold': require('../assets/fonts/Poppins-Bold.ttf'),
    'PoppinsExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
  });

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
  };
  

  const user = authicaton.currentUser;
  const name = user.displayName;
  if (!fontsLoaded)
    return (
      <View style={styles.container2}>
        <ActivityIndicator
          animating={true}
          color="rgba(101, 88, 245, 1)"
          size="large"
          style={styles.activityIndicator} />
      </View>);


  return (
    <>
    <ScrollView> 
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text21}>Hello {name},</Text>
          <AnimatedLottieView source={require('../assets/animation.json')} autoPlay loop style={{ position: 'absolute', width: 340, top: -20 }} />
        </View>
        <Text style={{ fontFamily: 'Poppins', fontSize: 16 }}>Make Life Brighter !!</Text>
        <View style={{width:"100%",height:windowHeight/4+20,marginVertical:20}}>
          <Image source={require('../assets/home_hero.png')} style={{width:"100%",height:"100%"}}/>
        </View>
        {/* <View style={{borderRadius:15,marginVertical:20,backgroundColor:"#f7f3ff"}}>
          <LineChart
            data={data}
            width={Dimensions.get('window').width- 60}
            height={220}
            verticalLabelRotation={0}
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: 15
            }}
          />
        </View> */}
        <View style={{ flexDirection: 'row' }}>
          <View style={{borderRadius:15,width:'49%',height:150,backgroundColor:'#cfcfff',marginRight:10,padding:15}}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{fontFamily:'PoppinsExtraBold',fontSize:20,color:'#2d2db1',}}>Tips</Text>
                <Image source={require('../assets/creative-bulb.png')} style={{width:140,height:100}}/>
              </View>
              <TouchableOpacity><Text style={{fontFamily:'Poppins',color:'#2d2db1',fontSize:12}} onPress={()=>Linking.openURL('https://www.indiatoday.in/information/story/how-to-control-electricity-consumption-here-is-all-you-need-to-know-1733497-2020-10-20')}>Read More <Icon name="chevron-right" color={'#2d2db1'} size={10}/></Text></TouchableOpacity>
          </View>
          <View style={{borderRadius:15,width:'49%',height:150,backgroundColor:'#ffc5c5',marginRight:10,padding:15}}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{fontFamily:'PoppinsExtraBold',fontSize:20,color:'#811212',}}>Help</Text>
                <Image source={require('../assets/gear.png')} style={{width:140,height:100}}/>
              </View>
              <TouchableOpacity><Text style={{fontFamily:'Poppins',color:'#811212',fontSize:12}} onPress={()=>Linking.openURL('https://powermin.gov.in/')}>Learn More <Icon name="chevron-right" color={'#811212'} size={10}/></Text></TouchableOpacity>
          </View>
        </View>


        <View style={{width:"100%",height:windowHeight/4+20,marginVertical:20}}>
          <Image source={require('../assets/Control_home.png')} style={{width:"100%",height:"100%"}}/>
        </View>


        {/* <View style={{borderRadius:15,marginVertical:20,backgroundColor:"#fff8bb",...styles.shadow}}>
        <BarChart
          //style={graphStyle}
          data={data}
          width={Dimensions.get('window').width- 60}
          height={220}
          yAxisLabel="$"
          chartConfig={chartConfig2}
          style={{
            marginVertical: 15
          }}
        />
        </View> */}
        <View style={{height:100,width:"100%"}}>

        </View>

        
      </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    height:"100%",
  },
  shadow:{
    shadowColor: '#171717',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.9,
    shadowRadius: 3,
},
  text21: {
    fontSize: 25,
    fontFamily: 'PoppinsBold',
  },
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
  containerhide: {
    display: 'none'
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
});

