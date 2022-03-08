//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/Appliances';
import AddAppliancesPage from '../screens/AddAppliances';
import RoomsScreen from '../screens/Rooms';
import SettingScreen from '../screens/Settings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddRoomsScreen from '../screens/AddRoom';
import { Text,StyleSheet,View} from 'react-native';
import ApplianceInner from '../screens/ApplianceInnerScreen';
import AddRoomPage from '../screens/AddRoomPage';
import ApplincesList from '../screens/ApplincesList';

const Appstack = createStackNavigator();
const AppNav = () =>{
  return(
    < Appstack.Navigator>
      <Appstack.Screen name="findRoom" component={ ProductScreen }  options={{headerShown: false}}/>
      <Appstack.Screen name="AddNewApp" component={ AddAppliancesPage }  options={{headerShown: false}}/>
    </ Appstack.Navigator>
  )
    
}
const Ap = createStackNavigator();

const innerNavi = () =>{
  return(
    < Ap.Navigator initialRouteName='RoomList'>
    < Ap.Screen name="RoomList" component={ RoomsScreen }  options={{headerShown: false}} />
      < Ap.Screen name="ApList" component={ ApplincesList }  options={{headerShown: false}} />
      < Ap.Screen name="AppInner" component={ ApplianceInner } options={{headerShown: false}} />
    </ Ap.Navigator>
  )

}

const Ar = createStackNavigator();

const RoomNav = () =>{
  return(
    < Ar.Navigator initialRouteName='AddRoom'>
      < Ar.Screen name="AddRoom" component={ AddRoomPage }  options={{headerShown: false}}/>
      < Ar.Screen name="AddApp" component={ AddAppliancesPage } options={{headerShown: false}}/>
    </ Ar.Navigator>
  )
    
}


const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            backBehavior='history'
            screenOptions={{
                "tabBarShowLabel":false,
                "tabBarStyle":{
                    "position":'absolute',
                    "backgroundColor":'#301A4B',
                    "bottom":20,
                    "left":20,
                    "right":20,
                    "elevation":0,
                    "borderRadius": 15,
                    "height":80,
                    ...style.shadow
                },
                headerStyle: { backgroundColor: '#301A4B' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold',padding:10},
                tabBarHideOnKeyboard: true,
                headerTitleAlign:"center",
                headerTitleAllowFontScaling:true,
                headerBackVisible:true,
            }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({color,focused}) => (
                        <Icon name="home-automation" color={focused?'#ffd43b':color} size={30} />
                    ),
                    headerShown:false,
                }}
            />
            <Tab.Screen
                name="Rooms"
                component={innerNavi}
                options={{
                    tabBarColor: '#ffd43b',
                    title:'All Rooms',
                    titleStyle:{
                        fontSize:50
                    },
                    tabBarIcon: ({color,focused}) => (
                        <Icon name="sofa" color={focused?'#ffd43b':color} size={30} />
                    ),
                    headerShown:false,
                    
                }}
            />
            <Tab.Screen
                name="Add Rooms"
                component={RoomNav}
                options={{
                    tabBarColor: '#d02760',
                    tabBarIcon: ({color,focused}) => (
                        <View style={{backgroundColor:focused?'#ffd43b':'#fff',borderRadius:50,position:'absolute',top:-25,padding:10,borderWidth:5,borderColor:'#301A4B'}}>
                            <Icon color={focused?'#000':'#301A4B'} name="plus" style={style.plus}  />
                        </View>
                    ),
                    headerShown:false
                }}
            />
            <Tab.Screen
                name="Appliances"
                component={AppNav}
                options={{
                    tabBarColor: '#ffd43b',
                    tabBarIcon: ({color,focused}) => (
                        <Icon name="lightbulb-on" color={focused?'#ffd43b':color} size={30} />
                    ),
                    headerShown:false,
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingScreen}
                options={{
                    tabBarColor: '#6518f4',
                    tabBarIcon: ({color,focused}) => (
                        <Icon name="account-cog" color={focused?'#ffd43b':color} size={30} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const style=StyleSheet.create({
    shadow:{
        shadowColor:'#7F5DF0',
        shadowOffset:{
            width:0,
            height:20,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.5,
        elevation: 5
    },
    plus:{
        fontSize:50,
        aspectRatio:1,
    }
});

export default Tabs;