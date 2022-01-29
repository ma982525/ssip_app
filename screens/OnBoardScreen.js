import react from "react";
import { Text,StyleSheet,View,Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrimaryButton } from "../components/PrimaryButton";
import COLORS from '../const/colors';
import img1 from '../assets/onboard1.png';
import img2 from '../assets/onboard2.png';
import img3 from '../assets/onboard3.png';
import Onboarding from "react-native-onboarding-swiper";
import { Button } from "react-native-elements";

const Next = ({...props}) => (
    <Button
    title={'Next'}
    buttonStyle={{
      backgroundColor: "#000",
      width:100,
      marginBottom:10
    }}
    textStyle={{ color: '#fff' }}
    {...props}
  />
  );
  const Skip = ({...props}) => (
    <Button
    title={'Skip'}
    buttonStyle={{
      backgroundColor: "#000",
      width:100,
      marginBottom:10
    }}
    textStyle={{ color: '#fff' }}
    {...props}
  />
  );

const OnBoardScreen = ({navigation}) => {
    return(
        <Onboarding
            onDone={() => navigation.replace('Auth')}
            onSkip={() => navigation.replace('Auth')}
            bottomBarHighlight={false}
            transitionAnimationDuration={300}
            NextButtonComponent={Next}
            SkipButtonComponent={Skip}
            
            pages={[
                {
                    backgroundColor: '#FFE5E5',
                    image: <Image source={img1} size={10}/>,
                    title: 'Onboarding',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                    backgroundColor: '#FFFAEC',
                    image: <Image source={img2} />,
                    title: 'Onboarding',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                    backgroundColor: '#E8F3FF',
                    image: <Image source={img3} />,
                    title: 'Onboarding',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
            ]}
        />
    );
};
const styles= StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:30,
        justifyContent:'space-between',
        paddingBottom:20,
    },
});
export default OnBoardScreen;