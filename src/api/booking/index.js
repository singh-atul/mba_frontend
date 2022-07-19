
import { AxiosInstance } from "../../util/AxiosInstance";

  export const createBooking = async (booking) => {

    const URL = '/mba/api/v1/bookings';
    
    try {      
      const response = await AxiosInstance.post(URL,booking);
      return response;
    } catch (error) {
        console.log(error);
        throw error;
  
    }
  
  }

  export const getBooking = async () => {

    const URL = '/mba/api/v1/bookings';
    
    try {      
      const response = await AxiosInstance.get(URL);
      return response;
    } catch (error) {
        console.log(error);
        throw error;
  
    }
  
  }
