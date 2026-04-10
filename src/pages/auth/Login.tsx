// Login.tsx
import Header from '../../components/layouts/Header';
import './Auth.css';
import { 
  IonPage, 
  IonContent,
  IonLabel, 
  IonButton, 
  IonInput, 
  IonIcon,
  useIonAlert,
  useIonRouter,
  useIonViewWillEnter
} from '@ionic/react';
import { useState } from 'react';
import { arrowBack, eyeOff, eye } from 'ionicons/icons';
import { useLogin } from '../../utils/useLogin';

const Login: React.FC = () => {

  const router = useIonRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [presentAlert] = useIonAlert();
  const [valores, setValores] = useState({
    correo: '',
    password:''
  });

  function navigateTo(...args) {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    router.push(...args);
  }

  useIonViewWillEnter(() => {
    const token = localStorage.getItem('omni_token');
    
    if (token) {
      navigateTo('/App', 'root','replace');
    }
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValores({
      ...valores,
      [name]: value
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLButtonElement).blur(); 
    const { correo, password } = valores;

    if (!correo || !password) {
      presentAlert({
        header: 'Campos requeridos',
        message: 'Por favor, ingresa tu correo y contraseña.',
        buttons: ['OK'],
      });
      return;
    }

    try {
      const data = await useLogin(valores);
      if (data.token) {
        localStorage.setItem('omni_token', data.token);
        navigateTo('/App', 'root', 'replace');
      }
    } 
    catch (error: any) {
      const error_msg = error.response?.data?.message || 'No se pudo conectar con el servidor. Intenta más tarde.';
      
      presentAlert({
        header: 'Error de acceso',
        message: error_msg,
        buttons: ['OK'],
      });
    }
  };


  return (
    <IonPage>
      <Header title="OmniHub" align="center">
        <IonButton onClick={() => navigateTo('/Home', 'back', 'pop')} shape="round">
          <IonIcon 
            slot="icon-only" 
            icon={arrowBack}
          />
        </IonButton>
      </Header>

      <IonContent fullscreen={true} scrollEvents={true}>
        <Header title="OmniHub" type="condense" />

        <div className="container-auth">
          <form className="auth-form">
            <h1>Iniciar Sesion</h1>

            <IonInput 
              className="auth-email"
              name="correo"
              type="email"
              label="Email"
              labelPlacement="floating"
              fill="outline"
              placeholder="Ingresa tu correo" 
              value={valores.correo}           
              onIonInput={handleChange}
            />

            <div className="password-container">
              <IonInput 
                className="auth-password"
                name="password"
                type={showPassword ? 'text' : 'password'} 
                label="Password"
                labelPlacement="floating"
                fill="outline"
                placeholder="Ingresa tu contraseña" 
                value={valores.password}         
                onIonInput={handleChange}
              />
              <IonIcon 
                className="icon-password-auth"
                icon={showPassword ? eye : eyeOff} 
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            <IonButton 
              className="auth-btn-ingresar" 
              shape="round"
              onClick={(e) => {handleLogin(e);}}>
              Ingresar
            </IonButton>

            <IonLabel 
              className='Link' 
              onClick={() => navigateTo('/Register', 'forward', 'push')}> 
              Registrate Ahora 
            </IonLabel>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;