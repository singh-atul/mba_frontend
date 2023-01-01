import React from "react";
import axios from "axios";
import { TIMEOUT, API_BASE_URL } from "../config/Config";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export const AxiosInstance = axios.create({

  baseURL: API_BASE_URL,
  timeout: TIMEOUT,

});


AxiosInstance.interceptors.request.use(
  async config => {
   const token =localStorage.getItem("token");;
   if (token) {
    config.headers.common['x-access-token'] = `${token}`;
   }
   return config;
  },
  err => {
   return Promise.reject(err);
  }
 );