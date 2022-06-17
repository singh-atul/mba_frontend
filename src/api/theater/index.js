

import { AxiosInstance } from "../../util/axiosInstance";

export const getAllTheaters = async () => {

    const URL = '/mba/api/v1/theatres';
  
    try {
      const response = await AxiosInstance.get(URL);
      return response;
    } catch (error) {
        console.log(error);
      throw error;
    }
  }

  export const getTheaterById = async (cinemaId) => {

    const URL = `/mba/api/v1/theatres/${cinemaId}`;
  
    try {
      const response = await AxiosInstance.get(URL);
      return response;
    } catch (error) {
        console.log(error);
      throw error;
    }
  }

  

  


  export const addNewTheater = async (theater) => {
    const URL = '/mba/api/v1/theatres';
    try {
      const response = await AxiosInstance.post(URL,theater);
      console.log(response);
      return response;
    } catch (error) {
        console.log(error);
      throw error;
    }
  
  }

  export const updateTheaterDetails = async (theater) => {
    const URL = `/mba/api/v1/theatres/${theater._id}`;
    try {
      const response = await AxiosInstance.put(URL,theater);
      console.log(response);
      return response;
    } catch (error) {
        console.log(error);
      throw error;
    }
  
  }

  export const deleteTheaterDetail = async (theater) => {
    const URL = `/mba/api/v1/theatres/${theater._id}`;
    try {
      const response = await AxiosInstance.delete(URL);
      console.log(response);
      return response;
    } catch (error) {
        console.log(error);
      throw error;
    }
  
  }


  export const updateTheaterMovie = async (data,theater) => {
    const URL = `/mba/api/v1/theatres/${theater._id}/movies`;
    try {
      const response = await AxiosInstance.put(URL,data);
      return response;
    } catch (error) {
        console.log(error);
      throw error;
    }
  
  }


  




// app.post("/mba/api/v1/theatres", [authJwt.verifyToken, authJwt.isAdmin, verifyTheatreReqBody.validateTheatreRequestBody], theatreController.createTheatre);
//     app.put("/mba/api/v1/theatres/:id", [authJwt.verifyToken, authJwt.isAdminOrClient, verifyTheatreReqBody.validateTheatreRequestBody], theatreController.updateTheatre);
//     app.delete("/mba/api/v1/theatres/:id", [authJwt.verifyToken, authJwt.isAdmin], theatreController.deleteTheatre);
//     app.put("/mba/api/v1/theatres/:id/movies", [authJwt.verifyToken, authJwt.isAdminOrClient], theatreController.addMoviesToATheater);
    
