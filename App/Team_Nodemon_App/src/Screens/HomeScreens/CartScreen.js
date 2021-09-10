import React, {useEffect, useRef, useState} from "react";
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    ScrollView,
    Pressable,
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
import {Loader} from "../../Components/Components";
import RazorpayCheckout from "react-native-razorpay";
import {API_KEY} from "../../Config/Config";
import LottieView from "lottie-react-native";
import {showNotification} from "../../Functions/AppFuntions";

function CartScreen({navigation}) {
    const LottieRef = useRef();
    const [cartData, setCartData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener(
            "focus",
            () => {
                console.log("cart", Store.cart);

                calculateOrderTotal();
            },
            []
        );

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    function calculateOrderTotal() {
        let cost = 0;
        Store.cart.forEach(data => {
            cost = cost + data.quantity * data.mrp;
        });
        Store.setTotalCartBill(cost);
        setLoading(false);
    }

    function removeItemfromCart(item) {
        console.log("remove called");
        runInAction(() => {
            const array = Store.cart;
            const index = array.findIndex(element => element.inc_id == item);

            array.splice(index, 1);
            setCartData([...array]);
            Store.setCart([...array]);
        });
        console.log("removed cart", Store.cart);
    }
    function UpdateValueComponent(params) {
        const {data, index} = params;
        //  console.log("data", data, index)
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
                <Pressable
                    onPress={() => {
                        const newItems = [...Store.cart];
                        let currentQty = newItems[index]["quantity"];
                        newItems[index]["quantity"] = currentQty - 1;
                        if (newItems[index]["quantity"] <= 0) {
                            removeItemfromCart(data.inc_id);
                            calculateOrderTotal();
                        } else {
                            calculateOrderTotal();
                            runInAction(() => {
                                Store.setCart([...newItems]);
                            });
                        }
                    }}
                >
                    <Ionicons
                        name={"remove"}
                        size={30}
                        color={COLORS.WHITE}
                        style={{
                            alignSelf: "center",
                            backgroundColor: COLORS.CART_ORANGE,
                        }}
                    />
                </Pressable>
                <View
                    style={{
                        backgroundColor: COLORS.WHITE,
                        alignSelf: "center",
                        borderColor: COLORS.CART_ORANGE,
                        width: wp(7),
                        height: "90%",
                    }}
                >
                    <Text style={{fontSize: 20, textAlign: "center"}}>{data.quantity}</Text>
                </View>
                <Pressable
                    onPress={() => {
                        const newItems = [...Store.cart];
                        let currentQty = newItems[index]["quantity"];
                        newItems[index]["quantity"] = currentQty + 1;
                        calculateOrderTotal();

                        runInAction(() => {
                            Store.setCart([...newItems]);
                        });
                    }}
                >
                    <Ionicons
                        name={"add"}
                        color={COLORS.WHITE}
                        size={30}
                        style={{
                            alignSelf: "center",
                            backgroundColor: COLORS.CART_ORANGE,
                        }}
                    />
                </Pressable>
            </View>
        );
    }

    function CartCard(params) {
        // console.log("cartcard", params)
        const {data, index} = params;
        //console.log(index)
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
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",

                                marginTop: wp(5.4),
                            }}
                        >
                            <Text style={{fontSize: hp(2.8)}} numberOfLines={1}>
                                {data.product_name}
                            </Text>
                            <Ionicons
                                name={"close-circle-outline"}
                                size={30}
                                style={{marginRight: wp(5)}}
                                onPress={() => {
                                    removeItemfromCart(data.inc_id);
                                    calculateOrderTotal();
                                }}
                            />
                        </View>
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
                                <UpdateValueComponent data={data} index={index} />
                            </View>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        height: 0.8,
                        marginTop: wp(5),
                        backgroundColor: COLORS.ORANGE,
                        width: wp(100),
                    }}
                />
            </View>
        );
    }
    function renderItem({item, index}) {
        return <CartCard data={item} index={index} />;
    }
    function Payment(params) {
        let amount = Store.totalCartBill * 100;

        console.log(amount);
        let options = {
            description: "Bill Payment",
            image: "https://cdn5.vectorstock.com/i/thumb-large/25/39/full-supermarket-shopping-cart-shop-trolley-vector-21682539.jpg",
            currency: "INR",
            key: API_KEY,
            amount: parseInt(amount),
            name: "Order Invoice",
            prefill: {
                email: "user@gmail.com",
                contact: "7418529631",
                name: "Razorpay Software",
            },
            theme: {color: COLORS.ORANGE},
        };
        RazorpayCheckout.open(options)
            .then(data => {
                Store.setShowPaymentStatus(true);

                console.log("THEN BLOCK", data);

                Store.setPaymentStatus(true);

                setTimeout(() => {
                    Store.setShowPaymentStatus(false);
                    showNotification("Payment Successfull");
                    Store.setCart([]);
                    navigation.navigate("Home", {screen: "HomeScreen"});
                }, 3100);
                // handle success
                // alert(`Success: ${data.razorpay_payment_id}`);
            })
            .catch(error => {
                Store.setShowPaymentStatus(true);

                // handle failure
                console.log("CATCH BLOCK", error);

                Store.setPaymentStatus(false);
                setTimeout(() => {
                    Store.setShowPaymentStatus(false);
                    showNotification("Payment Failed");
                }, 3100);
                // alert(`Error: ${error.code} | ${error.description}`);
            });
    }
    return (
        <Observer>
            {() =>
                isLoading ? (
                    <Loader />
                ) : Store.isLoadingCheckout ? (
                    <Loader />
                ) : Store.paymentShowStatus ? (
                    <View style={{flex: 1}}>
                        {Store.paymentStatus ? (
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: COLORS.WHITE,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    source={require("../../Images/payment_success.gif")}
                                    style={{height: wp(80), width: wp(80), resizeMode: "contain"}}
                                />
                            </View>
                        ) : !Store.paymentStatus ? (
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: COLORS.WHITE,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    source={require("../../Images/payment_failed.gif")}
                                    style={{height: wp(80), width: wp(80), resizeMode: "contain"}}
                                />
                            </View>
                        ) : (
                            <View style={{flex: 1, backgroundColor: "pink"}}></View>
                        )}
                    </View>
                ) : Store.totalCartBill == "" ? (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: wp(-5),
                        }}
                    >
                        <Image
                            source={require("../../Images/emptyCart.gif")}
                            style={{
                                height: wp(50),
                                width: wp(50),

                                resizeMode: "contain",
                            }}
                        />
                        <Text style={{fontSize: hp(4), marginTop: "2%"}}>
                            No items in the cart !
                        </Text>
                    </View>
                ) : (
                    <View style={styles.mainContainerStyle}>
                        <View style={{flex: 6}}>
                            <FlatList
                                data={Store.cart}
                                renderItem={renderItem}
                                keyExtractor={item => item.inc_id}
                            />
                        </View>
                        <View
                            style={{flex: 1, backgroundColor: "#fff5ed", justifyContent: "center"}}
                        >
                            <View
                                style={{
                                    alignItems: "center",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    paddingLeft: wp(5),
                                    // marginTop: wp(5),
                                }}
                            >
                                <Text style={{fontSize: hp(4)}} numberOfLines={1}>
                                    ₹ {Store.totalCartBill}
                                </Text>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: COLORS.CART_GREEN,
                                        marginLeft: "1%",
                                        marginRight: "5%",
                                        width: wp(65),
                                        marginTop: 2.4,
                                        padding: 10,
                                        justifyContent: "center",
                                        borderRadius: 5,
                                    }}
                                    activeOpacity={0.74}
                                    onPress={() => {
                                        Store.setLoadingCheckout(true);
                                        console.log("TOTAL COST", Store.totalCartBill);
                                        console.log("TOTAL CART", Store.cart);

                                        setTimeout(() => {
                                            Store.setLoadingCheckout(false);
                                            Payment();
                                        }, 2000);
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            fontSize: hp(2),
                                            color: COLORS.WHITE,
                                        }}
                                    >
                                        Proceed to Checkout
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            }
        </Observer>
    );
}
const styles = StyleSheet.create({
    mainContainerStyle: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
    card: {
        width: wp(100),
        paddingVertical: hp(1.2),
        flex: 1,
        marginVertical: hp(1),
        backgroundColor: COLORS.WHITE,
        alignSelf: "center",
    },
});
export default CartScreen;
