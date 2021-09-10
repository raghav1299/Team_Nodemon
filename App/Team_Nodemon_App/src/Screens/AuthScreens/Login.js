import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity} from "react-native";
import LottieView from "lottie-react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {COLORS} from "../../Constants/GlobalStyles";
import {showNotification, storeData} from "../../Functions/AppFuntions";
import Store from "../../Store/Store";
import {API_CALL} from "../../Functions/ApiFuntions";
import {Loader} from "../../Components/Components";
export default function Login(params) {
    const [username, setUsername] = useState("");
    const [isLoading, setLoading] = useState(false);

    async function Login(params) {
        if (username.trim() == "") {
            showNotification("Enter Username");
            return;
        }
        if (username) {
            setLoading(true);
            try {
                const data = await API_CALL(
                    {
                        url: `/api/user/get_user_details_by_username?username=${username}`,
                        method: "get",
                    },
                    {type: "WEB"}
                );
                console.log("data.data", data);
                if (data.data) {
                    setLoading(false);
                    let authState = "true";
                    showNotification("Logged In Successfully");

                    storeData("authState", authState);
                    storeData("username", data.data.username);

                    let inc_id = data.data.inc_id.toString();
                    storeData("userId", inc_id);

                    Store.setUserIdVal(inc_id);
                    Store.setUsernameVal(data.data.username);
                    Store.setAuthTokenVal(1);
                } else {
                    setLoading(false);
                    showNotification("User Not Found");
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    }

    return isLoading ? (
        <Loader />
    ) : (
        <View style={{flex: 1}}>
            <View style={{flex: 1.5}}>
                <LottieView
                    source={require("../../Images/71390-shopping-cart-loader.json")}
                    autoPlay
                    loop
                />
            </View>

            <Text
                style={{
                    marginLeft: "4%",
                    fontSize: hp(2.8),
                    color: COLORS.ORANGE,
                    fontWeight: "bold",
                    marginTop: 50,
                }}
            >
                Enter You Username
            </Text>
            <TextInput
                style={{
                    width: wp(90),
                    borderColor: COLORS.ORANGE,
                    borderWidth: 1,
                    marginTop: 20,
                    alignSelf: "center",
                    borderRadius: 5,
                    paddingLeft: "2.8%",
                }}
                placeholder={"Enter Username"}
                onChangeText={txt => {
                    setUsername(txt);
                }}
            />
            <View style={{flex: 0.5, justifyContent: "space-evenly"}}>
                <TouchableOpacity
                    style={{
                        width: wp(80),
                        alignSelf: "center",
                        justifyContent: "center",

                        backgroundColor: COLORS.ORANGE,
                    }}
                    onPress={() => {
                        Login();
                    }}
                >
                    <Text
                        style={{
                            padding: 10,
                            textAlign: "center",
                            fontSize: hp(2),
                            color: COLORS.WHITE,
                        }}
                    >
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
