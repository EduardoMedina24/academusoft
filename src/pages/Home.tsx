import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MainLayout from '../components/MainLayout';


import { IonPage} from '@ionic/react';

import './Home.css';

const Home: React.FC = () => {
    const history = useHistory();

  useEffect(() => {
    const isAuth = localStorage.getItem('auth');

    if (!isAuth) {
      history.push('/login');
    }
  }, [history]);

  return (
  <IonPage>
    <MainLayout title="ACADEMUSOFT">
      <p>Bienvenido a la plataforma académica</p>
    </MainLayout>
  </IonPage>
);

};

export default Home;
