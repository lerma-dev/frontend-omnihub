// utils/useWeather.ts
import { useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import api from '../api/config';

export const useWeather = () => {
  const [clima, setClima] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Validar y solicitar permisos (Crucial para la primera vez en Android)
      const permiso = await Geolocation.checkPermissions();
      
      if (permiso.location !== 'granted') {
        const solicitud = await Geolocation.requestPermissions();
        if (solicitud.location !== 'granted') {
          throw new Error('Permiso de ubicación denegado');
        }
      }
      
      const coordenadas = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000 // 10 segundos
      });
      const { latitude, longitude } = coordenadas.coords;

      const response = await api.get(`/weather/current`, {
        params: { lat: latitude, lon: longitude }
      });

      if (response.data.ok) {
        setClima(response.data);
      }
    } catch (err: any) {
      setError('No se pudo obtener el clima.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { clima, loading, error, fetchWeather };
};