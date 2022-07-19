


import { AxiosInstance } from "../../util/AxiosInstance";

export const makePayment = async (payment) => {

  const URL = '/mba/api/v1/payments';
  
  try {      
    const response = await AxiosInstance.post(URL,payment);
    return response;
  } catch (error) {
      console.log(error);
      throw error;

  }

}


