import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, Image, Linking, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home'
import messaging from '@react-native-firebase/messaging';
import store from './src/store/store';
import Tts from 'react-native-tts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import orderScreen from './src/screens/orderScreen';
import register from './src/screens/register';
import { getOrder } from './src/screens/orderScreen'



export default function App() {
  const Stack = createNativeStackNavigator();

  messaging()
    .getToken()
    .then(token => {
      store.setFcmToken(token)
      console.log(token);
    });
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    Tts.speak('You have received a new delivery task');
    console.log('Message handled in the background!', remoteMessage);
  });

  messaging().onMessage(async remoteMessage => {
    console.log(remoteMessage)
    alert("you have received a new order")
    Tts.speak('You have received a new delivery task');
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="orderScreen" component={orderScreen} />
        <Stack.Screen name='register' component={register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}