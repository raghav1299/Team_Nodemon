import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {View, Text, Button} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {COLORS} from "../../Constants/GlobalStyles";

import Store from "../../Store/Store";
export default function Account(params) {
    return (
        <View style={{flex: 1, justifyContent: "flex-end"}}>
            {/* <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.GREY,
                }}
            >
                <Text style={{fontSize: hp(2)}}>My Past Orders</Text>
                <MaterialIcons name={"navigate-next"} size={30} />
            </View>
            <View style={{marginTop: 250}}> */}
            <Button
                title={"Sign Out"}
                onPress={() => {
                    AsyncStorage.clear();
                    Store.setAuthTokenVal(0);
                }}
            />
            {/* </View> */}
        </View>
    );
}
