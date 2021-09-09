import React, {useEffect, useState} from "react";
import {
    View,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    LogBox,
    ScrollView,
    FlatList,
    TouchableOpacity,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {Loader} from "../../Components/Components";
import {COLORS} from "../../Constants/GlobalStyles";
import {API_CALL} from "../../Functions/ApiFuntions";
import {Rating, AirbnbRating} from "react-native-ratings";
import Store from "../../Store/Store";
import {runInAction} from "mobx";
import {Observer} from "mobx-react";

function ProductInfoScreen({route, navigation}) {
    const {item} = route.params;

    const [isLoading, setLoading] = useState(true);
    const [productsData, setProductsData] = useState([]);
    const [recommendedProductsData, setRecommendedProductsData] = useState([]);
    const [alsoBoughtProductsData, setAlsoBoughtProductsData] = useState([]);

    useEffect(() => {
        LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);
        setProductsData(item);
        initPageLoadEvents();
    }, []);

    async function initPageLoadEvents() {
        getRecommendedProducts(item.product_name);
        usersAlsoBoughtProducts(item.product_name);
    }
    async function getRecommendedProducts(name) {
        try {
            const data = await API_CALL(
                {
                    url: `/api/products/recommend`,
                    method: "post",
                    data: {
                        product_names: [name],
                    },
                },
                {type: "ML"}
            );

            if (data.data) {
                let quant = data.data;

                quant.forEach(item => {
                    item.quantity = 1;
                });
                setRecommendedProductsData(data.data);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }
    async function usersAlsoBoughtProducts(name) {
        try {
            const data = await API_CALL(
                {
                    url: `/api/products/alsobought`,
                    method: "post",
                    data: {
                        product_names: [name],
                    },
                },
                {type: "ML"}
            );
            if (data.data) {
                let quant = data.data;

                quant.forEach(item => {
                    item.quantity = 1;
                });
                setAlsoBoughtProductsData(data.data);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    function addItemtoCart(item) {
        runInAction(() => {
            Store.setCart([...Store.cart, item]);
        });
    }
    function removeItemfromCart(item) {
        runInAction(() => {
            const array = Store.cart;
            const index = array.findIndex(element => element.inc_id == item);

            array.splice(index, 1);

            Store.setCart([...array]);
        });
    }
    function addToCartButtonColor(item_id) {
        let status = false;

        Store.cart.map(item => {
            if (item.inc_id == item_id) {
                status = true;
            }
        });
        return status;
    }
    function productStatusCheck(id) {
        let status = false;

        for (var i = 0; i < Store.cart.length; i++) {
            if (Store.cart[i].inc_id == id) {
                status = true;
                break;
            }
        }

        return status;
    }
    function RecommendationCard(props) {
        const {data} = props;
        return (
            <TouchableOpacity
                style={styles.recommendedProductCard}
                onPress={() => {
                    setLoading(true);
                    setProductsData(data);
                    getRecommendedProducts(data.product_name);
                    usersAlsoBoughtProducts(data.product_name);
                    // setLoading(false);
                }}
            >
                <Image
                    source={{uri: data.image_address}}
                    style={{
                        width: wp(30),
                        height: wp(40),
                        alignSelf: "center",
                        resizeMode: "contain",
                        borderColor: COLORS.GREY,

                        padding: 10,
                    }}
                />
                <View style={{marginLeft: "10%"}}>
                    <Text style={{fontSize: hp(2)}} numberOfLines={1}>
                        {data.product_name}
                    </Text>
                    <Text style={{fontSize: hp(2.8)}} numberOfLines={1}>
                        ₹ {data.mrp}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    function renderItemFunc({item}) {
        return <RecommendationCard data={item} />;
    }

    return isLoading ? (
        <Loader />
    ) : (
        <Observer>
            {() => (
                <ScrollView style={styles.mainContainerStyle}>
                    <View style={styles.card}>
                        <Image
                            source={{uri: productsData.image_address}}
                            style={{
                                width: wp(80),
                                height: hp(25),
                                marginTop: hp(-1),
                                marginBottom: hp(2),
                                resizeMode: "contain",
                                alignSelf: "center",
                            }}
                        />
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: wp(100),
                            }}
                        >
                            <View style={{paddingHorizontal: wp(5)}}>
                                <Text style={{fontSize: hp(3.4)}}>{productsData.product_name}</Text>
                                <Rating
                                    ratingCount={5}
                                    imageSize={20}
                                    readonly
                                    startingValue={productsData.ratings}
                                    ratingCount={5}
                                    style={{width: 100, marginLeft: -2}}
                                />
                            </View>
                            <View>
                                <Text
                                    style={{
                                        fontSize: hp(3.4),
                                        marginRight: wp(8),
                                    }}
                                >
                                    ₹ {productsData.mrp}
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={{
                                backgroundColor: addToCartButtonColor(productsData.inc_id)
                                    ? COLORS.CART_ORANGE
                                    : COLORS.CART_GREEN,
                                width: wp(90),
                                alignSelf: "center",
                                marginTop: "4%",
                                padding: 10,
                                justifyContent: "center",
                                borderRadius: 5,
                            }}
                            activeOpacity={0.74}
                            onPress={() => {
                                const data = productStatusCheck(productsData.inc_id);
                                if (!data) {
                                    addItemtoCart(productsData);
                                } else {
                                    removeItemfromCart(productsData.inc_id);
                                }
                            }}
                        >
                            <Text style={{textAlign: "center", color: COLORS.WHITE}}>
                                {addToCartButtonColor(productsData.inc_id)
                                    ? "Remove"
                                    : "Add to Cart"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {recommendedProductsData.length > 0 ? (
                        <View>
                            <Text
                                style={{
                                    marginLeft: wp(5),
                                    fontSize: hp(4),
                                    color: COLORS.ORANGE,
                                    marginTop: "-2%",
                                }}
                            >
                                Similar Products
                            </Text>
                            <FlatList
                                horizontal={true}
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                // contentContainerStyle={{backgroundColor: "red"}}
                                data={recommendedProductsData}
                                renderItem={renderItemFunc}
                                keyExtractor={item => item.inc_id}
                            />
                        </View>
                    ) : null}
                    {alsoBoughtProductsData.length > 0 ? (
                        <View>
                            <Text
                                style={{
                                    marginLeft: wp(5),
                                    fontSize: hp(4),
                                    color: COLORS.ORANGE,
                                    marginTop: "-2%",
                                }}
                            >
                                Users also bought
                            </Text>
                            <FlatList
                                horizontal={true}
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{paddingBottom: "5%"}}
                                data={alsoBoughtProductsData}
                                renderItem={renderItemFunc}
                                keyExtractor={item => item.inc_id}
                            />
                        </View>
                    ) : null}
                </ScrollView>
            )}
        </Observer>
    );
}
const styles = StyleSheet.create({
    mainContainerStyle: {
        flex: 1,
        paddingTop: hp(1),
        backgroundColor: COLORS.WHITE,
    },
    recommendedProductCard: {
        width: wp(40),
        paddingVertical: hp(2),
        marginHorizontal: wp(5),
        // marginHorizontal: wp(25),
        elevation: 6,
        backgroundColor: COLORS.WHITE,
        borderRadius: 10,
        alignSelf: "center",
        marginVertical: 10,
        borderWidth: 0.8,
        borderColor: COLORS.ORANGE,
    },
    card: {
        paddingVertical: hp(2),

        backgroundColor: COLORS.WHITE,
        borderRadius: 10,
        alignSelf: "center",
        marginVertical: 10,
    },
});
export default ProductInfoScreen;
