import {DataTable} from '@app/components/data-table';
import {ManyCriteria} from '@app/models/criteria';
import {sectionDetailRoute} from '@app/routes/hod.routes';
import sectionService from '@app/services/section.service';
import uiService from '@app/services/ui.service';
import {SectionType} from '@app/types';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {ActivityIndicator, Card, FAB, Text} from 'react-native-paper';
import AddSectionModal from './add-section.modal';

export default function SectionsScreen() {
  const navigation = useNavigation<any>();
  const [sections, setSections] = useState<SectionType[]>();
  const [shown, setShown] = useState(false);
  const hideModal = () => setShown(false);

  useEffect(() => {
    const crit = new ManyCriteria<SectionType>({relations: ['program']});
    sectionService
      .get(crit)
      .then(r => {
        setSections(r.data);
      })
      .catch(() => uiService.toastError('Could not fetch sections!'));
  }, []);

  return (
    <>
      <ScrollView>
        <Card style={{margin: 16, marginBottom: 96}}>
          {sections ? (
            <DataTable
              data={sections}
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
          ) : (
            <ActivityIndicator style={{margin: 16, alignSelf: 'center'}} />
          )}
        </Card>
      </ScrollView>
      <FAB
        icon="plus"
        style={{position: 'absolute', bottom: 16, right: 16}}
        disabled={!sections}
        loading={!sections}
        onPress={() => {
          setShown(true);
        }}
      />
      <AddSectionModal
        onAdd={data => {
          hideModal();
          sectionService
            .insert(data)
            .then(s => {
              setSections([...sections!, s.data]);
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
