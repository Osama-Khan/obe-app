import Modal from '@app/components/modal';
import {CLOType, QuestionType} from '@app/types';
import React, {useState} from 'react';
import {ModalProps, View} from 'react-native';
import {
  Button,
  Divider,
  List,
  Switch,
  TextInput,
  Title,
} from 'react-native-paper';

type P = Omit<ModalProps, 'children'> & {
  clos: CLOType[];
  onAdd: (question: Partial<QuestionType>) => void;
};

export default function AddQuestionModal({
  onAdd,
  clos,
  onDismiss,
  ...props
}: P) {
  const [title, setTitle] = useState('');
  const [added, setAdded] = useState<Pick<CLOType, 'id'>[]>([]);
  return (
    <Modal {...props}>
      <View style={{margin: 8}}>
        <Title
          style={{marginVertical: 8, marginHorizontal: 8, fontWeight: 'bold'}}>
          Add Question
        </Title>
        <Divider style={{margin: -8, marginVertical: 0}} />
        <TextInput label="Title" mode="outlined" onChangeText={setTitle} />
        <List.Section title="CLOs">
          {clos.map(c => (
            <List.Item
              title={`CLO ${c.number}`}
              description={c.title}
              right={() => (
                <Switch
                  value={added.some(a => a.id === c.id)}
                  onChange={() => {
                    if (added.some(a => a.id === c.id)) {
                      setAdded(added.filter(a => a.id !== c.id));
                    } else {
                      setAdded([...added, {id: c.id}]);
                    }
                  }}
                />
              )}
            />
          ))}
        </List.Section>
        <Button
          mode="contained"
          style={{borderRadius: 0, margin: -8, marginTop: 8}}
          icon="plus"
          disabled={!title || added.length === 0}
          onPress={() => {
            onAdd({title, clos});
            if (onDismiss) onDismiss();
          }}>
          Add
        </Button>
      </View>
    </Modal>
  );
}
