
import { AxiosInstance } from "../../util/axiosInstance";

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

