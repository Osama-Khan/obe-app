import {FetchingDataTable} from '@app/components/data-table';
import {ManyCriteria} from '@app/models/criteria';
import {sectionDetailRoute} from '@app/routes/hod.routes';
import sectionService from '@app/services/section.service';
import uiService from '@app/services/ui.service';
import {SectionType} from '@app/types';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {Card, FAB, Text} from 'react-native-paper';
import AddSectionModal from './add-section.modal';

export default function SectionsScreen() {
  const navigation = useNavigation<any>();
  const [updates, setUpdates] = useState(0);
  const [shown, setShown] = useState(false);
  const hideModal = () => setShown(false);
  return (
    <>
      <ScrollView>
        <Card style={{margin: 16, marginBottom: 96}}>
          <FetchingDataTable
            key={updates}
            criteria={new ManyCriteria<SectionType>({relations: ['program']})}
            fetchMethod={c => sectionService.get(c)}
            rowOnPress={section => {
              navigation.navigate(sectionDetailRoute.name, {section});
            }}
            columns={[
              {
                title: 'Program',
                selector: ({item}) => <Text>{item.program!.title}</Text>,
              },
              {
                title: 'Semester',
                selector: 'semester',
              },
              {
                title: 'Name',
                selector: 'name',
              },
            ]}
          />
        </Card>
      </ScrollView>
      <FAB
        icon="plus"
        style={{position: 'absolute', bottom: 16, right: 16}}
        onPress={() => {
          setShown(true);
        }}
      />
      <AddSectionModal
        onAdd={data => {
          hideModal();
          sectionService
            .insert(data)
            .then(() => {
              setUpdates(updates + 1);
              uiService.toastSuccess('Successfully added Section!');
            })
            .catch(() => uiService.toastError('Could not add Section!'));
        }}
        onDismiss={hideModal}
        visible={shown}
      />
    </>
  );
}
