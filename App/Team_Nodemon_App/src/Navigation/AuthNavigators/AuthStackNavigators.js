import * as React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Login from "../../Screens/AuthScreens/Login";
import {COLORS} from "../../Constants/GlobalStyles";
import NetworkError from "../../Screens/AuthScreens/NetworkError";


const Stack = createNativeStackNavigator();

export function AuthStackNavigators() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                options={{
                    headerTitle: "Login",
                    headerTintColor: COLORS.WHITE,
                    headerStyle: {
                        backgroundColor: COLORS.GREY,
                    },
                }}
                component={Login}
            />
        </Stack.Navigator>
    );
}
export function NetworkErrorStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="NetworkError"
                options={{headerShown: false}}
                component={NetworkError}
            />
        </Stack.Navigator>
    );
}