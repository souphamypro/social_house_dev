import axios from "axios";
import store from "../reducers";

export const api = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "X-Requested-With": "XMLHttpRequest",
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((request) => {
    var state = store.getState();
    console.log("[API Request] = : ", request, state.auth.token);
    if (state.auth.token !== null && state.auth.token !== undefined && state.auth.token !== "") {
        request.headers["Session"] = state.auth.token;
    }
    return request;
});

api.interceptors.response.use(
    (response) => {
        console.log("[API Response] = : ", response);
        return response;
    },
    (error) => {
        // console.log("[API error]", error);
        console.log("[API error]", error.response);
        if (error.response === undefined) {
            return Promise.reject("Invalid Server Connection!");
        }
        else if (error.response.status === 500) {
            if (error.response.data !== undefined && error.response.data !== null) {
                return Promise.reject(error.response.data);
            } else {
                return Promise.reject("Internal Server Error!");
            }
        } else if (error.response.status === 404 || error.response.status === 400) {
            return Promise.reject("Invalid API Request!");
        }
        else {
            // return Promise.reject("Invalid Server Connection!");
            return Promise.reject(error);
        }
        // if (error?.response?.status === 401) {
        //     store.dispatch({ type: "auth_logOut" });
        // }
    }
);