import { Dimensions, StyleSheet } from "react-native";

const {width,height} = Dimensions.get('window');
const stylesR = StyleSheet.create({
       container:{
    width:width,
    height:height,
    backgroundColor:'#0b0d1a',
    paddingHorizontal:10,
    justifyContent:'flex-start',
    alignItems:'center',
    
    },
})

export default stylesR;