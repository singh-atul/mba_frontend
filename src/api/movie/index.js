import { AxiosInstance } from "../../util/AxiosInstance";

export const getAllMovies = async () => {

    const URL = '/mba/api/v1/movies';
  
    try {
  
      const response = await AxiosInstance.get(URL);
      const { username, id, accessToken } = response.data;
      return response;
  
    } catch (error) {
  
      console.log(error);
      throw error;
    }
  
  }


export const getMovie = async (id) => {
  
    const URL = `/mba/api/v1/movies/${id}`;
    
    try {
      const response = await AxiosInstance.get(URL);
      return response;
    } catch (error) {
        console.log(error);
        throw error;
  
    }
  
  }
  export const addNewMovie = async (movie) => {

    const URL = '/mba/api/v1/movies';
    
    try {      
      const response = await AxiosInstance.post(URL,movie);
      return response;
    } catch (error) {
        console.log(error);
        throw error;
  
    }
  
  }

  export const updateMovieDetails = async (movie) => {
    const URL = `/mba/api/v1/movies/${movie._id}`;
    
    try {
  
      const response = await AxiosInstance.put(URL,movie);
      return response;
    } catch (error) {
        console.log(error);
        throw error;
  
    }
  
  }
  
  export const removeMovie = async (movie) => {

    const URL = `/mba/api/v1/movies/${movie._id}`;
    
    try {
  
      const response = await AxiosInstance.delete(URL);
      return response;
    } catch (error) {
        console.log(error);
        throw error;
  
    }
  
  }

