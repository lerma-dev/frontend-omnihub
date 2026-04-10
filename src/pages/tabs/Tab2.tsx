import Header from '../../components/layouts/Header';
import './styles/Tab2.css';
import { 
  IonPage, IonContent, IonButton, IonIcon, IonCard, IonCardContent,
  IonText, IonSpinner, IonLabel, IonList, IonItem, IonThumbnail 
} from '@ionic/react';
import { refresh, search } from 'ionicons/icons';
import { usePlaces } from '../../utils/usePlaces';
import { useEffect } from 'react';
import Mapa from '../../components/ui/Mapa'; 
import mapaLogo from '../../assets/mapa.png'

const Tab2: React.FC = () => {
  const { places, loading, error, fetchPlaces, userLocation } = usePlaces();
  
  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <IonPage>
      <Header title="Búsqueda" logo={mapaLogo} size={40}>
        {
          !loading && places && (
            <IonButton 
              onClick={fetchPlaces} 
              shape="round" 
              color="secondary"> 
              <IonIcon slot="icon-only" icon={refresh} /> 
            </IonButton>
          )
        }
      </Header>

      <IonContent fullscreen className="ion-padding">
        <Header title="Búsqueda" type="condense" />

        <Mapa userLocation={userLocation} places={places} />
        <IonText color="primary" className="text">
          <h2>Lugares Cercanos</h2>
        </IonText>

        {/* Estado de carga */
          loading && (
            <div className="center-btn-places">
              <IonSpinner name="crescent" color="primary" />
              <p>Consultando Lugares...</p>
            </div>
          )
        }

        {/* Estado de errores */
          error && places && (
            <IonText color="danger">
              <p className="text">{error}</p>
            </IonText>
          )
        }

        {/* Lugares Cercanos */
          !loading && !error && places && (
            <div className="place-card-grid">
              {places.map((place: any) => (
                <IonCard className="place-card" key={place.fsq_place_id}>
                  <IonCardContent>
                    <IonThumbnail>
                      <img 
                        src={place.categories[0]?.icon?.prefix + '64' + place.categories[0]?.icon?.suffix} 
                        alt="icon" 
                      />
                    </IonThumbnail>
                    
                    <IonLabel>
                      <h2>{place.name}</h2>
                      <p>{place.location.address || 'Sector Ciudad Juárez'}</p>
                      <span className="place-distance">
                        {place.distance}m de distancia
                      </span>
                    </IonLabel>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
          )
        }
      </IonContent>
    </IonPage>
  );
};

export default Tab2;