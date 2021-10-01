import * as React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Account from "../../Screens/AccountScreens/Account";

import {COLORS} from "../../Constants/GlobalStyles";
const Stack = createNativeStackNavigator();

export function AccountStackNavigators() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Account"
                options={{
                    headerTitle: "My Account",
                    headerTintColor: COLORS.WHITE,
                    headerStyle: {
                        backgroundColor: COLORS.GREY,
                    },
                }}
                component={Account}
            />
        </Stack.Navigator>
    );
}
