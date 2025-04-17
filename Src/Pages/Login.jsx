import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import React, { useContext, useState } from 'react'
import { Formik } from 'formik'
import styles from '../Styles/GlobalStyle/GlobalStyle'
import loginStyles from '../Styles/LoginStyle'
import { StatusBar } from 'expo-status-bar'
import * as Yup from 'yup';
import Loading from './Loading';
import { auth,db} from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../Context/AuthProvider'
import { doc, getDoc } from 'firebase/firestore'; 

const Login = ({ navigation }) => {
  const [loading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    username: Yup.string().matches(/^[a-z0-9_]+$/, 'Yalnızca küçük harf rakam ve alt çizgi girilebilir').required('Kullanıcı adı zorunlu'),
    password: Yup.string().min(6, 'En az 6 karakter girilmelidir').required('Şifre zorunlu')
  });

  const hanleLogin = async (values) => {
    setIsLoading(true);
    try {
      const { username, password } = values;

      // Firebase Auth giriş
      const userRef = doc(db, 'usernames', username);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        throw new Error('Kullanıcı adı bulunamadı.');
      }

      const email = userSnap.data().email;
      const authUser = await signInWithEmailAndPassword(auth, email, password);
      const uid = authUser.user.uid;
       await login(username, password, uid); // UID'yi gönderiyoruz
      navigation.navigate('TabNavigator');
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={loginStyles.container}>
      <StatusBar translucent={false} />
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={hanleLogin}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View style={loginStyles.input_container}>
            <ImageBackground source={require('../../assets/Logo.png')} style={loginStyles.logo} />
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              placeholder='Kullanıcı adı giriniz...'
              placeholderTextColor='gray'
              value={values.username}
              onChangeText={handleChange('username')}
            />
            {errors.username && touched.username && <Text style={{ color: 'tomato' }}>{errors.username}</Text>}
            <TextInput
              style={styles.input}
              placeholder='Şifre giriniz...'
              placeholderTextColor='gray'
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry
            />
            {errors.password && touched.password && <Text style={{ color: 'tomato' }}>{errors.password}</Text>}
            <TouchableOpacity style={styles.button} activeOpacity={1} onPress={handleSubmit}>
              {loading ? <Loading /> : <Text style={styles.buttonText}>Giriş yap</Text>}
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.buttonText}>Şifreni mi unuttun?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonFP} activeOpacity={1} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.buttonTextFp}>Yeni hesap oluştur</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Login;
