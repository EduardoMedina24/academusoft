import {
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,

  IonSelect,
  IonSelectOption
} from '@ionic/react';

import { useState, useEffect } from 'react';
import MainLayout from '../components/MainLayout';

interface Subject {
  id: number;
  name: string;
  teacherId: number;
}

interface User {
  id: number;
  name: string;
  role: 'admin' | 'docente' | 'estudiante';
}

const Subjects: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [name, setName] = useState('');
  const [teacherId, setTeacherId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [editingSubjectId, setEditingSubjectId] = useState<number | null>(null);


  // Cargar docentes
  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      const parsedUsers: User[] = JSON.parse(savedUsers);
      setUsers(parsedUsers.filter(u => u.role === 'docente'));
    }
  }, []);

  // Cargar materias
  useEffect(() => {
    const savedSubjects = localStorage.getItem('subjects');
    if (savedSubjects) {
      setSubjects(JSON.parse(savedSubjects));
    }
     setLoaded(true);
  }, []);

  // Guardar materias
useEffect(() => {
    if (loaded) {
    localStorage.setItem('subjects', JSON.stringify(subjects));
    }
}, [subjects, loaded]);

const addSubject = () => {
  if (!name || !teacherId) {
    alert('Complete todos los campos');
    return;
  }

  if (editingSubjectId) {
    // UPDATE
    setSubjects(
      subjects.map(subject =>
        subject.id === editingSubjectId
          ? { ...subject, name, teacherId }
          : subject
      )
    );
    setEditingSubjectId(null);
  } else {
    // CREATE
    const newSubject: Subject = {
      id: Date.now(),
      name,
      teacherId
    };
    setSubjects([...subjects, newSubject]);
  }

  setName('');
  setTeacherId(null);
};


  const deleteSubject = (id: number) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };
    const editSubject = (subject: Subject) => {
  setEditingSubjectId(subject.id);
  setName(subject.name);
  setTeacherId(subject.teacherId);
};

  const getTeacherName = (id: number) => {
    const teacher = users.find(u => u.id === id);
    return teacher ? teacher.name : 'No asignado';
  };

  return (
    <IonPage>
      <MainLayout title="Materias">
        <IonItem>
          <IonLabel position="stacked">Nombre de la materia</IonLabel>
          <IonInput
            value={name}
            onIonChange={e => setName(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Docente</IonLabel>
          <IonSelect
            value={teacherId}
            onIonChange={e => setTeacherId(e.detail.value)}
          >
            {users.map(teacher => (
              <IonSelectOption key={teacher.id} value={teacher.id}>
                {teacher.name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonButton expand="block" className="ion-margin-top" onClick={addSubject}>
            {editingSubjectId ? 'Actualizar materia' : 'Agregar materia'}

        </IonButton>

        <IonList className="ion-margin-top">
          {subjects.map(subject => (
            <IonItem key={subject.id}>
              <IonLabel>
                <h2>{subject.name}</h2>
                <p>Docente: {getTeacherName(subject.teacherId)}</p>
              </IonLabel>
              <IonButton
  slot="end"
  routerLink={`/subjects/${subject.id}`}
>
  Ver estudiantes
</IonButton>


              <IonButton
                color="danger"
                slot="end"
                onClick={() => deleteSubject(subject.id)}
              >
                Eliminar
              </IonButton>
              <IonButton
  color="warning"
  slot="end"
  onClick={() => editSubject(subject)}
>
  Editar
</IonButton>

            </IonItem>
          ))}
        </IonList>
      </MainLayout>
    </IonPage>
  );
};

export default Subjects;
