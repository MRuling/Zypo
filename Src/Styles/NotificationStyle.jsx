import { Dimensions, StyleSheet } from 'react-native';


const {width,height} = Dimensions.get('window');
const styles = StyleSheet.create({
   
 container:{
   width:width,
   height:height
 },
 notificationbodyCenter:{
    marginTop:30,
    marginLeft:30,
    flexDirection:'row'
 },
 notificationText:{
    fontSize:20,
    fontWeight:'500',
    marginLeft:15
 },
 humanIconContainer:{
    height:60,
    width:60,
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'blue',
 },
 notificationsContainer:{
    height:60,
    width:60,
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'yellow',
 },
 messagesContainer:{
    width:60,
    height:60,
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'green',
 },
 messageNotification:{
   bottom:30,
   left:100,
   color:'#64B5F6'
 },
 chevron:{
   top:10,
   left:150,
 },
 chevronS:{
   top:10,
   left:140
 },
 chevronT:{
   top:10,
   left:100
 },
 
})

export default styles;