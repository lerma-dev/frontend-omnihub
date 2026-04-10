import { IonIcon, IonLabel } from '@ionic/react';
import './styles/Title.css';

export interface Title {
  name: string;
  icon: any;
}

const Title: React.FC<Title> = ({name, icon}) => {
  return (
    <div className="weather-title">
      <IonIcon icon={icon} className="icon-clima" />
      <IonLabel className="title-clima">{name}</IonLabel>
    </div>
  );
};

export default Title;