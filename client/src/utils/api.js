import axios from "axios";

export const supportApi = axios.create({
    baseURL: "http://localhost:3600",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    credentials: "include"
});

export const coreApi = axios.create({
    baseURL: "http://localhost:8008",
});