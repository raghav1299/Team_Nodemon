import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {COLORS} from "../Constants/GlobalStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {showNotification} from "../Functions/AppFuntions";
import Store from "../Store/Store";

export function Loader(params) {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <ActivityIndicator size={"large"} color={COLORS.GREY} />
        </View>
    );
}

export function Input(props) {
    const {
        Title,
        placeholder,
        placeholderTextColor,
        onChangeText,
        keyboardType,
        value,
        TitleMargin,
        secureTextEntry,
        defaultValue,
    } = props;
    return (
        <View {...props}>
            <Text style={{fontSize: hp(1.8), fontFamily: "Roboto_Regular", color: COLORS.BLACK}}>
                {Title}
            </Text>
            <TextInput
                style={{
                    width: wp(90),
                    borderBottomWidth: hp(0.06),
                    marginTop: TitleMargin ? TitleMargin : -hp(1.5),
                    paddingBottom: -8,
                    paddingLeft: 0,
                    borderBottomColor: COLORS.GREY,
                }}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                defaultValue={defaultValue}
                value={value}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
}
export function SearchBar(props) {
    const {
        placeholder,
        placeholderTextColor,
        onChangeText,
        keyboardType,
        value,
        onSubmitEditing,
        defaultValue,
    } = props;
    return (
        <View
            style={{
                height: hp(9),
                width: wp(100),
                backgroundColor: COLORS.GREY,
                justifyContent: "center",
            }}
        >
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <View
                    style={{
                        height: hp(5.4),
                        backgroundColor: COLORS.WHITE,
                        alignSelf: "flex-start",
                        alignItems: "center",
                        borderRadius: 10,
                        flexDirection: "row",
                        width: wp(80),
                        marginLeft: "5%",
                    }}
                >
                    <TextInput
                        style={{
                            width: wp(70),
                            paddingLeft: "5%",
                            fontSize: hp(2),
                        }}
                        placeholder={placeholder}
                        onChangeText={onChangeText}
                        onSubmitEditing={onSubmitEditing}
                        defaultValue={defaultValue}
                        value={value}
                        returnKeyType={"search"}
                    />
                    <MaterialIcons
                        name={"search"}
                        size={30}
                        onPress={() => {
                            onSubmitEditing();
                        }}
                        // style={{ marginRight: "5%" }}
                    />
                </View>
                <MaterialIcons
                    name={"logout"}
                    size={32}
                    style={{marginLeft: "4%", color: COLORS.WHITE}}
                    onPress={() => {
                        AsyncStorage.clear();
                        showNotification("Logged Out Successfully");
                        Store.setAuthTokenVal(0);
                    }}
                />
            </View>
        </View>
    );
}
