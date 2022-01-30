import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Button, Caption, Surface, Text} from 'react-native-paper';
import useAssessments from '@app/hooks/useAssessments';
import {AssessmentTable} from '@app/components/Assessment';
import {colors} from '@app/styles';
import assessmentService from '@app/services/assessment.service';
import uiService from '@app/services/ui.service';
import {manageAssessmentRoute} from '@app/routes/shared.routes';

export const AssessmentScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const [saving, setSaving] = useState(0);
  const [updates, setUpdates] = useState(0);
  const update = () => {
    if (route.params?.onChanges) route.params.onChanges();
    setUpdates(new Date().getSeconds());
  };

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
            <View style={{margin: 8}}>
              <AssessmentTable
                assessments={assessments}
                types={types}
                clos={clos}
              />
            </View>
            {!isApproved ? (
              <Surface style={{marginTop: 'auto'}}>
                <Text
                  style={{
                    margin: 8,
                    textAlign: 'center',
                  }}>
                  Assessment is awaiting approval!
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Button
                    icon="check"
                    color={colors.green}
                    mode="contained"
                    disabled={saving !== 0}
                    loading={saving === 1}
                    style={{width: '33%', borderRadius: 0}}
                    onPress={async () => {
                      setSaving(1);
                      try {
                        for (const a of assessments) {
                          await assessmentService.update(a.id, {
                            isApproved: true,
                          });
                        }
                        uiService.toastSuccess('Assessment approved!');
                      } catch (e) {
                        uiService.toastError('Failed to approve assessment!');
                      } finally {
                        setSaving(0);
                        update();
                      }
                    }}>
                    Approve
                  </Button>
                  <Button
                    icon="pencil"
                    color={colors.primary}
                    mode="contained"
                    disabled={saving !== 0}
                    style={{width: '34%', borderRadius: 0}}
                    onPress={() => {
                      navigation.navigate(manageAssessmentRoute.name, {
                        course,
                        onChange: update,
                      });
                    }}>
                    Edit
                  </Button>
                  <Button
                    icon="close"
                    color={colors.red}
                    mode="contained"
                    disabled={saving !== 0}
                    loading={saving === 2}
                    style={{width: '33%', borderRadius: 0}}
                    onPress={async () => {
                      setSaving(2);
                      try {
                        for (const a of assessments) {
                          await assessmentService.delete(a.id);
                        }
                        uiService.toastSuccess('Assessment rejected!');
                      } catch (e) {
                        uiService.toastError('Failed to reject assessment!');
                      } finally {
                        setSaving(0);
                        if (onChanges) onChanges();
                        update();
                      }
                    }}>
                    Reject
                  </Button>
                </View>
              </Surface>
            ) : (
              <></>
            )}
          </>
        ) : (
          <Caption style={{alignSelf: 'center', marginTop: 16}}>
            No Assessment Data
          </Caption>
        )
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};
