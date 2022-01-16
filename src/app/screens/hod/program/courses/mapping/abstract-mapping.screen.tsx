import {Criteria, ManyCriteria} from '@app/models/criteria';
import courseService from '@app/services/course.service';
import programPloService from '@app/services/program-plo.service';
import uiService from '@app/services/ui.service';
import {CourseType, PLOType, ProgramPloType, ProgramType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView} from 'react-native';
import {Switch} from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  Button,
  Caption,
  Card,
  List,
  Text,
} from 'react-native-paper';

const usePlos = (program: ProgramType) => {
  const [plos, setPlos] = useState<(PLOType & {number: number})[]>();
  useEffect(() => {
    const crit = new ManyCriteria<ProgramPloType>();
    crit.addCondition('program', program.id);
    crit.addRelation('plo');
    programPloService.get(crit).then(res => {
      const sorted = res.data
        .map(r => ({...r.plo!, number: r.number}))
        .sort((a, b) => a.number - b.number);
      setPlos(sorted);
    });
  }, []);
  return plos;
};

const useMappings = (course: CourseType) => {
  const [ids, setIds] = useState<string[]>();
  useEffect(() => {
    const crit = new Criteria<CourseType>();
    crit.addRelation('plos');
    courseService.getOne(course.id, crit).then(res => {
      setIds(res.data.plos.map(r => r.id));
    });
  }, []);
  return {ids, setIds};
};

export default function AbstractMappingScreen() {
  const route = useRoute<any>();
  const {program, course} = route.params;
  const plos = usePlos(program);
  const {ids: mapped, setIds: setMapped} = useMappings(course);
  const [saving, setSaving] = useState(false);
  const navigation = useNavigation();

  useMemo(() => {
    navigation.setOptions({
      headerTitle: course.titleShort + ' Abstract Mapping',
    });
  }, []);

  return plos && mapped ? (
    <ScrollView>
      <Card style={{margin: 8}}>
        <Caption style={{margin: 8, marginTop: 8}}>
          Select PLOs to map to {course.title}
        </Caption>
        {plos.map(p => (
          <List.Item
            title={`PLO ${p.number}`}
            description={p.title}
            right={() => (
              <Switch
                value={!!mapped.find(id => id === p.id)}
                disabled={saving}
                onValueChange={() => {
                  if (mapped.find(id => id === p.id)) {
                    setMapped(mapped.filter(id => id !== p.id));
                  } else {
                    setMapped([...mapped, p.id]);
                  }
                }}
              />
            )}
          />
        ))}
        <Button
          icon="floppy"
          onPress={async () => {
            setSaving(true);
            try {
              await courseService.update(course.id, {
                plos: mapped.map(id => ({id})),
              });
              uiService.toastSuccess('Successfully updated mappings!');
            } catch (_) {
              uiService.toastError('Failed to update mapping!');
            } finally {
              setSaving(false);
            }
          }}
          disabled={saving}
          loading={saving}>
          Save
        </Button>
      </Card>
    </ScrollView>
  ) : (
    <ActivityIndicator style={{flexGrow: 1}} />
  );
}
