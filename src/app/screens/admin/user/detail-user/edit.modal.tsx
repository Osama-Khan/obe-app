import React, {useState} from 'react';
import {ModalProps, View} from 'react-native';
import Modal from '@app/components/modal';
import {Button, TextInput, Title} from 'react-native-paper';

type FormData = {username: string; email: string};
type P = ModalProps & {onEdit: (data: FormData) => void; data: FormData};

export default function EditUserModal({onEdit, data, ...modalProps}: P) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  return (
    <Modal {...modalProps}>
      <View style={{padding: 8}}>
        <Title>Editing {data.username}</Title>
        <TextInput
          label="Username"
          mode="outlined"
          defaultValue={data.username}
          onChangeText={setUsername}
        />
        <TextInput
          label="Email"
          mode="outlined"
          defaultValue={data.email}
          onChangeText={setEmail}
        />
        <Button
          style={{marginLeft: 'auto', marginTop: 8}}
          onPress={() => onEdit({username, email})}
          disabled={!username && !email}>
          Save
        </Button>
      </View>
    </Modal>
  );
}
