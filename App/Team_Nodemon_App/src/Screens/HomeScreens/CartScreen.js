import React, {useEffect, useState} from "react";
import {View, StyleSheet, Image, Text, Dimensions, ScrollView, Button} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {COLORS} from "../../Constants/GlobalStyles";
import Store from "../../Store/Store";

function CartScreen({route}) {
    return (
        <View>
            <Button
                title="press"
                onPress={() => {
                    console.log("CART DATA", Store.cart);
                }}
            />
            <Text>CART</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    mainContainerStyle: {
        flex: 1,
    },
    card: {
        width: wp(96),
        paddingVertical: hp(2),
        elevation: 6,
        backgroundColor: COLORS.WHITE,
        borderRadius: 10,
        alignSelf: "center",
    },
});
export default CartScreen;
