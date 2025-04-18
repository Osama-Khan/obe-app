import Modal from '@app/components/modal';
import {ManyCriteria} from '@app/models/criteria';
import activityService from '@app/services/activity.service';
import assessmentService from '@app/services/assessment.service';
import cloService from '@app/services/clo.service';
import uiService from '@app/services/ui.service';
import {colors} from '@app/styles';
import {
  ActivityTypeType,
  AssessmentType,
  CLOType,
  CourseType,
} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useEffect, useMemo, useState} from 'react';
import {FlatList} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Caption,
  Card,
  Divider,
  List,
  Text,
} from 'react-native-paper';
import AddCLOView from './add-clo.view';

export const ManageAssessmentScreen = () => {
  const [assessments, setAssessments] = useState<AssessmentType[]>();
  const [clos, setClos] = useState<CLOType[]>();
  const [types, setTypes] = useState<ActivityTypeType[]>();
  const [selectedType, setSelectedType] = useState<ActivityTypeType>();
  const [modalShown, setModalShown] = useState(false);
  const [updates, setUpdates] = useState(0);
  const route = useRoute<any>();
  const navigation = useNavigation();
  const course: CourseType = route.params!.course!;

  const getCloTotal = (id: string) => {
    if (!assessments || assessments.length === 0) return 0;
    const matches = assessments.filter(a => a.clo.id === id);
    if (matches.length === 0) return 0;
    return matches.map(clo => clo.weight).reduce((a, b) => a + b);
  };

  useMemo(() => {
    navigation.setOptions({headerTitle: course.titleShort + ' Assessment'});
    navigation.addListener('beforeRemove', () => {
      // Updates previous screen
      route.params!.onChange && route.params!.onChange();
    });
  }, []);

  useEffect(() => {
    const criteria = new ManyCriteria<AssessmentType>();
    criteria.addRelation('clo');
    criteria.addRelation('type');
    criteria.addCondition('course', course!.id);
    const courseCrit = new ManyCriteria<CLOType>();
    courseCrit.addCondition('course', course!.id);
    courseCrit.addRelation('maps');
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
      .catch(e => uiService.toastError('Could not fetch Exam types!'));
  }, [updates]);

  const loaded = types && assessments && clos;
  const noClos = clos ? clos.length === 0 : false;
  const invalidPartial = clos
    ? clos.some(c => c.maps!.some(m => m.weight === 0))
    : false;
  const invalidFull =
    invalidPartial &&
    (clos ? clos.every(c => c.maps!.every(m => m.weight === 0)) : false);
  return loaded ? (
    <>
      {noClos || invalidPartial ? (
        <Caption
          style={{
            textAlign: 'center',
            color: 'white',
            marginVertical: 0,
            backgroundColor:
              invalidPartial && !invalidFull ? colors.yellow : colors.red,
          }}>
          {noClos
            ? 'This course has no CLOs.'
            : `${
                invalidFull ? 'The' : 'Some of the'
              } CLOs of this course need weights from HOD.`}
        </Caption>
      ) : (
        <></>
      )}
      <List.AccordionGroup>
        <FlatList
          renderItem={({item: t}) => (
            <Card
              style={{
                margin: 16,
                marginVertical: 8,
                overflow: 'hidden',
              }}>
              <List.Accordion
                key={t.id}
                id={t.id}
                title={t.name}
                style={{backgroundColor: '#f8f8f8'}}>
                {assessments
                  .filter(a => a.type.id === t.id)
                  .map(a => (
                    <List.Item
                      title={`CLO ${a.clo!.number}`}
                      description={`${a.clo!.title}: ${a.clo!.description}`}
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
                  disabled={noClos || invalidFull}
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
            </Card>
          )}
          data={types}
        />
      </List.AccordionGroup>
      {selectedType && (
        <Modal visible={modalShown} onDismiss={() => setModalShown(false)}>
          <AddCLOView
            onAdd={() => {
              setUpdates(updates + 1);
              setModalShown(false);
            }}
            type={selectedType}
            courseId={course.id}
            clos={clos
              .filter(c => c.maps!.every(m => m.weight > 0))
              .map(c => ({...c, weight: getCloTotal(c.id)}))}
          />
        </Modal>
      )}
    </>
  ) : (
    <ActivityIndicator style={{margin: 16, alignSelf: 'center'}} />
  );
};
