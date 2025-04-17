import { Text, View, FlatList, TouchableOpacity,Image} from 'react-native'
import React, { useContext, useRef } from 'react'
import styles from '../Styles/NotificationStyle';
import { AuthContext } from '../Context/AuthProvider';
import { Ionicons } from '@expo/vector-icons';
import Story from '../Pages/Story';
const Notification = ({ navigation }) => {

  const { notification,theme } = useContext(AuthContext);
  const handleNotifications = () => {
    navigation.navigate('Notifications');
  }

 const truncateText = (text,limit=30) =>{
    return text.length > limit ?  text.substring(0,limit) + '...' : text;
 }
  const notifications = (index) => {
    if (notification && notification.length > index) {
      const {user,message} = notification[index];
      return (
        <Text style={styles.messageNotification}>
         {truncateText(`${user} ${message}`, 35)}

        </Text>
      );
    }
    return null;
  };
  
  const storyData = [
    { id: 1, imgUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, imgUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 3, imgUrl: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 4, imgUrl: 'https://randomuser.me/api/portraits/women/4.jpg' },
  ];
  
  const handleMessage = ()=> {
    navigation.navigate('MaterialTab');
  }
  return (
    <View style={[styles.container,{backgroundColor:theme.backgroundColor}]}>

      
          <TouchableOpacity style={styles.notificationbodyCenter} onPress={handleNotifications} activeOpacity={1}>
            <View style={styles.notificationsContainer}>
              <Ionicons name='notifications-outline' size={30} />
            </View>
            <Text style={[styles.notificationText,{color:theme.textColor}]}>Bildirimler</Text>
            <Ionicons name='chevron-forward-outline' size={20} style={[styles.chevronS,{color:theme.textColor}]} />
          </TouchableOpacity>
        {notifications()}
        <TouchableOpacity style={styles.notificationbodyCenter} activeOpacity={1}>
          <View style={styles.humanIconContainer}>
            <Ionicons name='people-outline' size={25} color={'white'} />
          </View>
          <Text style={[styles.notificationText,{color:theme.textColor}]}>Yeni Takipçiler</Text>
          <Ionicons name='chevron-forward-outline' size={20} style={[styles.chevronT,{color:theme.textColor}]} />
        </TouchableOpacity>
      
      {notifications(0)}
      <TouchableOpacity style={styles.notificationbodyCenter} activeOpacity={1} onPress={handleMessage}>
        <View style={styles.messagesContainer}>
          <Ionicons name="chatbubble-outline" size={25} />
        </View>
        <Text style={[styles.notificationText,{color:theme.textColor}]}>Mesajlar</Text>
        <Ionicons name='chevron-forward-outline' size={20} style={[styles.chevron,{color:theme.textColor}]} />
      </TouchableOpacity>
      {notifications()}
    </View>
  )
}

export default Notification;
