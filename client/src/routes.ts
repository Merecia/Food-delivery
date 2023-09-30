import axios from 'axios';

const SERVER_URL = import.meta.env.SERVER_URL || "http://localhost:5000";

const storage = localStorage.getItem("persist:root");
const user = storage && JSON.parse(storage)?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
    baseURL: SERVER_URL
});

export const userRequest = axios.create({
    baseURL: SERVER_URL,
    headers: { token: `Bearer ${TOKEN}` }
});