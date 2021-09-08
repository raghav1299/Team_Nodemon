import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Pressable,
    Button,
} from "react-native";
import {API_CALL} from "../../Functions/ApiFuntions";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {COLORS} from "../../Constants/GlobalStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import {Loader, LoaderV1} from "../../Components/Components";
import Store from "../../Store/Store";
import {showNotification} from "../../Functions/AppFuntions";
export default function HomeScreen({navigation}) {
    const [isLoading, setLoading] = useState(true);
    const [isLoadingList, setLoadingList] = useState(false);

    const [productsData, setProductsData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        initPageLoadEvents();
    }, []);

    async function initPageLoadEvents(params) {
        const productsData = await getAllProductsList();
        const categoryList = await getCategoriesList();

        if (productsData && categoryList) {
            setLoading(false);
        }
    }

    async function getAllProductsList(params) {
        let status = false;
        try {
            const data = await API_CALL(
                {
                    url: "/api/user/get_all_products",
                    method: "get",
                },
                {type: "WEB"}
            );

            setProductsData(data.data);
            status = true;
        } catch (error) {
            console.log(error);
        }
        return status;
    }
    async function getCategoriesList(params) {
        let status = false;
        try {
            const data = await API_CALL(
                {
                    url: "/api/user/get_all_tags",
                    method: "get",
                },
                {type: "WEB"}
            );

            status = true;
            setCategoriesData([{inc_id: "intial", tag: "All"}, ...data.data]);
        } catch (error) {
            console.log(error);
        }
        return status;
    }
    async function getProductsbyTag(tag) {
        setLoadingList(true);
        try {
            const data = await API_CALL(
                {
                    url: `/api/products/tags/${tag}`,
                    method: "get",
                },
                {type: "ML"}
            );
            console.log(data.data);
            setProductsData(data.data);
        } catch (error) {
            console.log(error);
        }
        setLoadingList(false);
    }
    function addItemtoCart(item) {
        setCartData(oldArray => [...oldArray, item]);
        Store.setCart([...Store.cart, item]);
    }
    function removeItemfromCart(item) {
        const array = cartData;
        const index = array.findIndex(element => element.inc_id == item);

        array.splice(index, 1);

        setCartData([...array]);
        Store.setCart([...array]);
    }
    function addToCartButtonColor(item_id) {
        let status = false;

        cartData.map(item => {
            if (item.inc_id == item_id) {
                status = true;
            }
        });
        return status;
    }
    function productStatusCheck(id) {
        let status = false;

        for (var i = 0; i < cartData.length; i++) {
            if (cartData[i].inc_id == id) {
                status = true;
                break;
            }
        }

        return status;
    }
    function renderProductsFunc({item}) {
        return (
            <View style={{flex: 1, marginTop: 0, paddingBottom: 10}}>
                <Pressable
                    style={styles.productCard}
                    onPress={() => {
                        navigation.navigate("ProductInfoScreen", {
                            item,
                            removeItemfromCart,
                            addToCartButtonColor,
                            productStatusCheck,
                            addItemtoCart,
                        });
                    }}
                >
                    <View style={{marginTop: "5%"}}>
                        <Image
                            source={{uri: item.image_address}}
                            style={{
                                width: wp(30),
                                height: wp(40),
                                alignSelf: "center",
                                resizeMode: "contain",
                                borderColor: COLORS.GREY,

                                padding: 10,
                            }}
                        />
                    </View>
                    <View>
                        <Text style={{fontSize: hp(2.4)}} numberOfLines={1}>
                            {item.product_name}
                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: "2%",
                                marginBottom: "2%",
                            }}
                        >
                            <Text style={{fontSize: hp(3.2)}}>₹ {item.mrp}</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: addToCartButtonColor(item.inc_id)
                                    ? COLORS.CART_ORANGE
                                    : COLORS.CART_GREEN,
                                marginLeft: "10%",
                                marginTop: "4%",
                                padding: 10,
                                justifyContent: "center",
                                borderRadius: 5,
                            }}
                            activeOpacity={0.74}
                            onPress={() => {
                                const data = productStatusCheck(item.inc_id);

                                if (!data) {
                                    addItemtoCart(item);
                                } else {
                                    removeItemfromCart(item.inc_id);
                                }
                            }}
                        >
                            <Text style={{textAlign: "center", color: COLORS.WHITE}}>
                                {addToCartButtonColor(item.inc_id) ? "Remove" : "Add to Cart"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </View>
        );
    }
    function renderCategoriesFunc({item}) {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: selectedCategory == item.tag ? COLORS.ORANGE : COLORS.GREY,
                    marginHorizontal: 10,
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    borderRadius: 50,
                }}
                onPress={async () => {
                    setSelectedCategory(item.tag);
                    let tag = item.tag.split(" ").join("");
                    if (selectedCategory !== item.tag) {
                        if (tag == "All") {
                            setLoadingList(true);
                            const productsData = await getAllProductsList();
                            if (productsData) {
                                setLoadingList(false);
                            }
                            setLoadingList(false);
                        } else {
                            getProductsbyTag(tag);
                        }
                    }
                }}
                activeOpacity={0.75}
            >
                <Text
                    style={{
                        color: COLORS.WHITE,
                    }}
                >
                    {item.tag}
                </Text>
            </TouchableOpacity>
        );
    }
    function SearchBar(params) {
        return (
            <View
                style={{
                    height: hp(9),
                    width: wp(100),
                    backgroundColor: COLORS.GREY,
                    justifyContent: "center",
                }}
            >
                <View
                    style={{
                        height: hp(5.4),
                        backgroundColor: COLORS.WHITE,
                        alignSelf: "flex-start",
                        alignItems: "center",
                        borderRadius: 10,
                        flexDirection: "row",
                        width: wp(80),
                        marginLeft: "5%",
                    }}
                >
                    <TextInput
                        style={{
                            width: wp(70),
                            paddingLeft: "5%",
                            fontSize: hp(2),
                        }}
                        placeholder={"Search...."}
                    />
                    <MaterialIcons
                        name={"search"}
                        size={30}
                        // style={{ marginRight: "5%" }}
                    />
                    <Ionicons
                        name={"md-cart-outline"}
                        size={30}
                        style={{marginLeft: "8%", color: COLORS.WHITE}}
                    />
                </View>
            </View>
        );
    }

    return isLoading ? (
        <Loader />
    ) : (
        <>
            <SearchBar />
            <View style={styles.mainContainerStyle}>
                <View>
                    <View style={{flexDirection: "row", marginVertical: "2%"}}>
                        <FlatList
                            data={categoriesData}
                            horizontal={true}
                            renderItem={renderCategoriesFunc}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={item => item.inc_id}
                        />
                    </View>
                </View>
                {isLoadingList ? (
                    <Loader />
                ) : (
                    <View style={{marginTop: "2%"}}>
                        <Button
                            title="press"
                            onPress={() => {
                                console.log(cartData);
                            }}
                        />
                        <FlatList
                            data={productsData}
                            numColumns={2}
                            contentContainerStyle={{paddingBottom: "20%"}}
                            columnWrapperStyle={{flexWrap: "wrap", flex: 1}}
                            renderItem={renderProductsFunc}
                            keyExtractor={item => item.inc_id}
                        />
                        {/* <FlatList
                                data={productsData}
                                renderItem={renderProductsFunc}
                                keyExtractor={(item) => item.inc_id}
                            /> */}
                    </View>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    mainContainerStyle: {
        flex: 1,
        paddingTop: hp(1),
    },
    productCard: {
        backgroundColor: "#ffffff",
        width: wp(47.5),
        height: "auto",
        elevation: 4,
        borderRadius: 8,
        padding: 20,
        paddingTop: 0,
        alignSelf: "center",
        marginVertical: "2%",
    },
});
