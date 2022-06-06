import { AxiosInstance } from "../../util/AxiosInstance";

export const signIn = async (user) => {

  const URL = '/auth/signin';

  try {

    const response = await AxiosInstance.post(URL, user);
    console.log(response);
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

export const signUp = async (user) => {

  const URL = '/auth/signup';

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
  localStorage.removeItem('cartId');
}