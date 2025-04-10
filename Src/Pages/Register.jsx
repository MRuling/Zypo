import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../Styles/GlobalStyle/GlobalStyle'
import {Formik} from 'formik';
import * as Yup from 'yup';
import stylesR from '../Styles/RegisterStyle';
const Register = () => {
  
  const validationSchema = Yup.object().shape({
    username: Yup.string().matches(/^[a-z0-9_]/,'Yalnızca büyük harf rakam ve alt çizgi girlebilir').required('Kullanıcı adı zorunlu'),
    email: Yup.string().required('Email zorunlu '),
    password: Yup.string().min(6,'En az 6 karakterli bir şifre girilmelidir '),
    passwordRecent: Yup.string().oneOf([Yup.ref('password'),null],'Şifreler eşleşmiyor').required('Bu alan zorunlu '),
    phoneNumber: Yup.string().matches(/^\d{10}$/,'Telefon numarası 10 haneli olmalı').nullable(),
  })
  return (
    <View style={stylesR.container}>
     <Formik initialValues={{username:'',email:'',phoneNumber:'',password:'',passwordRecent:''}} validationSchema={validationSchema} onSubmit={(values) => {console.log(values)}}>
        {({handleChange,handleSubmit,errors,touched,values}) => (
          <View>
            <TextInput 
             placeholder='Kullanıcı adı giriniz'
             placeholderTextColor='gray'
             value={values.username}
             onChangeText={handleChange('username')}
             style={styles.input}
            />
            < TextInput 
            placeholder='Email giriniz'
            placeholderTextColor='gray'
            value={values.email}
            onChangeText={handleChange('email')}
            style={styles.input}
            />
            <TextInput 
            placeholder='Şifre giriniz'
            placeholderTextColor='gray'
            value={values.password}
            onChangeText={handleChange('password')}
            style={styles.input}
            />
             <TextInput 
            placeholder='Şifre giriniz'
            placeholderTextColor='gray'
            value={values.passwordRecent}
            onChangeText={handleChange('passwordRecent')}
            style={styles.input}
            />
             <TextInput 
            placeholder='Şifre giriniz'
            placeholderTextColor='gray'
            value={values.phoneNumber}
            onChangeText={handleChange('phoneNumber')}
            style={styles.input}
            />
            <TouchableOpacity style={styles.button} >
              <Text style={styles.buttonText}>Kayıt ol</Text>
            </TouchableOpacity>
          </View>
        )}
     </Formik>
    </View>
  )
}

export default Register