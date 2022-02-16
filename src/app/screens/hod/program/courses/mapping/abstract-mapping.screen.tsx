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
  const [locked, setLocked] = useState(false);
  useEffect(() => {
    const crit = new Criteria<CourseType>();
    crit.addRelation('plos');
    crit.addSelect('id');
    courseService.getOne(course.id, crit).then(res => {
      setIds(res.data.plos.map(r => r.id));
      setLocked(res.data.plos.length > 0);
    });
  }, []);
  return {ids, setIds, locked, setLocked};
};

export default function AbstractMappingScreen() {
  const route = useRoute<any>();
  const {program, course} = route.params;
  const onChanges = route.params.onChanges;
  const plos = usePlos(program);
  const {
    ids: mapped,
    setIds: setMapped,
    locked,
    setLocked,
  } = useMappings(course);
  const [saving, setSaving] = useState(false);
  const navigation = useNavigation();

  useMemo(() => {
    navigation.setOptions({
      headerTitle: course.titleShort + ' Abstract Mapping',
    });
  }, []);

  const mappedPlos = plos?.filter(p => mapped?.includes(p.id));
  if (plos && !saving && !locked) {
    let mapped = plos.map(p => p.id);
    const rands = [...Array(3).keys()].map(() =>
      parseInt((Math.random() * 9).toString()),
    );
    mapped = mapped.filter((m, i) => !rands.includes(i));
    setSaving(true);
    courseService
      .addAbstractMapping(course.id, mapped)
      .then(r => {
        uiService.toastSuccess('Successfully created mappings!');
        onChanges && onChanges();
        setLocked(true);
      })
      .catch(e => {
        uiService.toastError('Failed to create mapping!');
      })
      .finally(() => {
        setSaving(false);
      });
  }

  return plos && mapped ? (
    <ScrollView>
      <Card style={{margin: 8}}>
        <Caption style={{margin: 8, marginTop: 8}}>
          {locked
            ? 'This course has already been abstract mapped.'
            : `Select PLOs to map to ${course.title}.`}
        </Caption>
        {(locked ? mappedPlos! : plos).map(p => (
          <List.Item
            title={`PLO ${p.number}`}
            description={p.title}
            right={
              locked
                ? undefined
                : () => (
                    <Switch
                      value={!!mapped.find(id => id === p.id)}
                      disabled={saving || locked}
                      onValueChange={() => {
                        if (mapped.find(id => id === p.id)) {
                          setMapped(mapped.filter(id => id !== p.id));
                        } else {
                          setMapped([...mapped, p.id]);
                        }
                      }}
                    />
                  )
            }
          />
        ))}
        {!locked && (
          <Button
            icon="floppy"
            onPress={async () => {
              setSaving(true);
              try {
                await courseService.addAbstractMapping(course.id, mapped);
                uiService.toastSuccess('Successfully created mappings!');
                onChanges && onChanges();
                setLocked(true);
              } catch (_) {
                uiService.toastError('Failed to create mapping!');
              } finally {
                setSaving(false);
              }
            }}
            disabled={saving || locked || mapped.length === 0}
            loading={saving}>
            Save
          </Button>
        )}
      </Card>
    </ScrollView>
  ) : (
    <ActivityIndicator style={{flexGrow: 1}} />
  );
}
