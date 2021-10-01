/**
 * @format
 */
import * as React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Home from './src/screens/Home'
import messaging from '@react-native-firebase/messaging';
import store from './src/store/store';
import Tts from 'react-native-tts';


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

AppRegistry.registerComponent(appName, () => App);
