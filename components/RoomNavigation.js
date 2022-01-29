import AddAppliances from '../screens/AddAppliances';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddRoomPage from '../screens/AddRoomPage'

const Ar = createNativeStackNavigator();

const Hello = props =>{
  return(
    < Ar.Navigator initialRouteName='AddR'>
      < Ar.Screen name="AddR" component={ AddRoomPage }  options={{headerShown: false}}/>
      < Ar.Screen name="AddApp" component={ AddAppliances } options={{headerShown: false}}/>
    </ Ar.Navigator>
  )
    
}


export  default Hello;