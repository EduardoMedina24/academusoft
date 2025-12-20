import {
  IonPage,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonList
} from '@ionic/react';

import { useEffect, useState } from 'react';
import MainLayout from '../components/MainLayout';

interface User {
  id: number;
  name: string;
  role: 'admin' | 'docente' | 'estudiante';
}

interface Subject {
  id: number;
  name: string;
}

interface Enrollment {
  id: number;
  studentId: number;
  subjectId: number;
}

const Enrollments: React.FC = () => {
  const [students, setStudents] = useState<User[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [studentId, setStudentId] = useState<number | null>(null);
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  // Cargar estudiantes
  useEffect(() => {
    const users = localStorage.getItem('users');
    if (users) {
      const parsed: User[] = JSON.parse(users);
      setStudents(parsed.filter(u => u.role === 'estudiante'));
    }
  }, []);

  // Cargar materias
  useEffect(() => {
    const savedSubjects = localStorage.getItem('subjects');
    if (savedSubjects) {
      setSubjects(JSON.parse(savedSubjects));
    }
  }, []);

  // Cargar inscripciones
  useEffect(() => {
    const saved = localStorage.getItem('enrollments');
    if (saved) {
      setEnrollments(JSON.parse(saved));
    }
    setLoaded(true);
  }, []);

  // Guardar inscripciones
useEffect(() => {
    if (loaded) {
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
    }
}, [enrollments, loaded]);

  const addEnrollment = () => {
    if (!studentId || !subjectId) {
      alert('Seleccione estudiante y materia');
      return;
    }

    const exists = enrollments.some(
      e => e.studentId === studentId && e.subjectId === subjectId
    );

    if (exists) {
      alert('El estudiante ya está inscrito en esta materia');
      return;
    }

    const newEnrollment: Enrollment = {
      id: Date.now(),
      studentId,
      subjectId
    };

    setEnrollments([...enrollments, newEnrollment]);
    setStudentId(null);
    setSubjectId(null);
  };

  const getStudentName = (id: number) =>
    students.find(s => s.id === id)?.name || '';

  const getSubjectName = (id: number) =>
    subjects.find(s => s.id === id)?.name || '';

  return (
    <IonPage>
      <MainLayout title="Inscripciones">
        <IonItem>
          <IonLabel position="stacked">Estudiante</IonLabel>
          <IonSelect value={studentId} onIonChange={e => setStudentId(e.detail.value)}>
            {students.map(s => (
              <IonSelectOption key={s.id} value={s.id}>
                {s.name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Materia</IonLabel>
          <IonSelect value={subjectId} onIonChange={e => setSubjectId(e.detail.value)}>
            {subjects.map(s => (
              <IonSelectOption key={s.id} value={s.id}>
                {s.name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonButton expand="block" className="ion-margin-top" onClick={addEnrollment}>
          Inscribir estudiante
        </IonButton>

        <IonList className="ion-margin-top">
          {enrollments.map(e => (
            <IonItem key={e.id}>
              <IonLabel>
                <h2>{getStudentName(e.studentId)}</h2>
                <p>Materia: {getSubjectName(e.subjectId)}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </MainLayout>
    </IonPage>
  );
};

export default Enrollments;
