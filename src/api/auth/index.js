import { AxiosInstance } from "../../util/AxiosInstance";




export const signIn = async (user) => {

  const URL = '/mba/api/v1/auth/signin';

  try {
    const response = await AxiosInstance.post(URL, user);

    const { name, userId, email,userTypes,userStatus ,accessToken } = response.data;
    if(accessToken){    
      localStorage.setItem("name", name)
      localStorage.setItem("userId", userId);
      localStorage.setItem("email",email);
      localStorage.setItem("userTypes", userTypes);
      localStorage.setItem("userStatus",userStatus);
      localStorage.setItem("token", accessToken);
    }
    return response;

  } catch (error) {
      console.log(error);
    return error.response
  }

}

export const signUp = async (user) => {
  const URL = "/mba/api/v1/auth/signup";

  try {
    const response = await AxiosInstance.post(URL, user);
    return response;
  } catch (error) {
      console.log(error);
    return error.response;
  }

}

export const signOut = () => {
  localStorage.removeItem('name');
  localStorage.removeItem('userId');
  localStorage.removeItem('userTypes');
  localStorage.removeItem('userStatus');
  localStorage.removeItem('token');
  localStorage.removeItem('email');

}




export const updatePassword = async (userId,user) => {

  const URL = `/mba/api/v1/users/${userId}`;

  try {
    const response = await AxiosInstance.put(URL, user);
    return response;
  } catch (error) {
      console.log(error);
    throw error;
  }

}