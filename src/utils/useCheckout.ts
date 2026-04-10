import { useState } from 'react';
import api from '../api/config';
import { CheckoutState, CreateOrderRequest } from '../models/checkout.model';
import { Producto } from '../models/product.model';

export const useCheckout = (producto: Producto, onSuccess?: () => void) => {
  const [state, setState] = useState<CheckoutState>({
    orderId: null,
    status: 'IDLE',
    error: null
  });

  const createOrder = async (precioManual: string) => {
    try {
      setState(s => ({ ...s, status: 'PENDING' }));

      const data: CreateOrderRequest = {
        id_producto: producto.id_producto, //
        nombre: producto.nombre,           //
        precio_original: producto.precio.toString(), // Valor por defecto
        monto_pagar: precioManual // Valor capturado del input azul
      };

      const response = await api.post('/payment/create-order', data);
      
      setState(s => ({ ...s, orderId: response.data.id }));
      return response.data.id;
    } catch (err: any) {
      const errorMessage = err.response?.data?.msg || err.message;
      setState(s => ({ ...s, status: 'ERROR', error: errorMessage }));
      throw err;
    }
  };

  const onApprove = async (data: any) => {
    try {
      const response = await api.get(`/payment/capture-order/${data.orderID}`);
      
      if (response.data.status === 'COMPLETED') {
        setState(s => ({ ...s, status: 'COMPLETED' }));
        if (onSuccess) onSuccess();
      }
    } catch (err: any) {
      setState(s => ({ ...s, status: 'ERROR', error: err.message }));
    }
  };

  return { state, createOrder, onApprove };
};