//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/Products';
import RoomsScreen from '../screens/Rooms';
import SettingScreen from '../screens/Settings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddRoomsScreen from '../screens/AddRoom';
import { Text,StyleSheet,View } from 'react-native';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            backBehaviour={'none'}
            screenOptions={{
                "tabBarShowLabel":false,
                "tabBarStyle":{
                    "position":'absolute',
                    "backgroundColor":'#301A4B',
                    "bottom":25,
                    "left":20,
                    "right":20,
                    "elevation":0,
                    "borderRadius": 15,
                    "height":90,
                    ...style.shadow
                },
                headerStyle: { backgroundColor: '#301A4B' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold',padding:10}
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({color,focused}) => (
                        <Icon name="home-automation" color={focused?'#ffd43b':color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Rooms"
                component={RoomsScreen}
                options={{
                    tabBarColor: '#ffd43b',
                    title:'All Rooms',
                    titleStyle:{
                        fontSize:50
                    },
                    tabBarIcon: ({color,focused}) => (
                        <Icon name="sofa" color={focused?'#ffd43b':color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Add Rooms"
                component={AddRoomsScreen}
                options={{
                    tabBarColor: '#d02760',
                    tabBarIcon: ({color,focused}) => (
                        <View style={{backgroundColor:focused?'#ffd43b':'#fff',borderRadius:50,position:'absolute',top:-25,padding:10,borderWidth:5,borderColor:'#301A4B'}}>
                        <Icon color={focused?'#000':'#301A4B'} name="plus" size={60} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Appliances"
                component={ProductScreen}
                options={{
                    tabBarColor: '#ffd43b',
                    tabBarIcon: ({color,focused}) => (
                        <Icon name="lightbulb-on" color={focused?'#ffd43b':color} size={30} />
                    ),
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
    title:{
        fontSize:50,
    }
});

export default Tabs;