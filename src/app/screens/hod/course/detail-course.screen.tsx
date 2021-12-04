import {DataTable} from '@app/components/data-table';
import Modal from '@app/components/modal';
import {ManyCriteria} from '@app/models/criteria';
import cloService from '@app/services/clo.service';
import ploService from '@app/services/plo.service';
import uiService from '@app/services/ui.service';
import {colors} from '@app/styles';
import {CLOType, CourseType, PLOType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, useWindowDimensions, View} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';
import {
  ActivityIndicator,
  Button,
  Caption,
  Card,
  IconButton,
  Text,
} from 'react-native-paper';
import AddCloView from './add-clo.view';

export const CourseDetailScreen = () => {
  const [selected, setSelected] = useState<CLOType[]>([]);
  const [clos, setClos] = useState<CLOType[]>();
  const [plos, setPlos] = useState<PLOType[]>();
  const [ploUsage, setPloUsage] = useState<(PLOType & {weight: number})[]>();
  const [modalShown, setModalShown] = useState(false);
  const [updates, setUpdates] = useState(0);
  const route = useRoute<any>();
  const width = useWindowDimensions().width;
  const navigation = useNavigation();
  const course: CourseType = route.params!.course;

  useMemo(() => {
    navigation.setOptions({headerTitle: course.title + ' CLOs'});
  }, []);

  useEffect(() => {
    const criteria = new ManyCriteria<CLOType>();
    criteria.addRelation('maps');
    criteria.addCondition('course', course.id);
    cloService
      .get(criteria)
      .then(r => {
        setClos(r.data);
        ploService
          .get()
          .then(r => {
            setPlos(r.data);
          })
          .catch(e => uiService.toastError('Could not fetch PLOs!'));
      })
      .catch(e => uiService.toastError('Could not fetch CLOs!'));
  }, [updates]);

  useEffect(() => {
    const getPloUsage = (id: string) => {
      if (!clos || !plos) return -1;
      const plo = plos.find(p => p.id === id);
      if (!plo) return -1;
      let weight = 0;
      clos.forEach(c => {
        const map = c.maps!.find(map => map.plo!.id === id);
        if (map) weight += map.weight;
      });
      return weight;
    };
    const usages = plos
      ?.map(p => ({...p, weight: getPloUsage(p.id)}))
      .filter(p => p.weight > 0)
      .sort((p, n) => p.number - n.number);
    setPloUsage(usages);
  }, [plos]);

  return (
    <ScrollView>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <IconButton
          icon="delete"
          style={{margin: 8, marginLeft: 'auto'}}
          disabled={selected.length < 1}
          color="red"
          onPress={() => {
            Promise.all(selected.map(s => cloService.delete(s.id)))
              .then(() => {
                uiService.toastSuccess('Records deleted!');
              })
              .catch(e => {
                uiService.toastSuccess('Failed to delete some records!');
              })
              .finally(() => {
                setUpdates(updates + 1);
                setSelected([]);
              });
          }}
        />
        <Button
          icon="plus"
          style={{margin: 8}}
          mode="contained"
          onPress={() => {
            setModalShown(true);
          }}>
          Add
        </Button>
      </View>
      <Card style={{margin: 8}}>
        <DataTable
          data={clos || []}
          columns={[
            {title: 'Title', selector: 'title', weight: 0.4},
            {
              title: 'PLOs',
              selector: ({item}) => {
                const plos =
                  item.maps
                    ?.map((m, i) => `(${m.plo?.title} - ${m.weight}%)`)
                    .join(', ') || 'No PLOs set';
                return <Text>{plos}</Text>;
              },
              weight: 1,
            },
          ]}
          onCheckedChange={c => setSelected(c)}
          checkProperty="id"
        />
      </Card>
      <Caption style={{margin: 16}}>Weights Assigned</Caption>
      <Card style={{margin: 8, overflow: 'hidden'}}>
        {ploUsage ? (
          <ProgressChart
            data={{
              labels: ploUsage!.map(p => 'PLO ' + p.number),
              data: ploUsage!.map(p => p.weight / 100),
            }}
            width={width - 16}
            height={240}
            strokeWidth={8}
            radius={24}
            chartConfig={{
              backgroundGradientFrom: colors.primaryLight,
              backgroundGradientTo: colors.primary,
              color: (o = 1) => `rgb(255,255,255,${o})`,
              labelColor: (o = 1) => `rgb(255,255,255,${o})`,
              propsForLabels: {fontWeight: 'bold'},
            }}
            hideLegend={false}
          />
        ) : (
          <ActivityIndicator />
        )}
      </Card>
      <Modal visible={modalShown} onDismiss={() => setModalShown(false)}>
        {ploUsage ? (
          <AddCloView
            onAdd={() => {
              setUpdates(updates + 1);
              setModalShown(false);
            }}
            plos={ploUsage!}
            courseId={course.id}
          />
        ) : (
          <ActivityIndicator />
        )}
      </Modal>
    </ScrollView>
  );
};
