import Header from '../../components/layouts/Header';
import './styles/Tab4.css';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, 
  IonCardTitle, IonItem, IonIcon, IonLabel, IonList, 
  useIonRouter, IonButton 
} from '@ionic/react';
import { 
  exit, locationOutline, mailOutline, 
  phonePortraitOutline, timeOutline 
} from 'ionicons/icons';
import Mapa from '../../components/ui/Mapa';

const Tab4: React.FC = () => {

  const router = useIonRouter();
  
  function handleLogout(e: React.MouseEvent) {
    localStorage.removeItem('omni_token'); 
    (e.currentTarget as HTMLButtonElement).blur();
    router.push('/Home', 'root', 'replace');
  }

  const officeLocation = { lat: 31.550946006235073, lng: -106.352375564 };

  return (
    <IonPage >
      <Header title="Acerca De">
        <IonButton 
          onClick={(e) => handleLogout(e)} 
          shape="round" 
          className="log-out"> 
          <IonIcon slot="icon-only" icon={exit} /> 
        </IonButton>
      </Header>
      <IonContent>
        <Header title="Acerca De" type="condense" />
        
        {/* Sección de la Empresa */}
        <IonCard className="dark-card">
          <IonCardHeader>
            <IonCardTitle>Nuestra Empresa</IonCardTitle>
            <IonCardSubtitle>Soluciones Digitales Premium</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            omniHub es una plataforma líder en la gestión de servicios de streaming y tarjetas de regalo, 
            enfocada en brindar una experiencia de usuario rápida, ad-free y segura.
          </IonCardContent>
        </IonCard>

        {/* Datos de Contacto */}
        <IonList inset={true} className="dark-list">
          <IonItem lines="full">
            <IonIcon aria-hidden="true" icon={phonePortraitOutline} slot="start" />
            <IonLabel>
              <h3>Teléfono</h3>
              <p>+52 (656) 123-4567</p>
            </IonLabel>
          </IonItem>
          <IonItem lines="full">
            <IonIcon aria-hidden="true" icon={mailOutline} slot="start" />
            <IonLabel>
              <h3>Correo Electrónico</h3>
              <p>soporte@omnihub.dev</p>
            </IonLabel>
          </IonItem>
          <IonItem lines="none">
            <IonIcon aria-hidden="true" icon={timeOutline} slot="start" />
            <IonLabel>
              <h3>Horario de Atención</h3>
              <p>Lun - Vie: 9:00 AM - 6:00 PM</p>
            </IonLabel>
          </IonItem>
        </IonList>

        {/* Sección del Mapa */}
        <IonCard className="dark-card">
          <IonCardHeader>
            <IonCardTitle>Ubicación de la oficina</IonCardTitle>
            <IonCardSubtitle>
              <IonIcon icon={locationOutline} /> Ciudad Juárez, Chih. México
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="map-container">
              <Mapa userLocation={officeLocation} />
            </div>
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Tab4;