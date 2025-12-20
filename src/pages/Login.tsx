import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';

const Login: React.FC = () => {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
    if (email === '' || password === '') {
    alert('Por favor complete todos los campos');
    return;
    }
    // Guardar sesión (simulada)
    localStorage.setItem('auth', 'true');

    // Simulación de login correcto
    history.push('/dashboard');

    };

    return (
    <IonPage>
    <IonHeader>
        <IonToolbar>
        <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
    </IonHeader>

    <IonContent className="ion-padding">
        <IonItem>
        <IonLabel position="stacked">Correo</IonLabel>
        <IonInput
    type="email"
    placeholder="correo@ejemplo.com"
    value={email}
    onIonChange={(e) => setEmail(e.detail.value!)}
/>

        </IonItem>

        <IonItem>
        <IonLabel position="stacked">Contraseña</IonLabel>
        <IonInput
    type="password"
    placeholder="********"
    value={password}
    onIonChange={(e) => setPassword(e.detail.value!)}
/>

        </IonItem>

<IonButton
    expand="block"
    className="ion-margin-top"
    onClick={handleLogin}
>
    Entrar
</IonButton>

    </IonContent>
    </IonPage>
    );

};

export default Login;
