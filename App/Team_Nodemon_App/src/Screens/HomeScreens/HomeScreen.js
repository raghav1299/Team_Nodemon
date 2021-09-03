import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput } from 'react-native';
import { API_CALL } from '../../Functions/ApiFuntions';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../Constants/GlobalStyles';

export default function HomeScreen() {

    const [productsData, setProductsData] = useState([])
    useEffect(() => {
        initPageLoadEvents();
    }, [])
    async function initPageLoadEvents(params) {
        try {
            const data = await API_CALL({

                url: "/api/get_all_products",
                method: 'get'

            })
            // console.log(data)
            setProductsData(data.data)
        } catch (error) {

        }
    }
    function renderItemFunc({ item }) {
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
            <View style={{
                width: wp(96), backgroundColor: COLORS.WHITE,
                paddingVertical: hp(2), elevation: 10, alignSelf: "center",
                marginVertical: hp(1), borderRadius: 5
            }}>
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
            </View>
        )
    }
    return (
        <View style={styles.mainContainerStyle}>
            <View>
                <TextInput
                    style={{ borderWidth: 1, width: wp(96) }}
                />
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ marginHorizontal: "10%", backgroundColor: "red" }}>
                        Spices
                    </Text>
                    <Text style={{ marginHorizontal: "10%", backgroundColor: "red" }}>
                        SWEET
                    </Text>
                </View>
            </View>
            <FlatList
                data={productsData}
                renderItem={renderItemFunc}
                keyExtractor={(item) => item.inc_id}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    mainContainerStyle: {
        flex: 1,
        paddingTop: hp(1)
    },
    courseCard: {
        width: wp(45),
        paddingBottom: hp(2.4),
        backgroundColor: COLORS.WHITE,
        marginHorizontal: 10,
        elevation: 6,
        marginVertical: 10


    },
    resultsCard: {
        width: wp(45),
        paddingBottom: hp(2.4),
        backgroundColor: COLORS.WHITE,
        marginHorizontal: 10,
        elevation: 6,
        alignItems: "center",
        marginVertical: 10


    }
})