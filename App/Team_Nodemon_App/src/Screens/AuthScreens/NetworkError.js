import React, {useState} from "react";
import {View, StyleSheet, Text, Image, Dimensions} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";


function NetworkError() {
    return (
        <View style={{flex: 1}}>
            <Image
                source={require("../../Images/No_connection.png")}
                style={{
                    height: hp(54),
                    width: wp(90),
                    marginTop: "18%",
                    resizeMode: "contain",
                    alignSelf: "center",
                }}
            />
            <Text
                style={{
                    textAlign: "center",
                    fontFamily: "Roboto_Bold",
                    color: "#797979",
                    fontSize: hp(8),
                }}
            >
                Oops!
            </Text>
            <Text
                style={{
                    textAlign: "center",
                    fontFamily: "Roboto_Regular",
                    color: "#797979",
                    fontSize: hp(2.8),
                    paddingHorizontal: "2%",
                }}
            >
                No Internet Connection found
            </Text>
            <Text
                style={{
                    textAlign: "center",
                    fontFamily: "Roboto_Regular",
                    color: "#797979",
                    fontSize: hp(2.8),
                    paddingHorizontal: "2%",
                }}
            >
                Check your connection
            </Text>
        </View>
    );
}
export default NetworkError;