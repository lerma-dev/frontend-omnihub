import { useState, useEffect } from 'react';
import api from '../api/config';
import { Producto } from '../models/product.model';

export const useProducts = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/productos/all');
      
      if (response.data.ok) {
        setProductos(response.data.data);
      }
    } catch (error) {
      console.error("Error al obtener productos de OmniHub:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return {
    productos,
    loading,
    refrescar: cargarProductos
  };
};