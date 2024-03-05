import axios, { AxiosResponse } from 'axios';
import { UserData } from './types';

const BASE_URL = 'https://reqres.in/api'


interface AuthResponse {
  token: string;
}





export const authenticateUser = async (email: string, password: string): Promise<string> => {
  try {
    const response: AxiosResponse<AuthResponse> = await axios.post(`${BASE_URL}/login`, {
      email,
      password
    });
    return response.data.token;
  } catch (error) {
    throw new Error('Authentication failed');
  }
};


export const getUserData = async (): Promise<UserData> => {
    try {
        const BASE_URL = 'https://reqres.in/api';
        const response: AxiosResponse<UserData> = await axios.get(`${BASE_URL}/users`);
        return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user data');
    }
};

export const signUpUser = async (email: string, password: string): Promise<any> => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, { email, password });
        return response.data; 
    } catch (error) {
        throw new Error('Sign-up failed');
    }
};






