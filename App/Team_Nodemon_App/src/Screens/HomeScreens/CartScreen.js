import React, {useEffect, useState} from "react";
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Button,
    FlatList,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {COLORS} from "../../Constants/GlobalStyles";
import Store from "../../Store/Store";
import {runInAction} from "mobx";
import {Observer} from "mobx-react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

function CartScreen({navigation}) {
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener(
            "focus",
            () => {
                console.log("cart", Store.cart);
            },
            []
        );

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    function UpdateValueComponent(params) {
        return (
            <View
                style={{
                    flexDirection: "row",
                    backgroundColor: COLORS.CART_ORANGE,
                    width: wp(21.5),
                    alignItems: "center",
                    marginLeft: "5%",
                }}
            >
                <TouchableOpacity>
                    <Ionicons
                        name={"remove"}
                        size={30}
                        color={COLORS.WHITE}
                        style={{
                            alignSelf: "center",
                            backgroundColor: COLORS.CART_ORANGE,
                        }}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        backgroundColor: COLORS.WHITE,
                        alignSelf: "center",
                        borderColor: COLORS.CART_ORANGE,
                        width: wp(7),
                        height: "90%",
                    }}
                >
                    <Text style={{fontSize: 20, textAlign: "center"}}>0</Text>
                </View>
                <TouchableOpacity>
                    <Ionicons
                        name={"add"}
                        color={COLORS.WHITE}
                        size={30}
                        style={{
                            alignSelf: "center",
                            backgroundColor: COLORS.CART_ORANGE,
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
    function CartCard(params) {
        const {data} = params;
        return (
            <View style={styles.card}>
                <View style={{flexDirection: "row", flex: 1}}>
                    <Image
                        source={{uri: data.image_address}}
                        style={{
                            width: wp(30),
                            height: wp(40),
                            alignSelf: "flex-start",
                            marginLeft: wp(5),
                            resizeMode: "contain",
                            borderColor: COLORS.GREY,
                            padding: 10,
                        }}
                    />
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "space-between",
                            marginLeft: 10,
                        }}
                    >
                        <Text style={{fontSize: hp(2.8), marginTop: wp(4)}} numberOfLines={1}>
                            {data.product_name}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: hp(3.6),

                                    marginBottom: wp(4),
                                }}
                                numberOfLines={1}
                            >
                                ₹ {data.mrp}
                            </Text>
                            <View style={{marginBottom: "6.5%", marginRight: wp(5)}}>
                                <UpdateValueComponent />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    function renderItem({item}) {
        return <CartCard data={item} />;
    }
    return (
        <Observer>
            {() => (
                <View style={{flex: 1}}>
                    {/* <Button
                        title="press"
                        onPress={() => {
                            console.log("CART DATA", Store.cart);
                        }}
                    /> */}
                    <FlatList
                        data={Store.cart}
                        renderItem={renderItem}
                        keyExtractor={item => item.inc_id}
                    />
                    <View>
                        <Text>TOTAL</Text>
                        <Text>300</Text>
                    </View>
                </View>
            )}
        </Observer>
    );
}
const styles = StyleSheet.create({
    mainContainerStyle: {
        flex: 1,
    },
    card: {
        width: wp(96),
        paddingVertical: hp(1.2),
        elevation: 6,
        flex: 1,
        marginVertical: hp(1),
        backgroundColor: COLORS.WHITE,
        borderRadius: 10,
        alignSelf: "center",
    },
});
export default CartScreen;
