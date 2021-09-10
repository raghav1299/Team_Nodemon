import React, { createContext } from 'react';
import { Dimensions, ToastAndroid, PixelRatio } from 'react-native';

export const width = Dimensions.get("screen").width
export const height = Dimensions.get("screen").height


export const COLORS = {

    WHITE: "#ffffff",
    GREY: "#455a64",
    BLACK: "#414141",
    ORANGE: "#F45C2C",
    CART_ORANGE: "#F45C2C",
    CART_GREEN: "#54CA6F"

}
export const BASE_URL_WEB = "https://api.chetanpareek.tech"
export const BASE_URL_ML = "https://leap.swarnabha.tech"

export const showNotification = str => {
    if (Platform.OS == "android") {
        ToastAndroid.show(str, ToastAndroid.LONG);
    }
    if (Platform.OS == "ios") {
        Alert.alert(str);
    }
};