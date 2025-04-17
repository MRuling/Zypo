import React, { useContext } from 'react';
import { View,Text,Image, TouchableOpacity } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../Context/AuthProvider';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Home from '../Pages/Home';
import Search from '../Pages/Search';
import Discover from '../Pages/Discover';
import Profile from '../Pages/Profile';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import ForgotPassword from '../Pages/ForgotPassword';
import Notification from '../Pages/Notification';
import Notifications from '../Pages/Notifications';
import Message from '../Pages/Message';
import Stories from '../Pages/Stories';
import ForgotScreen from '../Pages/ForgotScreen';
import UserAuth from '../Context/AuthContext';
import Chat from '../Pages/Chat';
import AiChat from '../Pages/AiChat';
import UsersProfile from '../Pages/UsersProfile';
import UserProvider from '../Context/UserProvider';
import CropScreen from '../Pages/Crop';
import Messages from '../Pages/Messages';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MyTab = createMaterialTopTabNavigator();

function MaterialTabNavigator (){
  return(
    <MyTab.Navigator>
      <MyTab.Screen name="Chat" component={Message} />
      <MyTab.Screen name='AiChat' component={AiChat} />
    </MyTab.Navigator>
  )
}
function TabNavigator() {
  const {theme} = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Search':
              iconName = 'search';
              break;
            case 'Discover':
              iconName = 'videocam';
              break;
            case 'Notification':
              iconName = 'chatbox-ellipses-outline';
              break;
            case 'Profile':
              iconName = 'person';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.textColor,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: theme.backgroundColor,
          elevation: 5,
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function RootStack() {
  const {newsUser} = useContext(AuthContext);
  const navigation = useNavigation() ;
  const { isLoggedIn, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) return null; // auth kontrolü bitene kadar ekran gösterme (istersen Splash ekleyebilirsin)

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="Notifications" component={Notifications} options={{headerShown:true}}/>
          <Stack.Screen name="Stories" component={Stories} />
          <Stack.Screen name="ForgotScreen" component={ForgotScreen} />
          <Stack.Screen name='MaterialTab' component={MaterialTabNavigator}/>
          <Stack.Screen name='UsersProfile' component={UsersProfile} />
          <Stack.Screen name='Crop' component={CropScreen} />

          <Stack.Screen
  name="Messages"
  component={Messages}
  options={({ route }) => {
    const { isim, image, zaman } = route.params || {};

    return {
      headerShown: true,
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent:'space-between'}}>
          <TouchableOpacity onPress={() => navigation.navigate('UsersProfile',{isim:isim})} style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent:'space-between'}}>

          <Image
            source={{ uri: image }}
            style={{ width: 35, height: 35, borderRadius: 17.5, marginRight: 10 }}
            />
          <View>
            <Text style={{ fontSize: 14, fontWeight: '600' }}>{newsUser.username}</Text>
            <Text style={{ fontSize: 10, color: 'gray' }}>{zaman}</Text>
          </View>
            </TouchableOpacity>
          <Ionicons name='camera-outline' size={20} style={{left:120}}/>
          <Ionicons name="call" size={20} style={{left:150}}/>
          <Ionicons name="ellipsis-vertical" size={20} style={{left:170}} />
        </View>
      ),
    };
  }}
/>
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <UserAuth>
      <UserProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
      </UserProvider>
    </UserAuth>
  );
}
