import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
import {HomeStackNavigators, CartStackScreens} from "../HomeNavigators/HomeStackNavigators";
import {COLORS} from "../../Constants/GlobalStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

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
        </Tab.Navigator>
    );
}
