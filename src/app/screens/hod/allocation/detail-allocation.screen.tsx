import Modal from '@app/components/modal';
import {ManyCriteria} from '@app/models/criteria';
import activityService from '@app/services/activity.service';
import assessmentService from '@app/services/assessment.service';
import cloService from '@app/services/clo.service';
import uiService from '@app/services/ui.service';
import {
  ActivityTypeType,
  AllocationType,
  AssessmentType,
  CLOType,
  ProgramType,
} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Divider,
  List,
  Text,
} from 'react-native-paper';
import AddCLOView from './assessment/add-clo.view';

export const AllocationDetailScreen = () => {
  const [assessments, setAssessments] = useState<AssessmentType[]>();
  const [clos, setClos] = useState<CLOType[]>();
  const [types, setTypes] = useState<ActivityTypeType[]>();
  const [selectedType, setSelectedType] = useState<ActivityTypeType>();
  const [modalShown, setModalShown] = useState(false);
  const [updates, setUpdates] = useState(0);
  const route = useRoute<any>();
  const navigation = useNavigation();
  const allocation: AllocationType & {program: ProgramType} =
    route.params!.allocation;

  const sectionName = `${allocation.program!.title}-${
    allocation.section!.semester
  }${allocation.section!.name}`;

  useMemo(() => {
    navigation.setOptions({headerTitle: sectionName + ' Assessment'});
  }, []);

  useEffect(() => {
    const criteria = new ManyCriteria<AssessmentType>();
    criteria.addRelation('clo');
    criteria.addRelation('type');
    criteria.addCondition('allocation', allocation.id);
    const courseCrit = new ManyCriteria<CLOType>();
    courseCrit.addCondition('course', allocation.course!.id);
    assessmentService
      .get(criteria)
      .then(r => setAssessments(r.data))
      .catch(e => uiService.toastError('Could not fetch Assessments!'));
    cloService
      .get(courseCrit)
      .then(r => setClos(r.data))
      .catch(e => uiService.toastError('Could not fetch CLOs!'));
    activityService
      .getTypes()
      .then(r => setTypes(r.data))
      .catch(e => uiService.toastError('Could not fetch Activity types!'));
  }, [updates]);

  const loaded = types && assessments && clos;
  return loaded ? (
    <>
      <ScrollView>
        {types.map(t => (
          <View style={{backgroundColor: 'white'}}>
            <List.Accordion
              key={t.id}
              title={t.name}
              style={{backgroundColor: 'white'}}>
              {assessments
                .filter(a => a.type.id === t.id)
                .map(a => (
                  <List.Item
                    title={a.clo!.title}
                    description={a.clo!.description}
                    right={() => (
                      <Text
                        style={{
                          fontWeight: 'bold',
                          alignSelf: 'center',
                          marginLeft: 32,
                        }}>
                        {a.weight}%
                      </Text>
                    )}
                  />
                ))}
              <Button
                icon="plus"
                mode="outlined"
                style={{
                  alignSelf: 'center',
                  margin: 8,
                }}
                onPress={() => {
                  setSelectedType(t);
                  setModalShown(true);
                }}>
                Add CLO
              </Button>
            </List.Accordion>
            <Divider />
          </View>
        ))}
      </ScrollView>
      {selectedType && (
        <Modal visible={modalShown} onDismiss={() => setModalShown(false)}>
          <AddCLOView
            onAdd={() => {
              setUpdates(updates + 1);
              setModalShown(false);
            }}
            type={selectedType}
            allocId={allocation.id}
            clos={clos}
          />
        </Modal>
      )}
    </>
  ) : (
    <ActivityIndicator style={{margin: 16, alignSelf: 'center'}} />
  );
};
