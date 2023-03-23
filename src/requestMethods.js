import axios from "axios";
import { useSelector } from "react-redux";

const BASE_URL = "https://a-zboutiqueapi.onrender.com/api/";

//const BASE_URL = "http://127.0.0.1:5000/api/"


const root = JSON.parse(localStorage.getItem("persist:root"));
const user = root ? root.user : null;
const currentUser = user ? JSON.parse(user).currentUser : null;
const TOKEN = currentUser ? currentUser.accesstoken : "";


export function useAuthenticatedRequest() {
  const accessToken = useSelector(state => state.user.currentUser.accesstoken);
 // console.log(accessToken)
  const authenticatedRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${accessToken}` },
  });

  return authenticatedRequest;
}


export const publicRequest = axios.create({
  baseURL : BASE_URL,
});

export const userRequest = axios.create({
  baseURL : BASE_URL,
  headers : {token:`Bearer ${TOKEN}`},
});
