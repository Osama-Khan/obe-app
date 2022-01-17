import {CLOList} from '@app/components/CloList';
import Icon from '@app/components/icon';
import {IconMessageView} from '@app/components/icon-message-view';
import {ConfirmModal} from '@app/components/modal';
import {addCloRoute} from '@app/routes/hod.routes';
import cloService from '@app/services/clo.service';
import objectiveMapService from '@app/services/objective-map.service';
import uiService from '@app/services/ui.service';
import {colors} from '@app/styles';
import {CLOType, CourseType, ProgramType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {FlatList, useWindowDimensions, View} from 'react-native';
import {
  ActivityIndicator,
  Badge,
  Caption,
  Card,
  Divider,
  FAB,
  IconButton,
  List,
  Text,
  Title,
} from 'react-native-paper';

export default function ViewClosScreen() {
  const [clos, setClos] = useState<CLOType[]>();
  const [deleting, setDeleting] = useState<CLOType>();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const course: CourseType = route.params!.course;
  const program: ProgramType = route.params!.program;
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

  const gotoAdd = () => {
    if (!clos) return;
    navigation.navigate(addCloRoute.name, {
      course,
      program,
      clos,
      onAdd: (clo: CLOType) => {
        setClos(sortClos([...clos, clo]));
      },
    });
  };

  return clos ? (
    <>
      <CLOList
        clos={clos}
        onDelete={item => {
          setDeleting(item);
        }}
        ListEmptyComponent={
          <View style={{height, justifyContent: 'center'}}>
            <IconMessageView
              icon="graph"
              caption="This course has no CLOs. Start by adding one."
              title="No CLOs"
              btnProps={{
                icon: 'plus',
                text: 'Add CLO',
                action: gotoAdd,
              }}
            />
          </View>
        }
      />
      <FAB
        icon="plus"
        style={{position: 'absolute', bottom: 16, right: 16}}
        onPress={gotoAdd}
      />
      {deleting && (
        <ConfirmModal
          title={'Delete CLO?'}
          description={`Are you sure you want to delete the clo "${deleting.title}"?`}
          visible={!!deleting}
          positiveButton={{
            onPress: () => {
              cloService
                .delete(deleting!.id)
                .then(res => {
                  uiService.toastSuccess('CLO deleted!');
                  setClos(clos.filter(c => c.id !== res.data.id));
                })
                .catch(() => {
                  uiService.toastError('Could not delete CLO!');
                });
              setDeleting(undefined);
            },
          }}
          negativeButton={{
            onPress: () => {
              setDeleting(undefined);
            },
          }}
          onDismiss={() => {
            setDeleting(undefined);
          }}
        />
      )}
    </>
  ) : (
    <ActivityIndicator style={{flexGrow: 1, alignSelf: 'center'}} />
  );
}

const sortClos = (clos: CLOType[]) => clos.sort((a, b) => a.number - b.number);
