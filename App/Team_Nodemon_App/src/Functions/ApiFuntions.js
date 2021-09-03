import axios from "axios";
import { BASE_URL } from "../Constants/Constants";
import { showNotification } from "./AppFuntions";

export function API_CALL(config) {

    const API_Config = Object.assign({}, config, {
        url: `${BASE_URL}${config.url}`
    });

    return axios(API_Config).then((response) => {
        // console.log(response.data)
        // if (response.data.error) {
        //     showNotification("Error API Occurred")
        //     API_STATUS = false;
        // }
        let data = response.data
        return data
    }).catch((error) => {
        console.log("HERE AT API CALL ERROR")
        console.log("API CALL Error", error)
        return error;
    });
}