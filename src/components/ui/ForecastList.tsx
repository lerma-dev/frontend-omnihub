import { waterOutline, caretDown, caretUp } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import './styles/ForecastList.css';
import { Forecast } from '../../models/weather.model';

const ForecastList: React.FC<{forecast: Forecast}> = ({forecast}) => {
  const fechaFormateada = new Date(forecast.fecha.replace(" ", "T"));

  return (
    <div className="forecast-item">
      <span className="day-name">
        {fechaFormateada.toLocaleDateString('es-MX', { weekday: 'short' })}
      </span>
      <img src={forecast.icon} alt="icono-clima" className="mini-icon" />
      <span className="day-temp">{forecast.temp}°</span>
      <div className="container-temps">
        <span className="temp-min">
          {forecast.min}°
          <IonIcon icon={caretDown} color="danger" />
        </span>
        <span className="temp-max">
          {forecast.max}°
          <IonIcon icon={caretUp} color='success' />
        </span>
      </div>
      <div className="container-hums">
        <span className="day-humidity">
          <IonIcon icon={waterOutline} className="icon-hum" />
          {forecast.humedad}%
        </span>
      </div>
      <span className="day-desc">{forecast.desc}</span>
    </div>
  );
};
export default ForecastList;