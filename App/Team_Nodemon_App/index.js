/**
 * @format
 */

import {AppRegistry} from "react-native";
import App from "./App";
import {name as appName} from "./app.json";
import messaging from "@react-native-firebase/messaging";
import Store from "./src/Store/Store";
import PushNotification, {Importance} from "react-native-push-notification";
let channelID = "";
PushNotification.createChannel(
    {
        channelId: "channel-id", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    created => {
        if (created) {
            PushNotification.getChannels(function (channel_ids) {
                console.log(channel_ids[1]);
                channelID = channel_ids[1]; // ['channel_id_1']
            });
        }
    }
);

messaging().setBackgroundMessageHandler(async remoteMessage => {
    PushNotification.localNotification({
        channelId: channelID,
        title: remoteMessage.notification.title, // (optional)
        message: remoteMessage.notification.body,
        vibrate: true, // (optional) default: true
        vibration: 800,
    });
});

messaging().onMessage(async remoteMessage => {
    PushNotification.localNotification({
        channelId: channelID,
        title: remoteMessage.notification.title, // (optional)
        message: remoteMessage.notification.body,
        vibrate: true, // (optional) default: true
        vibration: 800,
    });
});

AppRegistry.registerComponent(appName, () => App);
