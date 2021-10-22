import React, {useState, useEffect} from "react";
import {NavigationContainer} from "@react-navigation/native";
import BottomTabNavigators from "./src/Navigation/BottomTabNavigators/BottomTabNavigators";
import {AuthStackNavigators, NetworkErrorStack} from "./src/Navigation/AuthNavigators/AuthStackNavigators";
import {Observer} from "mobx-react";
import Store from "./src/Store/Store";
import messaging from "@react-native-firebase/messaging";
import {getData, showNotification} from "./src/Functions/AppFuntions";
import {Loader} from "./src/Components/Components";
import SplashScreen from "react-native-splash-screen";
import {API_CALL} from "./src/Functions/ApiFuntions";
import NetInfo from "@react-native-community/netinfo";

export default function App() {
    const [networkState, setNetworkState] = useState(true);
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(({isConnected}) => {
            if (isConnected) {
                setNetworkState(true);
            } else if (!isConnected) {
                showNotification("Internet Disconnected");
                setNetworkState(false);
            }
        });

        return () => {
            console.log("UNMOUNTED");
            unsubscribe();
        };
    }, []);

    async function UpdateTokenToServer(id, token) {
        try {
            const data = await API_CALL(
                {
                    url: `/api/user/set_user_fcm_token?token${token}&inc_id=${id}`,
                    method: "patch",
                },
                {type: "WEB"}
            );
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(async () => {
        const authState = await getData("authState");
        const userName = await getData("username");
        const userId = await getData("userId");
        messaging()
            .getToken()
            .then(token => {
                Store.setFcmToken(token);
                console.log("FCM Token", token);
                UpdateTokenToServer(userId, token);
            });

        if (authState && userName && userId) {
            console.log(authState, userName, userId);
            Store.setAuthTokenVal(1);
            Store.setUsernameVal(userName);
            Store.setUserIdVal(userId);
        }

        SplashScreen.hide();
    });
    if (!networkState) {
        return (
            <NavigationContainer>
                <NetworkErrorStack />
            </NavigationContainer>
        )
        }
        else{
            return (
                <Observer>
                    {() => (
                        <NavigationContainer>
                            {Store.authTokenVal == 0 ? <AuthStackNavigators /> : <BottomTabNavigators />}
                        </NavigationContainer>
                    )}
                </Observer>
            );
        }
  
}
