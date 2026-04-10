// components/CheckoutModal.tsx
import React, { useRef, useState } from 'react';
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
} from '@ionic/react';
import PaypalButton from './PaypalButton';
import { Producto } from '../../models/product.model';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

interface CheckoutModalProps {
  producto: Producto | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ producto, isOpen, onClose, onSuccess }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [precioManual, setPrecioManual] = useState<string>('');

  const handleSuccess = () => {
    setPrecioManual('');
    onSuccess();
    onClose();
  };

  return (
    <IonModal 
      ref={modal} 
      isOpen={isOpen} 
      onDidDismiss={() => {
        setPrecioManual('');
        onClose();
      }}
      initialBreakpoint={0.5}
      breakpoints={[0, 0.5, 0.8]} >
      <PayPalScriptProvider 
        options={{ 
          clientId: "AUvB_S-ZGxhmz__6UEXA-SP9AK8dDoGsUzWNFtitBdrwjPo_tp6DSRuskUWlouBdn3ylhHYdg83vtidT", 
          currency: "MXN" 
        }}>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonTitle>Finalizar Compra</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={onClose} color="medium">Cerrar</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          {producto && (
            <div className="checkout-container">
              <IonItem lines="none">
                <IonLabel>
                  <h2 style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>{producto.nombre}</h2>
                  <p>{producto.descripcion}</p>
                </IonLabel>
              </IonItem>

              <IonItem className="ion-margin-vertical" style={{ 
                borderRadius: '12px', 
                border: '1px solid #333',
                '--background': '#121212' 
              }}>
                <IonLabel position="stacked" color="primary">Monto a pagar (MXN)</IonLabel>
                <IonInput 
                  type="number" 
                  placeholder="0.00"
                  value={precioManual}
                  onIonInput={(e) => setPrecioManual(e.detail.value!)}
                  style={{ fontSize: '1.2rem', color: '#00e5ff' }}
                />
              </IonItem>

              <div className="paypal-section" style={{ marginTop: '20px', minHeight: '150px' }}>
                {
                  parseFloat(precioManual) > 0 ? 
                  (
                    <PaypalButton 
                      producto={producto} 
                      precioManual={precioManual}
                      onSuccess={handleSuccess} />
                  ): (
                    <p className="ion-text-center" style={{ color: '#666' }}>
                      Ingresa un monto para continuar
                    </p>
                  )
                }
              </div>
              
              <p className="ion-text-center" style={{ fontSize: '0.8rem', color: '#888', marginTop: '15px' }}>
                El pago se procesará de forma segura mediante PayPal
              </p>
            </div>
          )}
        </IonContent>
      </PayPalScriptProvider>
    </IonModal>
  );
};

export default CheckoutModal;