import { Text, View, FlatList, TouchableOpacity,Image} from 'react-native'
import React, { useContext, useRef } from 'react'
import styles from '../Styles/NotificationStyle';
import { AuthContext } from '../Context/AuthProvider';
import { Ionicons } from '@expo/vector-icons';
import Story from '../Pages/Story';
const Notification = ({ navigation }) => {
  const { notification } = useContext(AuthContext);
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
    navigation.navigate('Message');
  }
  return (
    <View style={styles.container}>
            <Story />
          <TouchableOpacity style={styles.notificationbodyCenter} onPress={handleNotifications} activeOpacity={1}>
            <View style={styles.notificationsContainer}>
              <Ionicons name='notifications-outline' size={30} />
            </View>
            <Text style={styles.notificationText}>Bildirimler</Text>
            <Ionicons name='chevron-forward-outline' size={20} style={styles.chevronS} />
          </TouchableOpacity>
        {notifications()}
        <TouchableOpacity style={styles.notificationbodyCenter} activeOpacity={1}>
          <View style={styles.humanIconContainer}>
            <Ionicons name='people-outline' size={25} color={'white'} />
          </View>
          <Text style={styles.notificationText}>Yeni Takipçiler</Text>
          <Ionicons name='chevron-forward-outline' size={20} style={styles.chevronT} />
        </TouchableOpacity>
      
      {notifications(0)}
      <TouchableOpacity style={styles.notificationbodyCenter} activeOpacity={1} onPress={handleMessage}>
        <View style={styles.messagesContainer}>
          <Ionicons name="chatbubble-outline" size={25} />
        </View>
        <Text style={styles.notificationText}>Mesajlar</Text>
        <Ionicons name='chevron-forward-outline' size={20} style={styles.chevron} />
      </TouchableOpacity>
      {notifications()}
    </View>
  )
}

export default Notification;
