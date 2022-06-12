import { AxiosInstance } from "../../util/AxiosInstance";




export const signIn = async (user) => {

  const URL = '/mba/api/v1/auth/signin';

  try {
    const response = await AxiosInstance.post(URL, user);

    const { name, userId, email,userTypes,userStatus ,accessToken } = response.data;
    localStorage.setItem("name", name)
    localStorage.setItem("userId", userId);
    localStorage.setItem("email",email);
    localStorage.setItem("userTypes", userTypes);
    localStorage.setItem("userStatus",userStatus);
    localStorage.setItem("token", accessToken);

    return response;

  } catch (error) {
      console.log(error);
    throw error;
  }

}

export const signUp = async (user) => {

  const URL = "/mba/api/v1/auth/signup";

  try {
    const response = await AxiosInstance.post(URL, user);
    console.log(response);
    return response;
  } catch (error) {
      console.log(error);
    throw error;
  }

}

export const signOut = () => {

  localStorage.removeItem('username');
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
  localStorage.removeItem('email');
}


