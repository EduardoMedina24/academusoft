import {
    IonPage,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonList,

} from '@ionic/react';
import {
  IonSelect,
  IonSelectOption
} from '@ionic/react';


import { useState, useEffect } from 'react';
import MainLayout from '../components/MainLayout';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'docente' | 'estudiante';
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [role, setRole] = useState<'admin' | 'docente' | 'estudiante'>('estudiante');


    const [editingUserId, setEditingUserId] = useState<number | null>(null);
useEffect(() => {
    const savedUsers = localStorage.getItem('users');
  if (savedUsers) {
    setUsers(JSON.parse(savedUsers));
  }
  setLoaded(true);
}, []);


useEffect(() => {
    if (loaded) {
    localStorage.setItem('users', JSON.stringify(users));
    }
}, [users, loaded]);


const addUser = () => {
    if (name === '' || email === '') {
    alert('Complete todos los campos');
    return;
    }

    if (editingUserId) {
    // UPDATE
    setUsers(
    users.map(user =>
        user.id === editingUserId
        ? { ...user, name, email, role }

        : user
    )
    );
    setEditingUserId(null);
    } else {
    // CREATE
    const newUser: User = {
    id: Date.now(),
    name,
    email,
    role
};

    setUsers([...users, newUser]);
    }

    setName('');
    setEmail('');
    setRole('estudiante');

};


    const deleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
    };

    const editUser = (user: User) => {
    setEditingUserId(user.id);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);

};




    return (
    <IonPage>
    <MainLayout title="Usuarios">
        <IonItem>
        <IonLabel position="stacked">Nombre</IonLabel>
        <IonInput
            value={name}
            onIonChange={e => setName(e.detail.value!)}
        />
        </IonItem>

        <IonItem>
        <IonLabel position="stacked">Correo</IonLabel>
        <IonInput
            type="email"
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
        />
        </IonItem>
        <IonItem>
  <IonLabel position="stacked">Rol</IonLabel>
  <IonSelect
    value={role}
    onIonChange={e => setRole(e.detail.value)}
  >
    <IonSelectOption value="admin">Administrador</IonSelectOption>
    <IonSelectOption value="docente">Docente</IonSelectOption>
    <IonSelectOption value="estudiante">Estudiante</IonSelectOption>
  </IonSelect>
</IonItem>


        <IonButton expand="block" onClick={addUser} className="ion-margin-top">
        {editingUserId ? 'Actualizar usuario' : 'Agregar usuario'}

        </IonButton>

        <IonList className="ion-margin-top">
        {users.map(user => (
            <IonItem key={user.id}>
            <IonLabel>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p><strong>Rol:</strong> {user.role}</p>
</IonLabel>

            <IonButton
                color="warning"
                slot="end"
                onClick={() => editUser(user)}
>
                Editar
            </IonButton>


            <IonButton
                color="danger"
                slot="end"
                onClick={() => deleteUser(user.id)}
            >
                Eliminar
            </IonButton>
            </IonItem>
        ))}
        </IonList>
    </MainLayout>
    </IonPage>
    );
};

export default Users;
