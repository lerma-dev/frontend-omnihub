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
      const coordenadas = await Geolocation.getCurrentPosition();
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