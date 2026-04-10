import api from '../api/config';
import { Register } from '../models/auth.model';

export const useRegister = async (datos: Register) => {
  const response = await api.post('/users/register', datos);
  return response.data;
};