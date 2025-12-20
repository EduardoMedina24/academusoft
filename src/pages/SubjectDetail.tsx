import {
  IonPage,
  IonItem,
  IonLabel,
  IonList
} from '@ionic/react';

import { useParams } from 'react-router';
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

const SubjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [subject, setSubject] = useState<Subject | null>(null);
  const [students, setStudents] = useState<User[]>([]);
  
  useEffect(() => {
    // Cargar materia
    const subjects = localStorage.getItem('subjects');
    if (subjects) {
      const parsed: Subject[] = JSON.parse(subjects);
      setSubject(parsed.find(s => s.id === Number(id)) || null);
    }

    // Cargar estudiantes inscritos
    const enrollments = localStorage.getItem('enrollments');
    const users = localStorage.getItem('users');

    if (enrollments && users) {
      const parsedEnrollments: Enrollment[] = JSON.parse(enrollments);
      const parsedUsers: User[] = JSON.parse(users);

      const studentIds = parsedEnrollments
        .filter(e => e.subjectId === Number(id))
        .map(e => e.studentId);

      setStudents(
        parsedUsers.filter(u => studentIds.includes(u.id))
      );
    }
  }, [id]);

  return (
    <IonPage>
      <MainLayout title={`Materia: ${subject?.name || ''}`}>
        <IonList>
          {students.length === 0 && (
            <IonItem>
              <IonLabel>No hay estudiantes inscritos</IonLabel>
            </IonItem>
          )}

          {students.map(student => (
            <IonItem key={student.id}>
              <IonLabel>{student.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </MainLayout>
    </IonPage>
  );
};

export default SubjectDetail;
