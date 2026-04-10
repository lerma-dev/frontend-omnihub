// components/PaypalButton.tsx
import React from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useCheckout } from '../../utils/useCheckout';
import { Producto } from '../../models/product.model';

interface PaypalButtonProps {
  producto: Producto;
  precioManual: string;
  onSuccess: () => void;
}

const PaypalButton: React.FC<PaypalButtonProps> = ({ producto, precioManual, onSuccess }) => {
  const { createOrder, onApprove, state } = useCheckout(producto, onSuccess);

  return (
    <>
      <PayPalButtons
        style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay' }}
        createOrder={() => createOrder(precioManual)}
        onApprove={(data) => onApprove(data)}
      />
      {state.status === 'ERROR' && (
        <div style={{ color: 'red', marginTop: '10px', textAlign: 'center', fontSize: '0.9rem' }}>
          Error: {state.error}
        </div>
      )}
    </>
  );
};

export default PaypalButton;