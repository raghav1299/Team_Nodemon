import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { API_CALL } from '../../Functions/ApiFuntions';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../Constants/GlobalStyles';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
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
            <Pressable style={{
                width: wp(96), backgroundColor: COLORS.WHITE,
                paddingVertical: hp(2), elevation: 10, alignSelf: "center",
                marginVertical: hp(1), borderRadius: 5
            }}
                onPress={() => {
                    navigation.navigate("ProductInfoScreen", item)
                }}

            >
                <View style={{ flexDirection: "row" }}>
                    <Image
                        source={{ uri: item.image_address }}
                        style={{
                            width: wp(30), height: wp(40),
                            marginLeft: wp(5),
                            resizeMode: "contain",
                            borderColor: COLORS.GREY,
                            borderWidth: 0.5,
                            padding: 10
                        }}
                    />
                    <View style={{ justifyContent: "center" }} >
                        <CardInfo
                            title={"Name"}
                            desc={item.product_name}
                        />
                        <CardInfo
                            title={"Cost"}
                            desc={item.mrp}
                        />
                        <CardInfo
                            title={"Quantity"}
                            desc={item.quantity}
                        />
                        <CardInfo
                            title={"Ratings"}
                            desc={item.ratings}
                        />

                    </View>
                </View>
            </Pressable>
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
                        height: hp(5.4), backgroundColor: COLORS.WHITE, alignSelf: "center", alignItems: "center",
                        borderRadius: 10, flexDirection: "row", width: wp(90)
                    }}
                >
                    <TextInput
                        style={{
                            width: wp(80),
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
                        <FlatList
                            data={productsData}
                            renderItem={renderProductsFunc}
                            keyExtractor={(item) => item.inc_id}
                        />
                    }

                </View >
            </>
    );
}

const styles = StyleSheet.create({
    mainContainerStyle: {
        flex: 1,
        paddingTop: hp(1),

    }

})