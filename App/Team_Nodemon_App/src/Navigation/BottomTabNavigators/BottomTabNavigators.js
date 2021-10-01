import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {HomeStackNavigators, CartStackScreens} from "../HomeNavigators/HomeStackNavigators";

import {COLORS} from "../../Constants/GlobalStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    paddingVertical: 4,
                    backgroundColor: COLORS.GREY,
                },
                tabBarActiveTintColor: COLORS.WHITE,
                tabBarInactiveTintColor: COLORS.BLACK,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
            }}
            backBehavior={"initialRoute"}
        >
            <Tab.Screen
                name="Home"
                options={{headerShown: false}}
                component={HomeStackNavigators}
                options={{
                    tabBarIcon: ({focused, tintColor}) =>
                        focused ? (
                            <MaterialIcons name="home" color={COLORS.WHITE} size={30} />
                        ) : (
                            <MaterialIcons name="home" color="#a6a6a6" size={30} />
                        ),

                    tabBarLabel: "Home",
                    tabBarLabelStyle: {marginTop: -5},
                }}
            />
            <Tab.Screen
                name="CartTab"
                options={{
                    headerTitle: "Shopping Cart",
                    headerStyle: {
                        backgroundColor: COLORS.GREY,
                    },
                    tabBarIcon: ({focused, tintColor}) =>
                        focused ? (
                            <MaterialIcons name="shopping-cart" color={COLORS.WHITE} size={28} />
                        ) : (
                            <MaterialIcons name="shopping-cart" color="#a6a6a6" size={28} />
                        ),
                }}
                component={CartStackScreens}
            />
            {/* <Tab.Screen
                name="AccountTab"
                options={{
                    headerTitle: "Account",
                    headerStyle: {
                        backgroundColor: COLORS.GREY,
                    },
                    tabBarIcon: ({focused, tintColor}) =>
                        focused ? (
                            <MaterialIcons name="account-circle" color={COLORS.WHITE} size={30} />
                        ) : (
                            <MaterialIcons name="account-circle" color="#a6a6a6" size={30} />
                        ),
                }}
                component={AccountStackNavigators}
            /> */}
        </Tab.Navigator>
    );
}
