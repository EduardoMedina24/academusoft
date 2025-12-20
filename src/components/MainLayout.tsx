import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

interface Props {
    title: string;
    children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ title, children }) => {
    const history = useHistory();

    const logout = () => {
    localStorage.removeItem('auth');
    history.push('/login');
    };

    return (
    <>
    <IonHeader>
        <IonToolbar>
        <IonTitle>{title}</IonTitle>
        <IonButtons slot="end">
            <IonButton routerLink="/subjects">Materias</IonButton>
            <IonButton routerLink="/enrollments">Inscripciones</IonButton>

            <IonButton onClick={logout} color="danger">
            Cerrar sesión
            </IonButton>
        </IonButtons>
        </IonToolbar>
    </IonHeader>

    <IonContent className="ion-padding">
        {children}
    </IonContent>
    
    </>


    );
};

export default MainLayout;