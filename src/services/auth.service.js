import axios from "axios";
import { environment } from "../environments/environment"

const API_ENDPOINT = environment.API_ENDPOINT

export const login = (payload) => {
  return axios({
    url: `${API_ENDPOINT}/users/auth`,
    method: "post",
    data: payload
  }).catch((error) => {
    return error.response;
  })
}

export const logout = () => {
  return localStorage.removeItem("token") 
}