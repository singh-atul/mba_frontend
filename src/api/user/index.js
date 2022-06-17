
import { AxiosInstance } from "../../util/axiosInstance";

export const getAllUsers = async () => {

    const URL = '/mba/api/v1/users/';
  
    try {
  
      const response = await AxiosInstance.get(URL);
      return response;

    } catch (error) {
      console.log(error);
      throw error;
    }
  
  }

  export const updateUserInfo = async (user) => {

    const URL = `/mba/api/v1/users/${user.userId}`;
  
    try {
  
      const response = await AxiosInstance.put(URL,user);
      return response;

    } catch (error) {
      console.log(error);
      throw error;
    }
  
  }


  








// app.put("/crm/api/v1/users/:userId", [authJwt.verifyToken, authJwt.isAdmin, verifyUserReqBody.validateUserStatusAndUserType], userController.updateUser);
// 