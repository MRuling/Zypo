import  AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider';

const UserAuth = ({children}) => {
    
    const[newsUser,setNewUser] = useState({});

            useEffect(() => {
                userAuth();
            },[])
            
            const userAuth = async() => {
            const jsonString = await AsyncStorage.getItem('user-info');
            if (jsonString) {
                setNewUser(JSON.parse(jsonString));
            }
        }
            const login = async(username,password) => {
                const user = {username,password};
                setNewUser(user);
                await AsyncStorage.setItem('user-info',JSON.stringify(user));
                newsUser('')
            }
    
            const [notification, setNotification] = useState([
                {
                  id: 1,
                  user: 'Name',
                  message: 'seni takip etmeye başladı',
                },
                {
                    id:2,
                    message:'Naber knk '
                }
              ]);
              
            return(
                <AuthContext.Provider value={{login,newsUser,notification,setNotification,setNewUser}}>
                    {children}
                </AuthContext.Provider>
            )
    }
    export default UserAuth;
