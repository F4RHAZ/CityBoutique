import axios from "axios";


const BASE_URL = "https://a-zboutiqueapi.onrender.com/api/";

//const BASE_URL = "http://127.0.0.1:5000/api/"


const root = JSON.parse(localStorage.getItem("persist:root"));
const user = root ? root.user : null;
const currentUser = user ? JSON.parse(user).currentUser : null;
const TOKEN = currentUser ? currentUser.accesstoken : "";

//console.log(TOKEN);

export const publicRequest = axios.create({
  baseURL : BASE_URL,
});

export const userRequest = axios.create({
  baseURL : BASE_URL,
  headers : {token:`Bearer ${TOKEN}`},
});
