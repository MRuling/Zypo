import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useReducer, useState } from 'react';
import { AuthContext } from './AuthProvider';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { auth } from '../../firebaseConfig'; // Firebase Auth'ı import ettik

const initialState = {
  follows:'follow',
  user:null,
  isDarkMode:false,
  isLoggedIn:false,
}

function returnApp (state,action){
 switch(action.type){
  case 'FOLLOW':
    return{...state,
       follows:state.follows === 'follow'? 'follower':'follow'}
       case 'LOGIN':
        return{...state,user:action.payload,isLoggedIn: true}
        case 'LOGOUT':
          return{...state,user: null,isLoggedIn:false}
          case 'TOGGLE_THEME':
            return{...state,isDarkMode: !state.isDarkMode}

            default:
              return state;
}

}
const UserAuth = ({ children }) => {
  const [state,dispatch] = useReducer(returnApp,initialState);
  const [newsUser, setNewUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [follower, setFollwer] = useState([]);
  const [following, setFollowing] = useState([]);
  
  const [userUid, setUserUid] = useState(null); // Kullanıcı UID'si

   
  const theme = {
    backgroundColor: isDarkMode ? 'white' : 'black',
    textColor: isDarkMode ? 'black' : 'white',
    statusbarColor: isDarkMode ? 'white' : 'black',
    statusbarTextColor: isDarkMode ? 'dark' : 'light',
  };

  const followUser = async (targetUsername) => {
    const updatedFollowing = [...following, targetUsername];
    setFollowing(updatedFollowing);
    await AsyncStorage.setItem('following', JSON.stringify(updatedFollowing));
  };

  const addFollower = async (username) => {
    const updatedFollowers = [...follower, username];
    setFollwer(updatedFollowers);
    await AsyncStorage.setItem('followers', JSON.stringify(updatedFollowers));
  };

  const isFollowingUser = (username) => {
    return following.includes(username);
  };

  const handleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    userAuth();
    handleTheme();
    setNewUser();
  }, []);

  const userAuth = async () => {
    const jsonString = await AsyncStorage.getItem('user-info');
    if (jsonString) {
      const user = JSON.parse(jsonString);
      setNewUser(user);
      setIsLoggedIn(true);
      setUserUid(user.uid); // UID'yi alıyoruz
    }
    setLoadingAuth(false);
  };

  const login = async (username, password, uidFromLogin) => {
    const userRef = doc(db, 'usernames', username);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      throw new Error('Kullanıcı adı Firestore’da bulunamadı.');
    }
  
    const email = userSnap.data().email;
  
    const userDetailsRef = doc(db, 'users', email);
    const userDetailsSnap = await getDoc(userDetailsRef);
    const userDetails = userDetailsSnap.exists() ? userDetailsSnap.data() : {};
  
    const user = { username, email, uid: uidFromLogin, ...userDetails };
  
    setNewUser(user);
    await AsyncStorage.setItem('user-info', JSON.stringify(user));
    setIsLoggedIn(true);
    setUserUid(user.uid);
  };
  

  const logout = async () => {
    await AsyncStorage.removeItem('user-info');
    setNewUser('');
    setIsLoggedIn(false);
    setUserUid(null); // UID'yi sıfırlıyoruz
  };

  const [notification, setNotification] = useState([
    { id: 1, user: 'Name', message: 'seni takip etmeye başladı' },
    { id: 2, message: 'Naber knk' },
  ]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        login,
        logout,
        newsUser,
        notification,
        setNotification,
        setNewUser,
        isLoggedIn,
        loadingAuth,
        theme,
        handleTheme,
        followUser,
        userUid,
        // UID'yi context'e ekliyoruz
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default UserAuth;
