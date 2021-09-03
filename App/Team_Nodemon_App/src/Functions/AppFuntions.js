import { Alert, Dimensions, PixelRatio, Platform, ToastAndroid } from 'react-native';


export const showNotification = (str) => {
    if (Platform.OS == "android") {
        ToastAndroid.show(str, ToastAndroid.LONG);
    }
    if (Platform.OS == "ios") {
        Alert.alert(str);
    }
}
