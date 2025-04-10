import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const Loading = ({onFinish,navigation}) => {

    useEffect(() => {
        const timer = setTimeout(() => {
           onFinish();
        navigation.navigate('TabNavigator');
        },3000)
        return () => clearTimeout(timer);
    },[])
  return (
    <View>
      <ActivityIndicator size={'large'}  color={'white'} />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})