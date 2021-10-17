import axios from "axios";
import { environment } from "../environments/environment"

const API_ENDPOINT = environment.API_ENDPOINT

const HeaderDefault = () => {
  const opts = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json; charset=utf-8",
      "Content-Type": "application/json; charset=utf-8"
    },
  };
  return opts;
};

export const createTask = (payload) => {
  return axios({
    url: `${API_ENDPOINT}/todos`,
    method: "post",
    data: payload,
    ...HeaderDefault()
  }).catch((error) => {
    return error.response;
  })
}

export const getAllTask = () => {
  return axios({
    url: `${API_ENDPOINT}/todos`,
    method: "get",
    ...HeaderDefault()
  }).catch((error) => {
    return error.response;
  })
}

export const getTaskById = (id) => {
  return axios ({
    url: `${API_ENDPOINT}/todos/${id}`,
    method: "get",
    ...HeaderDefault()
  }).catch((error) => {
    return error.response;
  })
}

export const editTask = (payload,id) => {
  return axios({
    url: `${API_ENDPOINT}/todos/${id}`,
    method: "put",
    data: payload,
    ...HeaderDefault()
  }).catch((error) => {
    return error.response;
  })
}

export const removeTask = (id) => {
  return axios({
    url: `${API_ENDPOINT}/todos/${id}`,
    method: "delete",
    ...HeaderDefault()
  }).catch((error) => {
    return error.response;
  })
}