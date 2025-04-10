import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../Pages/Home';
import Search from '../Pages/Search';
import Discover from '../Pages/Discover';
import Profile from '../Pages/Profile';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import ForgotPassword from '../Pages/ForgotPassword';
import UserAuth from '../Context/AuthContext';
import Notification from '../Pages/Notification';
import Notifications from '../Pages/Notifications';
import Message from '../Pages/Message';
import Stories from '../Pages/Stories';
import ForgotScreen from '../Pages/ForgotScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
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
              iconName =  'chatbox-ellipses-outline';
              break;
            case 'Profile':
              iconName = 'person';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',
          elevation: 5,
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name='Notification' component={Notification} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <UserAuth>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{title:'Kayıt ekranı',headerStyle:{ backgroundColor:'#0b0d1a'},headerTintColor:'#fff',}}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name='Notifications' component={Notifications} />
          <Stack.Screen name='Message' component={Message} />
          <Stack.Screen name='Stories' component={Stories} />
          <Stack.Screen name='ForgotScreen' component={ForgotScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserAuth>
  );
}
