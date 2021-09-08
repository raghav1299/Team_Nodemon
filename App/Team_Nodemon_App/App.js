import * as React from "react";
import {View, Text} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {HomeStackNavigators} from "./src/Navigation/HomeNavigators/HomeStackNavigators";
import BottomTabNavigators from "./src/Navigation/BottomTabNavigators/BottomTabNavigators";

export default function App() {
    return (
        <NavigationContainer>
            <BottomTabNavigators />
        </NavigationContainer>
    );
}
