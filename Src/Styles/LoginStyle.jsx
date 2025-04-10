import { StyleSheet,Dimensions } from "react-native";

const {height,width} = Dimensions.get('window');
const loginStyles = StyleSheet.create({
    container:{
        backgroundColor:'#0b0d1a',
        paddingHorizontal:10,
        justifyContent:'center',
        alignItems:'center',
        height: height,
        width: width,
    },
    input_container:{
        justifyContent:'center',
        alignItems:'center',
        bottom:120
    },
    logo:{
        width:300,
        height:300,
        color:'white',
    }
})

export default loginStyles;