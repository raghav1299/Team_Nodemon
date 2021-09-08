import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, Image, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home'
import messaging from '@react-native-firebase/messaging';
import store from './src/store/store';

export default function App() {
  const Stack = createNativeStackNavigator();

  messaging()
    .getToken()
    .then(token => {
      store.setFcmToken(token)
      console.log(token);
    });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}