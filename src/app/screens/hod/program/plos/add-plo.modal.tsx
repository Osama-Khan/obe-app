import ListSelect from '@app/components/list-select';
import Modal from '@app/components/modal';
import ploService from '@app/services/plo.service';
import programPloService from '@app/services/program-plo.service';
import uiService from '@app/services/ui.service';
import {colors} from '@app/styles';
import {PLOType, ProgramPloType, ProgramType} from '@app/types';
import React, {useEffect, useState} from 'react';
import {ModalProps, StyleSheet, View} from 'react-native';
import {
  Button,
  TextInput,
  Caption,
  Divider,
  Title,
  ActivityIndicator,
} from 'react-native-paper';

type P = ModalProps & {
  onAdd: (plo: Partial<PLOType>, number: number) => void;
  program: ProgramType;
  maps: ProgramPloType[];
};
export default function AddPloModal({onAdd, maps, program, ...props}: P) {
  const [tab, setTab] = useState(0);
  const [plos, setPlos] = useState<PLOType[]>();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    ploService.get().then(r => setPlos(r.data));
  }, []);

  return (
    <Modal {...props}>
      <View style={{padding: 16}}>
        <View style={{flexDirection: 'row'}}>
          <Title
            style={[
              {padding: 8},
              tab === 0 ? styles.selectedTab : styles.unselectedTab,
            ]}
            onPress={() => setTab(0)}>
            Add PLO
          </Title>
          <Title
            style={[
              {padding: 8, marginLeft: 4},
              tab === 1 ? styles.selectedTab : styles.unselectedTab,
            ]}
            onPress={() => setTab(1)}>
            Choose PLO
          </Title>
        </View>
        <Divider style={{marginVertical: 8}} />
        {saving ? (
          <SavingView />
        ) : tab === 0 ? (
          <AddView
            onAdd={(plo, number) => {
              setSaving(true);
              ploService
                .insert(plo)
                .then(r => {
                  uiService.toastSuccess('New PLO Added!');
                  programPloService
                    .insert({
                      program: {id: program.id},
                      plo: {id: r.data.id!},
                      number,
                    } as any)
                    .then(() => {
                      uiService.toastSuccess('Assigned PLO successfully!');
                      onAdd(r.data, number);
                    })
                    .catch(() => {
                      uiService.toastError('PLO Assignment failed!');
                    })
                    .finally(() => {
                      setSaving(false);
                    });
                })
                .catch(() => {
                  uiService.toastError('Failed to add PLO!');
                  setSaving(false);
                });
            }}
            maps={maps}
          />
        ) : tab === 1 && plos ? (
          <ChooseView
            onChoose={map => {
              setSaving(true);
              programPloService
                .insert({
                  program: {id: program.id},
                  ...map,
                } as any)
                .then(r => {
                  uiService.toastSuccess('Assigned PLO successfully!');
                  onAdd(map.plo!, map.number!);
                })
                .catch(() => {
                  uiService.toastError('PLO Assignment failed!');
                })
                .finally(() => {
                  setSaving(false);
                });
            }}
            maps={maps}
            plos={plos.filter(p => !maps.find(m => p.id === m.plo!.id))}
          />
        ) : (
          <ActivityIndicator style={{alignSelf: 'center', margin: 16}} />
        )}
      </View>
    </Modal>
  );
}

const SavingView = () => (
  <>
    <ActivityIndicator style={{alignSelf: 'center'}} />
    <Caption style={{alignSelf: 'center'}}>Adding PLO</Caption>
  </>
);

const AddView = ({
  onAdd,
  maps,
}: Pick<P, 'onAdd'> & {maps: ProgramPloType[]}) => {
  const [number, setNumber] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const invalidNumber = !!maps.find(p => p.number === parseInt(number));
  return (
    <View>
      <TextInput
        label="Number"
        mode="outlined"
        style={{marginVertical: 4}}
        value={number}
        onChangeText={txt => {
          if (txt === '') setNumber(txt);
          else if (parseInt(txt).toString() === txt) {
            setNumber(txt);
          }
        }}
        error={invalidNumber}
      />
      {invalidNumber ? (
        <Caption style={{color: colors.red}}>
          This number has already been used with another PLO!
        </Caption>
      ) : (
        <></>
      )}
      <TextInput
        label="Title"
        mode="outlined"
        style={{marginVertical: 4}}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        label="Description"
        mode="outlined"
        style={{marginVertical: 4}}
        value={desc}
        onChangeText={setDesc}
      />
      <Button
        style={{alignSelf: 'flex-end'}}
        disabled={!desc || !title || !number || invalidNumber}
        onPress={() => {
          onAdd({title, description: desc}, parseInt(number));
        }}>
        Save
      </Button>
    </View>
  );
};

const ChooseView = ({
  onChoose,
  maps,
  plos,
}: {
  onChoose: (map: Pick<ProgramPloType, 'plo' | 'number'>) => void;
  maps: ProgramPloType[];
  plos: PLOType[];
}) => {
  const [selected, setSelected] = useState('');
  const [number, setNumber] = useState('');
  const invalidNumber = !!maps.find(p => p.number === parseInt(number));
  const noPlos =
    plos.length > 0
      ? false
      : [{name: 'No PLOs left', value: '', disabled: true}];
  return (
    <View>
      <Caption>Choose a PLO</Caption>
      <ListSelect
        options={
          noPlos || [
            {name: 'Choose PLO', value: '', disabled: true},
            ...plos.map(p => ({name: p.title, value: p.id})),
          ]
        }
        onSelect={plo => {
          setSelected(plo.value);
        }}
      />
      {selected ? (
        <>
          <Caption>Give it a number</Caption>
          <TextInput
            value={number}
            onChangeText={txt => {
              if (txt === '') setNumber(txt);
              else if (parseInt(txt).toString() === txt) {
                setNumber(txt);
              }
            }}
            error={invalidNumber}
            mode="outlined"
          />
          {invalidNumber ? (
            <Caption style={{color: colors.red}}>
              This number has already been used with another PLO!
            </Caption>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
      <Button
        style={{alignSelf: 'flex-end'}}
        disabled={!selected || !number || invalidNumber}
        onPress={() => {
          const map = {
            plo: plos.find(p => p.id === selected)!,
            number: parseInt(number),
          };
          onChoose(map);
        }}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  selectedTab: {
    backgroundColor: colors.primarySubtle,
    borderRadius: 100,
  },
  unselectedTab: {
    opacity: 0.4,
  },
});
