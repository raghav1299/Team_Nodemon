import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { API_CALL } from '../../Functions/ApiFuntions';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../Constants/GlobalStyles';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from "react-native-vector-icons/Ionicons"



import { Loader, LoaderV1 } from '../../Components/Components';
export default function HomeScreen({ navigation }) {

    const [isLoading, setLoading] = useState(true)
    const [isLoadingList, setLoadingList] = useState(false)

    const [productsData, setProductsData] = useState([])
    const [categoriesData, setCategoriesData] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("All")


    useEffect(() => {
        initPageLoadEvents();
    }, [])

    async function initPageLoadEvents(params) {
        const productsData = await getAllProductsList();
        const categoryList = await getCategoriesList();

        if (productsData && categoryList) {
            setLoading(false)
        }
    }

    async function getAllProductsList(params) {
        let status = false
        try {
            const data = await API_CALL({
                url: "/api/get_all_products",
                method: 'get'

            }, { type: "WEB" })
            // console.log(data)
            setProductsData(data.data)
            status = true;
        } catch (error) {
            console.log(error)
        }
        return status;
    }
    async function getCategoriesList(params) {
        let status = false
        try {
            const data = await API_CALL({
                url: "/api/get_all_tags",
                method: 'get'
            }, { type: "WEB" })
            // console.log(data)
            status = true;
            setCategoriesData([{ inc_id: "intial", tag: "All" }, ...data.data])
        } catch (error) {

            console.log(error)
        }
        return status;
    }
    async function getProductsbyTag(tag) {
        setLoadingList(true)
        try {
            const data = await API_CALL({

                url: `/api/products/tags/${tag}`,
                method: 'get'

            }, { type: "ML" })
            console.log(data.data)
            setProductsData(data.data)

        } catch (error) {
            console.log(error)
        }
        setLoadingList(false)
    }
    function renderProductsFunc({ item }) {
        function CardInfo(params) {
            const { title, desc } = params;
            return (
                <View style={{ flexDirection: "row", alignItems: "center", marginVertical: "2%", marginLeft: wp(8) }}>
                    <Text style={{ fontSize: hp(2.2), fontWeight: "bold" }}>
                        {title} :
                    </Text>
                    <Text style={{ marginTop: "1.5%", marginLeft: "2.8%" }}>
                        {desc}
                    </Text>
                </View>
            )

        }
        return (
            <View style={{ flex: 1, marginTop: 0, paddingBottom: 10 }}>
                <Pressable style={styles.productCard}
                    onPress={() => {
                        navigation.navigate("ProductInfoScreen", item)
                    }}

                >

                    <View>
                        <Image
                            source={{ uri: item.image_address }}
                            style={{
                                width: wp(30), height: wp(40),
                                alignSelf: "center",
                                resizeMode: "contain",
                                borderColor: COLORS.GREY,
                                borderWidth: 0.5,
                                padding: 10
                            }}
                        />
                    </View>
                    <View>
                        <Text
                            style={{ fontSize: hp(2.4) }}
                        >
                            {item.product_name}
                        </Text>



                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: "5%" }}>
                            <Text style={{ fontSize: hp(3.2) }}>
                                ₹ {item.mrp}
                            </Text>

                            <View style={{
                                flexDirection: "row", backgroundColor: COLORS.CART_ORANGE,
                                width: wp(21.5), height: "90%", alignItems: "center", marginLeft: "5%", marginTop: "1.5%"
                            }}>
                                <TouchableOpacity>
                                    <Ionicons
                                        name={"remove"}
                                        size={30}
                                        color={COLORS.WHITE}
                                        style={{ alignSelf: "center", backgroundColor: COLORS.CART_ORANGE }}
                                    />
                                </TouchableOpacity>
                                <View style={{
                                    backgroundColor: COLORS.WHITE, alignSelf: "center",
                                    borderColor: COLORS.CART_ORANGE, width: wp(7), height: "90%",
                                }}>
                                    <Text style={{ fontSize: 20, textAlign: "center" }}>
                                        0
                                    </Text>
                                </View>
                                <TouchableOpacity>
                                    <Ionicons
                                        name={"add"}
                                        color={COLORS.WHITE}

                                        size={30}
                                        style={{ alignSelf: "center", backgroundColor: COLORS.CART_ORANGE }}
                                    />
                                </TouchableOpacity>
                            </View>
                            {/* <View style={{
                                flexDirection: "row", alignItems: "center", width: wp(21.5),
                                height: "90%", marginLeft: "10%"
                            }}>
                                <TouchableOpacity style={{
                                    backgroundColor: COLORS.CART_ORANGE, borderWidth: 1.2,
                                    borderColor: COLORS.CART_ORANGE, width: wp(7), height: "90%",
                                }}>
                                    <Ionicons
                                        name={"add"}
                                        size={30}
                                        style={{ alignSelf: "center", backgroundColor: "red" }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    backgroundColor: COLORS.WHITE, borderWidth: 1.2,
                                    borderColor: COLORS.CART_ORANGE, width: wp(7), height: "90%",
                                }}>
                                    <Text>
                                        0
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    backgroundColor: COLORS.CART_ORANGE, borderWidth: 1.2,
                                    borderColor: COLORS.CART_ORANGE, width: wp(7), height: "90%",
                                }}>
                                    <Text>
                                        +
                                    </Text>
                                </TouchableOpacity>
                            </View> */}
                        </View>
                    </View>

                </Pressable>
            </View>
        )
    }
    function renderCategoriesFunc({ item }) {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: selectedCategory == item.tag ? COLORS.ORANGE : COLORS.GREY,
                    marginHorizontal: 10, paddingHorizontal: 14,
                    paddingVertical: 8, borderRadius: 50
                }}
                onPress={async () => {
                    setSelectedCategory(item.tag)
                    let tag = item.tag.split(" ").join("")
                    if (selectedCategory !== item.tag) {
                        if (tag == "All") {
                            setLoadingList(true)
                            const productsData = await getAllProductsList();
                            if (productsData) {
                                setLoadingList(false)
                            }
                            setLoadingList(false)
                        } else {
                            getProductsbyTag(tag)
                        }
                    }
                }}
                activeOpacity={0.75}
            >
                <Text style={{
                    color: COLORS.WHITE
                }}>
                    {item.tag}
                </Text>
            </TouchableOpacity>
        )

    }
    function SearchBar(params) {
        return (
            <View style={{ height: hp(9), width: wp(100), backgroundColor: COLORS.GREY, justifyContent: "center" }}>
                <View
                    style={{
                        height: hp(5.4), backgroundColor: COLORS.WHITE, alignSelf: "flex-start", alignItems: "center",
                        borderRadius: 10, flexDirection: "row", width: wp(80), marginLeft: "5%"
                    }}
                >
                    <TextInput
                        style={{
                            width: wp(70),
                            paddingLeft: "5%",
                            fontSize: hp(2)
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
                        style={{ marginLeft: "8%", color: COLORS.WHITE }}
                    />
                </View>
            </View>
        )
    }


    return (
        isLoading ?
            <Loader />
            :
            <>
                <SearchBar />
                <View style={styles.mainContainerStyle}>
                    <View>

                        <View style={{ flexDirection: "row", marginVertical: "2%" }}>

                            <FlatList
                                data={categoriesData}
                                horizontal={true}
                                renderItem={renderCategoriesFunc}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.inc_id}

                            />
                        </View>
                    </View>
                    {isLoadingList ?
                        <Loader /> :
                        <View style={{ marginTop: "2%" }}>
                            <FlatList
                                data={productsData}
                                numColumns={2}
                                columnWrapperStyle={{ flexWrap: 'wrap', flex: 1 }}

                                renderItem={renderProductsFunc}
                                keyExtractor={(item) => item.inc_id}
                            />
                            {/* <FlatList
                                data={productsData}
                                renderItem={renderProductsFunc}
                                keyExtractor={(item) => item.inc_id}
                            /> */}
                        </View>
                    }

                </View >
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
        marginVertical: "2%"
    },

})