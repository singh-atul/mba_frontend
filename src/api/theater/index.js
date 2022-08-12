

import { AxiosInstance } from "../../util/AxiosInstance";

export const getAllTheaters = async () => {

    const URL = '/mba/api/v1/theatres';
  
    try {
      const response = await AxiosInstance.get(URL);
      console.log(response)
      return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
  }

  export const getTheaterById = async (cinemaId) => {
    const URL = `/mba/api/v1/theatres/${cinemaId}`;
  
    try {
      const response = await AxiosInstance.get(URL);
      return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
  }

  

  


  export const addNewTheater = async (theater) => {
    const URL = '/mba/api/v1/theatres';
    try {
      const response = await AxiosInstance.post(URL,theater);
      return response;
    } catch (error) {
        console.log(error);
      return error.response;
    }
  
  }

  export const updateTheaterDetails = async (theater) => {
    const URL = `/mba/api/v1/theatres/${theater._id}`;
    try {
      const response = await AxiosInstance.put(URL,theater);
      return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
  
  }

  export const deleteTheaterDetail = async (theater) => {
    const URL = `/mba/api/v1/theatres/${theater._id}`;
    try {
      const response = await AxiosInstance.delete(URL);
      return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
  
  }


  export const updateTheaterMovie = async (data,theater) => {
    const URL = `/mba/api/v1/theatres/${theater._id}/movies`;
    try {
      const response = await AxiosInstance.put(URL,data);
      return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
  
  }


  
