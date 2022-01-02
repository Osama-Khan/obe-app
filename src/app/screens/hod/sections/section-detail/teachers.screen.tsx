import {DataTable} from '@app/components/data-table';
import {AllocationType, UserType} from '@app/types';
import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Card} from 'react-native-paper';

export default function TeachersScreen() {
  const route = useRoute<any>();
  const [teachers, setTeachers] = useState<UserType[]>([]);
  const allocations: AllocationType[] = route.params!.allocations;

  useEffect(() => {
    if (!allocations) return;
    const teachers: UserType[] = [];
    for (const a of allocations) {
      if (!teachers.find(t => t.id === a.user!.id)) {
        teachers.push(a.user!);
      }
    }

    setTeachers(teachers);
  }, [allocations]);

  return teachers ? (
    <Card style={{margin: 8}}>
      <DataTable
        data={teachers}
        columns={[
          {title: 'Name', selector: 'username'},
          {title: 'Email', selector: 'email'},
        ]}
      />
    </Card>
  ) : (
    <ActivityIndicator style={{display: 'flex'}} />
  );
}
