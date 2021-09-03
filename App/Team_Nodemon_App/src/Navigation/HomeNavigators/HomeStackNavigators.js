import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../../Screens/HomeScreens/HomeScreen"
const Stack = createNativeStackNavigator();

export function HomeStackNavigators() {
    return (

        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>

    );
}