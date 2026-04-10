import Header from '../../components/layouts/Header';
import './styles/Tab3.css';
import storefront from '../../assets/tienda.png';
// components
import { 
  IonPage, IonContent, IonButton, IonLabel, 
  IonIcon, IonItem, IonCard, IonCardContent, 
  IonSpinner, useIonRouter
} from '@ionic/react';
import CheckoutModal from '../../components/ui/CheckoutModal';
// hooks
import { useState } from "react";
import { useProducts } from '../../utils/useProducts';

const Tab3: React.FC = () => {

  const router = useIonRouter();
  
  function handleLogout(e: React.MouseEvent) {
    localStorage.removeItem('omni_token'); 
    (e.currentTarget as HTMLButtonElement).blur();
    router.push('/Home', 'root', 'replace');
  }

  const { productos, loading, refrescar } = useProducts();

  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <IonPage>
      <Header title="Productos" logo={storefront}  size={40}/>
      <IonContent>
        <Header title="Productos" type="condense" />
        
        {/* Estado de carga */
          loading && (
            <div className="center">
              <IonSpinner name="crescent" color="primary" />
              <p>Consultando Productos...</p>
            </div>
          )
        }
        
        <div className="productos-grid">
          {/* productos */
            !loading && productos && (
              <>
              {productos.map(producto => (
                <IonCard key={producto.id_producto}>
                  <IonCardContent >
                    <div className="info-productos">
                      <img 
                        src={producto.imagen} 
                        alt={producto.nombre} />
                      <h3>{producto.nombre}</h3>
                    </div>
                    <IonLabel className="text-products">
                      <p><span>Descripcion:</span> {producto.descripcion}</p>
                      <p><span>Categoria:</span> {producto.categoria}</p>
                      <p><span>Cantidad:</span> {producto.stock}</p>                     
                    </IonLabel>
                    <IonLabel className="precio-producto">
                      {producto.precio} <span>MXN</span>
                    </IonLabel>
                    <IonButton 
                      className="comprar"
                      onClick={() => setSelectedProduct(producto)}>
                      Pagar
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              ))}
              </>
            )
          }
        </div>
        
        <CheckoutModal 
          producto={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSuccess={refrescar}
        />
      </IonContent>
    </IonPage>
  );
};
export default Tab3;