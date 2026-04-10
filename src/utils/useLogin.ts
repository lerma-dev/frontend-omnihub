// utils/login.ts
import api from '../api/config';
import { Login } from '../models/auth.model';

export const useLogin = async (credentials: Login) => {
  const response = await api.post('/users/login', credentials);
  return response.data;
};