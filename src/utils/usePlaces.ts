// utils/usePlaces.ts
import { useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import api from '../api/config';

export const usePlaces = () => {
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  const fetchPlaces = async () => {
    setLoading(true);
    setError(null);
    try {
      const coordenadas = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = coordenadas.coords;
      setUserLocation({ lat: latitude, lng: longitude });

      const response = await api.get(`/places/nearby`, {
        params: { lat: latitude, lng: longitude }
      });

      if (response.data.status === 'success') {
        setPlaces(response.data.data); 
      } else {
        throw new Error('La respuesta de la API no fue exitosa');
      }

    } catch (err: any) {
      setError('No se pudieron obtener los lugares cercanos.');
      console.error('🔴 Error en usePlaces:', err);
    } finally {
      setLoading(false);
    }
  };

  // Retornamos también userLocation para que el mapa sepa dónde centrarse
  return { places, loading, error, fetchPlaces, userLocation };
};