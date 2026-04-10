export interface CheckoutState {
  orderId: string | null;
  status: 'IDLE' | 'PENDING' | 'COMPLETED' | 'ERROR';
  error: string | null;
}

export interface CreateOrderRequest {
  id_producto: number;
  nombre: string;
  precio_original: string; 
  monto_pagar: string;    
}