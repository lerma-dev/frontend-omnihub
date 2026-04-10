import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para detectar tokens expirados
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // ¡EL TOKEN EXPIRO! 
      console.log("Sesión expirada, limpiando...");
      localStorage.removeItem('omni_token'); 
      window.location.href = '/Home';      
    }
    return Promise.reject(error);
  }
);

export default api;