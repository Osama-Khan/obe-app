import {DataTable} from '@app/components/data-table';
import Icon from '@app/components/icon';
import {ManyCriteria} from '@app/models/criteria';
import {studentResultsRoute} from '@app/routes/shared.routes';
import sectionService from '@app/services/section.service';
import uiService from '@app/services/ui.service';
import {SectionType, UserType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Card} from 'react-native-paper';

export default function StudentsScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const section = route.params!.section;
  const students = useStudents(section.id);
  return students ? (
    <Card style={{margin: 8}}>
      <DataTable
        data={students}
        rowOnPress={user => {
          navigation.navigate(studentResultsRoute.name, {user});
        }}
        columns={[
          {title: 'ARID#', selector: 'id'},
          {title: 'Name', selector: 'username'},
          {
            title: '',
            selector: () => (
              <Icon name="chevron-right" color="#222" size={22} />
            ),
            numeric: true,
            weight: 0.2,
          },
        ]}
      />
    </Card>
  ) : (
    <ActivityIndicator style={{display: 'flex'}} />
  );
}

const useStudents = (sectionId: string) => {
  const [students, setStudents] = useState<UserType[]>();
  const criteria = new ManyCriteria<SectionType>();
  criteria.addRelation('users');
  useEffect(() => {
    sectionService
      .getOne(sectionId, criteria)
      .then(r => {
        setStudents(r.data.users);
      })
      .catch(() => {
        uiService.toastError('Failed to fetch students!');
      });
  }, []);
  return students;
};
