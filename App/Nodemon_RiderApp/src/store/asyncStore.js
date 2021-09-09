
import React, { createContext } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value))
        console.log('value set', key)
    } catch (e) {
        console.log(e)
    }
}



export const getData = async (key) => {
    console.log("keyyy", key)
    try {
        const value = await AsyncStorage.getItem(key)
        console.log("value retrive async", value)
        if (value !== null) {
            return JSON.parse(value)
            // value previously stored
        }
    } catch (e) {
        console.log(e)
        // error reading value
    }
}