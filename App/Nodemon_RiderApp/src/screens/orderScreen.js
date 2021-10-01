import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, RefreshControl, Image, Linking, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { BASE_URL_WEB, COLORS, height, width } from '../const/const';
import axios from "axios";
import store from '../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, storeData } from '../store/asyncStore';
import { Loader } from "../Components/Components";




export default orderScreen = ({ navigation }) => {

    const [orders, setOrders] = useState([]);
    const [username, setUsername] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [currentlat, setCurrentlat] = useState();
    const [currentlon, setCurrentlon] = useState();
    const [refreshing, setRefreshing] = useState(false)

    function getOrder(userName) {
        axios.get(`${BASE_URL_WEB}/api/rider/get_active_orders?username=${userName}&active_orders=1`)
            .then((res) => {
                setOrders(res.data.data)
                console.log("get active", res.data)
                setLoading(false)
                setRefreshing(false)
            }).catch((err) => {
                console.log("err active", err)
            }).finally(() => {
                setLoading(false)
                setRefreshing(false)
            })
    }
    async function getDetails() {
        const userData = await getData("userDetail");
        console.log(userData.curr_lat, userData.curr_long)
        setCurrentlat(userData.curr_lat)
        setCurrentlon(userData.curr_long)
        console.log("user dataaaaaa", userData.username)
        setUsername(userData.username)
        getOrder(userData.username)
    }

    useEffect(() => {
        getDetails()
    }, []);


    const lata = '28.609436'
    const lona = '77.211802'
    const latt = '28.592254'
    const lont = '77.234342'
    const latd = '28.60219'
    const lond = '77.229121'


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log(username)
        getDetails()
        getOrder(username)

    }, [])

    function markDelivered(data) {
        setLoading(true)
        axios.patch(`${BASE_URL_WEB}/api/rider/set_order_delivered?username=${username}&inc_id=${data}`).then((res) => {
            console.log(res.data)
            getOrder(username)
        }).catch((err) => {
            alert(err)
            console.log(err)
        })
    }


    const renderItem = ({ item }) => (
        <View style={{
            flex: 1, backgroundColor: '#ffffff', marginTop: 10, borderRadius: 8,
            height: height / 3.5, width: width - 20, alignSelf: 'center', justifyContent: 'center'
        }}>
            <Text style={{
                marginLeft: 10, fontFamily: "Montserrat",
                fontStyle: "normal",
                fontWeight: "bold"
            }}>Pick Up:{item.pickup_address}</Text>
            <Text style={{
                marginLeft: 10, fontFamily: "Montserrat",
                fontStyle: "normal",
                fontWeight: "bold"
            }}>Delivery:{item.drop_address} </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    Linking.openURL
                        (`https://www.google.com/maps/dir/?api=1&origin=${currentlat},${currentlon}&waypoints=${item.pickup_lat},${item.pickup_long}&destination=${item.dest_lat},${item.dest_long}`)
                }}>
                <Text style={styles.TouchableText}>Open Google Maps</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: '#54CA6F' }]}
                onPress={() => {
                    markDelivered(item.inc_id)
                }}>
                <Text style={styles.TouchableText}>Mark order as delivered</Text></TouchableOpacity>
        </View>

    );

    return isLoading ? (
        <Loader />
    ) : (<View style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
        <FlatList
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            data={orders}
            renderItem={renderItem}
        />
        {/* <TouchableOpacity
            style={styles.button}
            onPress={() => {
                Linking.openURL
                    (`https://www.google.com/maps/dir/?api=1&origin=${lata},${lona}&waypoints=${latt},${lont}&destination=${latd},${lond}`)
            }}>
            <Text style={styles.TouchableText}>Login</Text></TouchableOpacity> */}

    </View>
    )
}
const styles = StyleSheet.create({
    button: {
        width: "80%",
        height: 46,
        borderRadius: 10,
        alignSelf: "center",
        marginVertical: "1.5%",
        backgroundColor: COLORS.CART_ORANGE
    },
    TouchableText: {
        alignSelf: "center",
        textAlignVertical: "center",
        flex: 1,
        fontFamily: "Inter-Medium",
        fontSize: 16,
        color: "#ffffff"
    },
    input: {
        alignSelf: 'center',
        width: "80%",
        height: 40,
        borderRadius: 7,
        borderWidth: 1
    }
})