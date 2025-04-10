import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input:{
     width:380,
     borderWidth:1,
     height:50,
     borderRadius:10,
     marginHorizontal:8,
     margin:10,
     borderBottomColor:'lightgray',
     color:'lightgray',
     padding:10
     
  },
  button:{
    backgroundColor:'#3F51B5',
    borderRadius:15,
    height:35,
    marginBottom:15,
    justifyContent:'center',
    alignItems:'center',
    width:380,
    marginTop:10
   
  },
  buttonText:{
    color:'white',
  },
  buttonFP:{
    borderColor:'#42a5f5',
    borderWidth:2,
    borderRadius:15,
    height:35,
    marginBottom:15,
    justifyContent:'center',
    alignItems:'center',
    width:380,
    marginTop:10,
    top:200
   
  },
  buttonTextFp:{
    color:'white',
  }
})

export default styles;