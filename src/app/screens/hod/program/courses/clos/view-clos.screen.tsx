import {CLOList} from '@app/components/CloList';
import {IconMessageView} from '@app/components/icon-message-view';
import {editCloRoute} from '@app/routes/hod.routes';
import objectiveMapService from '@app/services/objective-map.service';
import uiService from '@app/services/ui.service';
import {CLOType, CourseType, ProgramType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {useWindowDimensions, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

export default function ViewClosScreen() {
  const [clos, setClos] = useState<CLOType[]>();
  const [updates, setUpdates] = useState(0);
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const course: CourseType = route.params!.course;
  const program: ProgramType = route.params!.program;
  const onChanges: () => void = route.params!.onChanges;
  const height = useWindowDimensions().height - 92;

  useMemo(() => {
    navigation.setOptions({headerTitle: course.titleShort + ' CLOs'});
    objectiveMapService
      .getCourseMaps(program.id, course.id)
      .then(res => {
        const maps = res.data;
        let clos: CLOType[] = [];
        for (const m of maps) {
          let ind = clos.findIndex(c => c.id === m.clo!.id);
          if (ind === -1) {
            ind = clos.length;
            clos.push(m.clo as CLOType);
          }
          if (!clos[ind].maps) clos[ind].maps = [];
          clos[ind].maps!.push({...m, clo: undefined});
        }

        setClos(sortClos(clos as CLOType[]));
      })
      .catch(() => uiService.toastError('Failed to fetch CLOs'));
  }, []);

  const gotoEdit = (clo: CLOType) => {
    if (!clos) return;
    navigation.navigate(editCloRoute.name, {
      program,
      clo,
      onEdit: (clo: CLOType) => {
        const idx = clos.findIndex(c => c.id === clo.id);
        clos[idx] = clo;
        setClos(sortClos(clos));
        if (onChanges) onChanges();
        setUpdates(new Date().getSeconds());
      },
    });
  };

  return clos ? (
    <>
      <CLOList
        key={updates}
        clos={clos}
        onEdit={gotoEdit}
        ListEmptyComponent={
          <View style={{height, justifyContent: 'center'}}>
            <IconMessageView
              icon="graph"
              caption="This course has no CLOs."
              title="No CLOs"
            />
          </View>
        }
      />
    </>
  ) : (
    <ActivityIndicator style={{flexGrow: 1, alignSelf: 'center'}} />
  );
}

const sortClos = (clos: CLOType[]) => clos.sort((a, b) => a.number - b.number);
