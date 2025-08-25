import axios from "axios";
import {BASE_URL} from "./baseRouting.js";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYW5lZXNoYUBnbWFpbC5jb20iLCJpYXQiOjE3MzUxODQ3ODQsImV4cCI6MTczNTI3MTE4NH0.EmQvQYvKis3yEeAchzTNKKMWQ1Q_c1rQgHdezkktN_4`,
    },
});

export default api;