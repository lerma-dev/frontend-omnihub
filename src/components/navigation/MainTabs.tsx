import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
  useIonRouter,
  IonRouterOutlet,
  useIonViewWillEnter
} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { homeSharp, searchSharp, storefront, informationCircle } from 'ionicons/icons';
import Tab1 from '../../pages/tabs/Tab1';
import Tab2 from '../../pages/tabs/Tab2';
import Tab3 from '../../pages/tabs/Tab3';
import Tab4 from '../../pages/tabs/Tab4';

const MainTabs: React.FC = () => {
  const router = useIonRouter();

  // LÓGICA DE PROTECCIÓN
  useIonViewWillEnter(() => {
    const token = localStorage.getItem('omni_token');
    
    if (!token) {
      router.push('/Home', 'root');
    }
  });

  return (
    <IonTabs>
      {/* Router */}
      <IonRouterOutlet>
        <Route exact path="/App/Tab1">
          <Tab1 />
        </Route>
        <Route exact path="/App/Tab2">
          <Tab2 />
        </Route>
        <Route exact path="/App/Tab3">
          <Tab3 />
        </Route>
        <Route exact path="/App/Tab4">
          <Tab4 />
        </Route>
        {/* Redirección inicial */}
        <Route exact path="/App">
          <Redirect to="/App/Tab1" />
        </Route>
      </IonRouterOutlet>
      {/* Bar Tab */}
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/App/Tab1">
          <IonIcon aria-hidden="true" icon={homeSharp} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/App/Tab2">
          <IonIcon aria-hidden="true" icon={searchSharp} />
          <IonLabel>Busqueda</IonLabel>
        </IonTabButton>
        <IonTabButton  tab="tab3" href="/App/Tab3">
          <IonIcon aria-hidden="true" icon={storefront} />
          <IonLabel>Productos</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab4" href="/App/Tab4">
          <IonIcon aria-hidden="true" icon={informationCircle} />
          <IonLabel>Acerca de</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};
export default MainTabs;