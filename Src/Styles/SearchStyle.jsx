import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   searchInput:{
    height:40,
    width:'80%',
    borderWidth:1,
    borderBottomColor:'gray',
    color:'gray',
    margin:10,
    borderRadius:10,
    paddingLeft:50,
    marginVertical:10,
    paddingRight:15,
    alignSelf:'center',
    right:40

   },
   container:{
   },
   bodyContainer:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
   },
   alertText:{
     left:50,
     marginTop:15,
     fontSize:15,
     fontWeight:'500'
   },
   alertContainer:{
      flexDirection:'row'
   },
   alertIcons:{
     left:50,
     marginTop:18,
     margin:6
   }
})

export default styles;