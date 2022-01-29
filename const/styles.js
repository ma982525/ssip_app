import { StyleSheet, TextComponent } from 'react-native';
import COLORS from '../const/colors';
import {windowHeight, windowWidth} from "../const/Dimensions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#f0eaf8",
    borderRadius: 5,
    textAlign:'center',
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  inputView100: {
    backgroundColor: "#f0eaf8",
    borderRadius: 5,
    textAlign:'center',
    width: "100%",
    height: 45,
    marginTop: 20,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    paddingLeft:20,
    width:'100%',
    borderColor:COLORS.themeBorder,
    borderWidth:1,
    borderRadius:5,
    color:'black'
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "70%",
    borderRadius: 8,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#301A4B",
  },
  TextView:{
    fontWeight: "bold",
    height:50,
    fontSize:25,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  containerOfAddButton:{
    paddingLeft:10
  },
  ThemeHeader:{
    alignSelf:'center'
  },
  HeaderText: { 
    backgroundColor:COLORS.theme,
    justifyContent:"center",
    alignSelf:'center',
    borderRadius: 8
  },
  addNameHeader: { 
    backgroundColor:COLORS.theme,
    justifyContent:"center",
    borderRadius: 8
  },
  logoutaddNameHeader: { 
    backgroundColor:COLORS.theme,
    justifyContent:"center",
    borderRadius: 8,
    flex:1
  },
  AddPlusText:{
    fontSize: 19,
    color: COLORS.white,
    alignSelf:'center',
  },
  TextOfButtonInner2:{
    fontSize: 16,
    color: COLORS.white,
    alignSelf:'center',
  },
  TextOfButtonInner:{
    fontSize: 16,
    color: COLORS.white,
    alignSelf:'flex-start',
    paddingLeft:15
  },
  logoutTextOfButtonInner:{
    fontSize: 16,
    color: COLORS.white,
    alignSelf:'center'
  },
  Submit: { 
    // Header top add button
  backgroundColor: COLORS.theme,
  justifyContent:"center",
  borderRadius: 8,
  shadowColor:COLORS.yellow,
      shadowOffset:{
          width:0,
          height:20,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5.5,
      elevation: 10
},
  buttonAdd: { 
      // Header top add button
    backgroundColor: COLORS.theme,
    justifyContent:"center",
    borderRadius: 8,
    shadowColor:COLORS.yellow,
        shadowOffset:{
            width:0,
            height:20,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.5,
        elevation: 10
  },
    fontSizeOfText:
    {
      fontSize:30,
      justifyContent:"center"
    },
    //css of textfiled
    textconteniorOfAddTextFiled:{
      marginTop:10,
       alignContent:"center",
       justifyContent:"center",
       marginVertical:5
    },

    marginsetOfTextConatiner:
    {
     paddingVertical:30,
     marginLeft:20,
     marginRight:20
    },
    shadow:{
      shadowColor:COLORS.CornflowerBlue,
      shadowOffset:{
          width:0,
          height:20,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5.5,
      elevation: 5
  },
  plus :{
    fontSize:60,
    aspectRatio:1
  },
  SettingStyle :
  {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingLeft : "10%",
    paddingVertical: "30%"
  },
  iconWrapper: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logouticonWrapper: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    fontWeight: 'bold',
  },
  btnTxtWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutbtnTxtWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 30,
    width: '70%',
    height: windowHeight / 15,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 3,
  },
  mystyle:{
    textAlign:'center'
  }
});
export default styles