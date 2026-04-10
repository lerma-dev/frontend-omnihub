import { IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { ReactNode } from 'react';
import './Header.css';

interface HeaderProps {
  title?: string;
  type?: 'condense' | 'fixed';
  children?: ReactNode; 
  className?: string;
  id?: string;
  align?: 'start' | 'center' | 'end';
  logo?: string;
  size?: number;
}

const Header: React.FC<HeaderProps> = ({ 
  title, logo, size, type, children, className, id, align = 'start' 
}) => {
  return (
    <IonHeader collapse={type === 'condense' ? 'condense' : undefined}>
      <IonToolbar>
        <div className={`header-wrapper wrapper-${align}`}>
          {
            children && (
              <div className={`header-left-content ${className || ''}`} id={id}>
                {children}
              </div>
            )
          }

          <div className="title-group">
            {
              logo && align === 'start' && (
                <img 
                  src={logo} 
                  alt="logo" 
                  className="header-logo" 
                  style={{ width: `${size}px`, height: `${size}px` }}/>
              )
            }

            <IonTitle 
              size={type === 'condense' ? 'large' : undefined}
              className={`title-${align}`}>
              {title}
            </IonTitle>
          </div>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;