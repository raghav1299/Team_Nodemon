import React, {useState, useEffect} from "react";
import {NavigationContainer} from "@react-navigation/native";
import BottomTabNavigators from "./src/Navigation/BottomTabNavigators/BottomTabNavigators";
import {AuthStackNavigators} from "./src/Navigation/AuthNavigators/AuthStackNavigators";
import {Observer} from "mobx-react";
import Store from "./src/Store/Store";
import messaging from "@react-native-firebase/messaging";
import {getData} from "./src/Functions/AppFuntions";
import {Loader} from "./src/Components/Components";

export default function App() {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        messaging()
            .getToken()
            .then(token => {
                Store.setFcmToken(token);
                console.log("FCM Token", token);
            });
    }, []);

    useEffect(async () => {
        const authState = await getData("authState");
        const userName = await getData("username");

        console.log("AuthToken Value", authState);
        if (authState && userName) {
            Store.setAuthTokenVal(1);
            Store.setUsernameVal(userName);
            setLoading(false);
        }
        setLoading(false);
    });
    return isLoading ? (
        <Loader />
    ) : (
        <Observer>
            {() => (
                <NavigationContainer>
                    {Store.authTokenVal == 0 ? <AuthStackNavigators /> : <BottomTabNavigators />}
                </NavigationContainer>
            )}
        </Observer>
    );
}
