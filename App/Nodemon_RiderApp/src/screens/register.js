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
import { storeData } from '../store/asyncStore';

export default Home = ({ navigation }) => {
    return (
        <View>
            <Text>register</Text>
        </View>
    )
}
