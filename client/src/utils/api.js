import axios from "axios";

export const supportApi = axios.create({
    baseURL: "https://cng-billing-system.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    credentials: "include"
});

export const coreApi = axios.create({
    baseURL: "http://192.168.29.68:8008",
});