import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, Image, Linking, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { BASE_URL_WEB, COLORS } from '../const/const';
import axios from "axios";
import store from '../store/store';
import LottieView from 'lottie-react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loader } from "../Components/Components";
import { storeData } from '../store/asyncStore';

export default Home = ({ navigation }) => {




    const [username, setUsername] = useState('');
    const [isLoading, setLoading] = useState(false);



    function getDetail() {
        if (username != '') {
            setLoading(true)
            axios.get(`${BASE_URL_WEB}/api/rider/get_details_using_username`, {
                params: {
                    "username": username
                }
            }).then((res) => {
                console.log("get user data username", res.data.data)
                let value = res.data.data
                storeData("userDetail", value)
                //console.log(store.fcmToken)
                axios.patch(`${BASE_URL_WEB}/api/rider/set_fcm_token?token=${store.fcmToken}&inc_id=${res.data.data.inc_id}`
                ).then((res) => {

                    navigation.navigate('orderScreen')
                    setUsername('')
                    setLoading(false)
                    //console.log(res.data)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                alert(err)
                console.log(err)
            })
        }
        else {
            alert("please enter username")
        }
    }


    return isLoading ? (
        <Loader />
    ) : (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
            <View style={{ flex: 1.5 }}>
                <LottieView source={require('../assets/lottie.json')} autoPlay loop />
            </View>
            <Text
                style={{
                    marginLeft: "10%",
                    fontSize: hp(2.8),
                    marginBottom: 10,
                    color: COLORS.ORANGE,
                    fontWeight: "bold",
                    marginTop: 50,
                }}
            >
                Enter You Username
            </Text>
            <TextInput
                style={styles.input}
                placeholder={'Username'}
                value={username}
                onChangeText={(input) => { setUsername(input) }} />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    getDetail()
                }}>
                <Text style={styles.TouchableText}>Login</Text></TouchableOpacity>
            {/* <TouchableOpacity
                style={styles.buttonregister}
                onPress={() => {
                    navigation.navigate('register')
                }}>
                <Text style={styles.TouchableTextRegister}>Register</Text></TouchableOpacity> */}
        </View>
    )
}
const styles = StyleSheet.create({
    button: {
        width: "80%",
        height: 46,
        borderRadius: 10,
        alignSelf: "center",
        marginVertical: "6%",
        backgroundColor: COLORS.CART_ORANGE
    },
    buttonregister: {
        width: "80%",
        height: 30,
        borderRadius: 10,
        alignSelf: "center",
        marginBottom: 30,
        marginTop: -15,
    },
    TouchableText: {
        alignSelf: "center",
        textAlignVertical: "center",
        flex: 1,
        fontFamily: "Inter-Medium",
        fontSize: 16,
        color: "#ffffff"
    },
    TouchableTextRegister: {
        alignSelf: "center",
        textAlignVertical: "center",
        flex: 1,
        fontFamily: "Inter-Medium",
        fontSize: 16,
        color: "black"
    },
    input: {
        paddingLeft: 15,
        alignSelf: 'center',
        width: "80%",
        height: 40,
        borderRadius: 7,
        borderWidth: 1
    }
})