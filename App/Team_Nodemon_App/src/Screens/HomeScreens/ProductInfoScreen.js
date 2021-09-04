import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../Constants/GlobalStyles';

function ProductInfoScreen({ route }) {
    const { params } = route;
    const [productsData, setProductsData] = useState([])
    useEffect(() => {
        setProductsData(params)
    }, [])

    console.log(params)
    return (
        <ScrollView style={styles.mainContainerStyle}
            contentContainerStyle={{ paddingTop: hp(1), backgroundColor: COLORS.WHITE }}
        >
            <View style={styles.card}>
                <Image
                    source={{ uri: productsData.image_address }}
                    style={{
                        width: wp(90), height: hp(30), marginTop: hp(2.4),
                        resizeMode: "contain", alignSelf: "center"
                    }}
                />
                <Text>
                    {productsData.mrp}
                </Text>
                <Text>
                    {productsData.quantity}

                </Text>

            </View>

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    mainContainerStyle: {
        flex: 1,
    },
    card: {
        width: wp(96),
        paddingVertical: hp(2),
        elevation: 6,
        backgroundColor: COLORS.WHITE,
        borderRadius: 10,
        alignSelf: "center",

    }
})
export default ProductInfoScreen;