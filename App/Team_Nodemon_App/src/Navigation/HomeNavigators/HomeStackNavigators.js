import * as React from "react";
import {View, Text} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../../Screens/HomeScreens/HomeScreen";
import ProductInfoScreen from "../../Screens/HomeScreens/ProductInfoScreen";
import CartScreen from "../../Screens/HomeScreens/CartScreen";

import {COLORS} from "../../Constants/GlobalStyles";
const Stack = createNativeStackNavigator();

export function HomeStackNavigators() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" options={{headerShown: false}} component={HomeScreen} />
            <Stack.Screen
                name="ProductInfoScreen"
                options={{
                    headerTitle: "Product Info",
                    headerStyle: {
                        backgroundColor: COLORS.GREY,
                    },
                }}
                component={ProductInfoScreen}
            />
        </Stack.Navigator>
    );
}
export function CartStackScreens() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
    );
}
