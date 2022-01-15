import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Caption, FAB, Text} from 'react-native-paper';
import useAssessments from '@app/hooks/useAssessments';
import {AssessmentTable} from '@app/components/Assessment';
import {manageAssessmentRoute} from '@app/routes/teacher.routes';
import {colors} from '@app/styles';

export const AssessmentScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [updates, setUpdates] = useState(0);
  const update = () => setUpdates(updates + 1);

  const course = route.params.course;
  const {assessments, types, clos} = useAssessments(course.id, [updates]);

  const isLoaded = assessments && clos && types;
  const isAssessed = isLoaded && assessments.length > 0;
  const isApproved = isLoaded && isAssessed && assessments[0].isApproved;

  return (
    <View style={{flexGrow: 1}}>
      {isLoaded ? (
        isAssessed ? (
          <>
            {!isApproved ? (
              <Text style={{backgroundColor: colors.yellow, padding: 8}}>
                Assessment is awaiting approval by HOD!
              </Text>
            ) : (
              <></>
            )}
            <View style={{margin: 8}}>
              <AssessmentTable
                assessments={assessments}
                types={types}
                clos={clos}
              />
            </View>
          </>
        ) : (
          <Caption style={{alignSelf: 'center', marginTop: 16}}>
            No Assessment Data
          </Caption>
        )
      ) : (
        <ActivityIndicator />
      )}
      <FAB
        icon={isAssessed ? 'pencil' : 'plus'}
        disabled={!isLoaded || isApproved}
        loading={!isLoaded}
        style={{position: 'absolute', bottom: 16, right: 16}}
        onPress={() => {
          navigation.navigate(manageAssessmentRoute.name, {
            course,
            onChange: update,
          });
        }}
      />
    </View>
  );
};
