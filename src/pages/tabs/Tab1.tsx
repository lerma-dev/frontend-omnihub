import Header from '../../components/layouts/Header';
import './styles/Tab1.css';
// componentes ionic
import { 
  IonPage, IonContent, IonButton, IonIcon, 
  IonCard, IonCardContent, IonText, IonSpinner,
  IonImg, IonLabel 
} from '@ionic/react';
// iconos de ionic 
import { 
  refresh, thermometerOutline, waterOutline,
  calendarOutline, leafOutline, partlySunnyOutline
} from 'ionicons/icons';
// hooks
import { useEffect } from "react";
import { useWeather } from '../../utils/useWeather';
import climaLogo from '../../assets/clima.png';
import ForecastList from '../../components/ui/ForecastList';
import Title from '../../components/ui/Title';

const Tab1: React.FC = () => {
  const { clima, loading, error, fetchWeather } = useWeather();

  useEffect(() => {
    fetchWeather();
  }, []);
  
  return (
    <IonPage>
      <Header title="Clima" logo={climaLogo} size={50}>
        {
          !loading && clima && (
            <IonButton 
              onClick={fetchWeather} 
              shape="round" 
              className="refresh"> 
              <IonIcon slot="icon-only" icon={refresh} /> 
            </IonButton>
          )
        }
      </Header>

      <IonContent className="ion-padding">
        <Header title="Clima" type="condense" />

        {/* Estado de carga */
          loading && (
            <div className="center">
              <IonSpinner name="crescent" className="spinner" />
              <p>Consultando Clima...</p>
            </div>
          )
        }

        <div className="main-weather-wrapper">
          {/* Clima Actual */
            !loading && clima && (
              <div className="current-weather-container">
                <Title name="Clima Actual" icon={partlySunnyOutline} />
                <IonCard className="main-card">
                  <IonCardContent className="ion-text-center">
                    <div className="current-info">
                      <h1 className="temp-current">{clima.actual.temp}°</h1>
                      <p className="description">{clima.actual.descripcion}</p>
                      <p className="city">{clima.ciudad}, {clima.pais}</p>
                      <img src={clima.actual.icono} alt="clima" className="current-icon" />
                    </div>
                    <div className="extra-data">
                      <span>
                        <IonIcon color="primary" icon={waterOutline} /> 
                        {clima.actual.humedad}%
                      </span>
                      <span>
                        <IonIcon color="success" icon={leafOutline} /> 
                        {clima.actual.viento} km/h
                      </span>
                    </div>
                  </IonCardContent>
                </IonCard>
              </div>
            )
          }

          {/* Pronóstico */
            !loading && clima && (
              <div className="forecast-container">
                <Title name="Pronostico de la semana" icon={calendarOutline} />
                <div className="forecast-list">
                  {clima.proximos_dias.map((dia: any, index: number) => (
                    <ForecastList
                      key={index}
                      forecast={{
                        fecha: dia.fecha,
                        temp: dia.temp,
                        max: dia.temp_max,
                        min: dia.temp_min,
                        icon: dia.icono,
                        desc: dia.descripcion,
                        humedad: dia.humedad
                      }}
                    />
                  ))}
                </div>
              </div>
            )
          }
        </div>

        {/* Manejo de errores visual */
          error && (
            <div className="center">
              <IonText color="danger"><h4>{error}</h4></IonText>
              <IonButton fill="clear" onClick={fetchWeather}>Reintentar</IonButton>
            </div>
          )
        }
      </IonContent>
    </IonPage>
  );
};
export default Tab1;
