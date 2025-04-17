import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import globalStyles from '../Styles/GlobalStyle/GlobalStyle';
import stylesR from '../Styles/RegisterStyle';

const Register = ({ navigation }) => {
  const registerUser = async (values) => {
    const { email, password, username } = values;

    try {
      console.log("🟡 Kayıt işlemi başlatıldı:", values);

      // 1. Username kullanılabilir mi?
      const usernameRef = doc(db, 'usernames', username.toLowerCase());
      const docSnap = await getDoc(usernameRef);

      if (docSnap.exists()) {
        alert('⚠️ Bu kullanıcı adı zaten alınmış.');
        return;
      }

      // 2. Kullanıcı oluşturuluyor
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 3. Firestore'a kullanıcı adı kaydı
      await setDoc(usernameRef, {
        uid: user.uid,
        email,
        createdAt: new Date(),
      });

      console.log("✅ Kullanıcı ve kullanıcı adı kaydedildi.");
      alert("✅ Kayıt başarılı, giriş yapabilirsiniz!");
      navigation.navigate('Login');
    } catch (error) {
      console.log("⛔ Kayıt hatası:", error.message);
      alert(error.message);
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .matches(/^[a-z0-9_]+$/, 'Sadece küçük harf, rakam ve alt çizgi kullanabilirsiniz.')
      .required('Kullanıcı adı zorunlu'),
    email: Yup.string()
      .email('Geçerli bir email giriniz')
      .required('Email zorunlu'),
    password: Yup.string()
      .min(6, 'Şifre en az 6 karakter olmalı')
      .required('Şifre zorunlu'),
    passwordRecent: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Şifreler uyuşmuyor')
      .required('Şifre tekrar zorunlu'),
  });

  return (
    <View style={stylesR.container}>
      <Formik
        initialValues={{ username: '', email: '', password: '', passwordRecent: '' }}
        onSubmit={registerUser}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, values, touched, errors }) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Kullanıcı adı"
              value={values.username}
              onChangeText={handleChange('username')}
              placeholderTextColor="gray"
            />
            {touched.username && errors.username && <Text style={globalStyles.error}>{errors.username}</Text>}

            <TextInput
              style={globalStyles.input}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="gray"
            />
            {touched.email && errors.email && <Text style={globalStyles.error}>{errors.email}</Text>}

            <TextInput
              style={globalStyles.input}
              placeholder="Şifre"
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry
              placeholderTextColor="gray"
            />
            {touched.password && errors.password && <Text style={globalStyles.error}>{errors.password}</Text>}

            <TextInput
              style={globalStyles.input}
              placeholder="Şifre tekrar"
              value={values.passwordRecent}
              onChangeText={handleChange('passwordRecent')}
              secureTextEntry
              placeholderTextColor="gray"
            />
            {touched.passwordRecent && errors.passwordRecent && (
              <Text style={globalStyles.error}>{errors.passwordRecent}</Text>
            )}

            <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
              <Text style={globalStyles.buttonText}>Kayıt Ol</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Register;
