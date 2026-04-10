// Register.tsx
import Header from '../../components/layouts/Header';
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
} from '@ionic/react'
import { arrowBack, eyeOff, eye } from 'ionicons/icons';
import { useState } from 'react';
import { useRegister } from '../../utils/useRegister';

const Register: React.FC = () => {
  const router = useIonRouter();
  const [presentAlert] = useIonAlert();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [valores, setValores] = useState({
    nombre: '',
    apellido: '',
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

  const handleConfirmPass = (e: any) => {
    const value = e.target.value;
    setConfirmarPassword(value);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValores({
      ...valores,
      [name]: value
    });
  };

  const handleRegister = async () => {
    const {nombre, apellido, correo, password} = valores;
    //confirmar contraseñas
    if(password !== confirmarPassword){
      presentAlert({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['OK'],
      });
      return;
    }

    //confirmar que todos los campos esten llenos
    if (!nombre || !apellido || !correo || !password) {
      presentAlert({
        header: 'Campos requeridos',
        message: 'Por favor, completa todos los campos.',
        buttons: ['OK'],
      });
      return;
    }

    //registrar
    try {
      const data = await useRegister(valores);
      if (data) {
        const sucess_msg = data.message;
        presentAlert({
          header: 'Registro Exitoso',
          message: sucess_msg,
          buttons: [{
            text: 'OK',
            handler: () => { navigateTo('/Login', 'root', 'replace'); }
          }],
        });
      }
    } 
    catch (error: any) {
      const error_msg = error.response?.data?.message || 'Error al conectar con el servidor';
      
      presentAlert({
        header: 'Error de acceso',
        message: error_msg,
        buttons: ['OK'],
      });
    }
  }

  return (
    <IonPage>
      <Header title="OmniHub" align="center">
        <IonButton 
          onClick={() => navigateTo('/Home', 'back', 'pop')} shape="round"
          className="refresh">
          <IonIcon 
            slot="icon-only" 
            icon={arrowBack}
          />
        </IonButton>
      </Header>
      <IonContent>
        <Header title="OmniHub" type="condense" />

        <div className="container-auth">
        <form className="auth-form register-form">
            <h1>Registrate Ahora</h1>

            <IonInput 
              className="auth-nombre"
              name="nombre"
              type="text"
              label="Name"
              labelPlacement="floating"
              fill="outline"
              placeholder="Escribe tu nombre" 
              value={valores.nombre}
              onIonInput={handleChange}
            />

            <IonInput 
              className="auth-apellido"
              name="apellido"
              type="text"
              label="Last Name"
              labelPlacement="floating"
              fill="outline"
              placeholder="Escribe tu apellido" 
              value={valores.apellido}
              onIonInput={handleChange}
            />

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

            <div className="password-container register">
              <IonInput 
                className="auth-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                labelPlacement="floating"
                fill="outline"
                placeholder="Crea una contraseña" 
                value={valores.password}
                onIonInput={handleChange}
              />

              <IonInput 
                className="auth-password"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'} 
                label="Repeat Password"
                labelPlacement="floating"
                fill="outline"
                placeholder="Repite la contraseña"
                value={confirmarPassword}
                onIonInput={handleConfirmPass} 
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
              onClick={handleRegister}>
              Crear Cuenta
            </IonButton>

            <IonLabel 
              className='Link' 
              onClick={() => navigateTo('/Login', 'back', 'pop')}> 
              Iniciar Sesion
            </IonLabel>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;