import {FetchingDataTable} from '@app/components/data-table';
import {ConfirmModal} from '@app/components/modal';
import {addPloRoute, editPloRoute} from '@app/routes/hod.routes';
import ploService from '@app/services/plo.service';
import uiService from '@app/services/ui.service';
import {PLOType} from '@app/types';
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Button, Text, Card, IconButton} from 'react-native-paper';

export default function ViewPLOScreen() {
  const [selected, setSelected] = useState<PLOType[]>([]);
  const [modalShown, setModalShown] = useState(false);
  const [updates, setUpdates] = useState(0);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener('focus', () => {
      setUpdates(updates + 1);
    });
  }, []);
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <IconButton
          icon="delete"
          style={{margin: 8, marginLeft: 'auto'}}
          disabled={selected.length < 1}
          color="red"
          onPress={() => {
            setModalShown(true);
          }}
        />
        <IconButton
          icon="pencil"
          style={{margin: 8}}
          disabled={selected.length !== 1}
          color="#0af"
          onPress={() => {
            navigation.navigate(editPloRoute.name, {
              plo: selected[0],
            });
          }}
        />
        <Button
          icon="plus"
          style={{margin: 8}}
          mode="contained"
          onPress={() => navigation.navigate(addPloRoute.name)}>
          Add
        </Button>
      </View>
      <Card style={{margin: 8}} elevation={8}>
        <FetchingDataTable
          key={updates}
          fetchMethod={() => ploService.get()}
          checkProperty="id"
          onCheckedChange={setSelected}
          columns={[
            {
              title: 'Name',
              selector: ({item}) => <Text>PLO {item.number}</Text>,
              weight: 0.3,
            },
            {
              title: 'Description',
              selector: ({item}) => (
                <Text onPress={() => Alert.alert(item.title, item.description)}>
                  {item.title}: {item.description}
                </Text>
              ),
            },
          ]}
          itemsPerPage={5}
        />
      </Card>
      <ConfirmModal
        title="Delete PLOs?"
        description={`Are you sure you want to delete the PLOs: [${selected
          .map(s => s.number)
          .join(', ')}]?`}
        visible={modalShown}
        positiveButton={{
          onPress: () => {
            const prms = Promise.all(
              selected.map(s => ploService.delete(s.id)),
            );
            prms
              .then(res => {
                uiService.toastSuccess('PLOs deleted!');
                setSelected([]);
                setUpdates(updates + 1);
              })
              .catch(e => {
                uiService.toastError('Could not delete some plos!');
              })
              .finally(() => {
                setModalShown(false);
              });
          },
        }}
        negativeButton={{
          onPress: () => {
            setModalShown(false);
          },
        }}
        onDismiss={() => {
          setModalShown(false);
        }}
      />
    </>
  );
}
