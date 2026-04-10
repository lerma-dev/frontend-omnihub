// Home.tsx
import Header from '../components/layouts/Header';
import './Home.css';
import { 
  IonPage, 
  IonContent, 
  IonIcon, 
  IonCard, 
  IonCardContent, 
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  useIonViewWillEnter,
  useIonRouter
} from '@ionic/react';
import { logInOutline, personAddOutline, rocketOutline } from 'ionicons/icons';


const Home: React.FC = () => {

  const router = useIonRouter();

  function navigateTo(...args) {
    router.push(...args);
  }

  useIonViewWillEnter(() => {
    const token = localStorage.getItem('omni_token');
    
    if (token) {
      navigateTo('/App', 'root','replace');
    }
  });

  return (
    <IonPage>
      <Header title="OmniHub" />
      <IonContent fullscreen>
        <Header title="Bienvenido a" type="condense" />

        <div className="content-limiter">
          <main className="landing-main">
            {/* --- HERO SECTION --- */}
            <div className="hero-section">
              <IonIcon icon={rocketOutline} className="hero-icon" />
              <IonText color="light">
                <h1 className="hero-title">Omni<span className="accent">Hub</span></h1>
              </IonText>
              <IonText color="medium">
                <p className="hero-subtitle">Tu plataforma de gestión de hardware y componentes.</p>
              </IonText>
            </div>

            {/* --- ACCIONES --- */}
            <IonGrid className="action-grid">
              <IonRow className="ion-justify-content-center">
                <IonCol>
                  
                  {/* Tarjeta Iniciar Sesión */}
                  <IonCard className="auth-card glass-effect" 
                    onClick={() => navigateTo('/Login', 'forward', 'push')}>
                    <IonCardContent className="card-body">
                      <div className="icon-wrapper login-bg">
                        <IonIcon icon={logInOutline} />
                      </div>
                      <div className="text-wrapper">
                        <IonText color="light">
                          <h3 className="ion-no-margin">Iniciar Sesión</h3>
                        </IonText>
                        <IonText color="medium">
                          <p className="ion-no-margin">Accede a tu cuenta</p>
                        </IonText>
                      </div>
                    </IonCardContent>
                  </IonCard>

                  {/* Tarjeta Registro */}
                  <IonCard className="auth-card glass-effect" 
                    onClick={() => navigateTo('/Register', 'forward', 'push')}>
                    <IonCardContent className="card-body">
                      <div className="icon-wrapper register-bg">
                        <IonIcon icon={personAddOutline} />
                      </div>
                      <div className="text-wrapper">
                        <IonText color="light">
                          <h3 className="ion-no-margin">Registrarse</h3>
                        </IonText>
                        <IonText color="medium">
                          <p className="ion-no-margin">Crea una nueva cuenta</p>
                        </IonText>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;