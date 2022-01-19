import {
  viewClosRoute,
  assessmentRoute,
  abstractMappingRoute,
} from '@app/routes/hod.routes';
import {colors} from '@app/styles';
import {CourseWithActionType, ProgramType} from '@app/types';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {Card, Title, Caption, Divider} from 'react-native-paper';
import {CourseCardMenu, CourseCardButton} from '.';
import {CourseCardMenuProps} from './CourseCardMenu';

type P = CourseCardMenuProps & {
  course: CourseWithActionType;
  program: ProgramType;
};

export default function CourseCard({course, program, onEdit, onDelete}: P) {
  const navigation = useNavigation<any>();
  return (
    <Card
      key={course.id}
      style={{
        borderTopWidth: 2,
        borderColor: colors.primary,
        margin: 16,
        marginVertical: 8,
        overflow: 'hidden',
      }}>
      <View style={{padding: 8}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Title>{course.titleShort}</Title>
          <CourseCardMenu onEdit={onEdit} onDelete={onDelete} />
        </View>
        <Caption>
          {course.id} | {course.title}
        </Caption>
      </View>
      <Divider />
      <CourseCardButton
        icon="graph"
        text="CLOs"
        onPress={() => {
          navigation.navigate(viewClosRoute.name, {
            course: course,
            program,
          });
        }}
        disabled={course.needsPlos}
        warning={!course.needsPlos && !!course.needsClos}
      />
      <Divider />
      <CourseCardButton
        icon="table-check"
        text="Assessment"
        onPress={() => {
          navigation.navigate(assessmentRoute.name, {
            course: course,
          });
        }}
        disabled={course.needsPlos}
        warning={!course.needsPlos && !!course.needsAssessment}
      />
      <Divider />
      <CourseCardButton
        icon="graphql"
        text="Abstract Mapping"
        onPress={() => {
          navigation.navigate(abstractMappingRoute.name, {
            course: course,
            program,
          });
        }}
        warning={course.needsPlos}
      />
    </Card>
  );
}
