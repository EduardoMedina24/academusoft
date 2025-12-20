import {
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

import MainLayout from '../components/MainLayout';

const Dashboard: React.FC = () => {
    const history = useHistory();

    return (
    <IonPage>
    <MainLayout title="Panel Principal">
        <IonGrid>
        <IonRow>
            <IonCol size="12" sizeMd="6">
            <IonCard button onClick={() => history.push('/users')}>

                <IonCardHeader>
                <IonCardTitle>Usuarios</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                Gestión de usuarios del sistema
                </IonCardContent>
            </IonCard>
            </IonCol>

            <IonCol size="12" sizeMd="6">
            <IonCard button onClick={() => history.push('/Subjects')}>
                <IonCardHeader>
                <IonCardTitle>Materias</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                Administración de asignaturas
                </IonCardContent>
            </IonCard>
            </IonCol>

            <IonCol size="12" sizeMd="6">
            <IonCard>
                <IonCardHeader>
                <IonCardTitle>Horarios</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                Organización de horarios académicos
                </IonCardContent>
            </IonCard>
            </IonCol>

            <IonCol size="12" sizeMd="6">
            <IonCard>
                <IonCardHeader>
                <IonCardTitle>Agenda</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                Seguimiento de actividades y fechas
                </IonCardContent>
            </IonCard>
            </IonCol>
        </IonRow>
        </IonGrid>
    </MainLayout>
    </IonPage>
    );
};

export default Dashboard;
