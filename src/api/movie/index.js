import { AxiosInstance } from "../../util/AxiosInstance";

export const getAllMovies = async () => {

    const URL = '/mba/api/v1/movies';
  
    try {
  
      const response = await AxiosInstance.get(URL);
      const { username, id, accessToken } = response.data;
  
      localStorage.setItem("username", username)
      localStorage.setItem("userId", id);
      localStorage.setItem("token", accessToken);
  
      return response;
  
    } catch (error) {
  
      console.log(error);
      throw error;
    }
  
  }


export const getMovie = async (id) => {
  
    const URL = `/mba/api/v1/movies/${id}`;
    
    try {
      console.log("###",id);
      const response = await AxiosInstance.get(URL);
      console.log(response);
      return response;
    } catch (error) {
        console.log(error);
        throw error;
  
    }
  
  }
  // export const createMovie = async () => {

  //   const URL = '/mba/api/v1/movies';
    
  //   try {
  
  //     // const response = await AxiosInstance.post(URL, id);
  //     // return response;
  //   } catch (error) {
  //       console.log(error);
  //       throw error;
  
  //   }
  
  // }

  // export const updateMovie = async (movieId) => {

  //   const URL = '/mba/api/v1/movies';
    
  //   try {
  
  //     // const response = await AxiosInstance.put(URL, id);
  //     // return response;
  //   } catch (error) {
  //       console.log(error);
  //       throw error;
  
  //   }
  
  // }
  
  // export const deleteMovie = async (movieId) => {

  //   const URL = '/mba/api/v1/movies';
    
  //   try {
  
  //     // const response = await AxiosInstance.delete(URL, id);
  //     // return response;
  //   } catch (error) {
  //       console.log(error);
  //       throw error;
  
  //   }
  
  // }

