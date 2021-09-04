
import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../Constants/GlobalStyles';




export function Loader(params) {
    return (
        <View style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size={"large"} color={COLORS.GREY} />
        </View>
    )
}

