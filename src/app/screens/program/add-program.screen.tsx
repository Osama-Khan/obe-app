import programService from '@app/services/program.service';
import ProgramType from '@app/types/program.type';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {ToastAndroid, ScrollView, View} from 'react-native';
import {
  Button,
  Caption,
  Card,
  IconButton,
  TextInput,
  Title,
} from 'react-native-paper';

export const AddProgramScreen = () => {
  const [plos, setPlos] = useState([{title: '', description: ''}]);
  const [title, setTitle] = useState('');
  return (
    <ScrollView>
      <View style={{marginTop: 8}} />
      <Card
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          padding: 8,
          marginHorizontal: 8,
        }}>
        <TextInput
          label="Title"
          mode="outlined"
          value={title}
          onChangeText={setTitle}
          style={{marginVertical: 4}}
        />
        <Title>PLOs</Title>
        {plos.map((plo, i) => (
          <Card
            key={i}
            mode="outlined"
            style={{
              margin: 4,
              marginVertical: 12,
              padding: 12,
              overflow: 'visible',
            }}>
            <View
              style={{
                position: 'absolute',
                top: -26,
                flexDirection: 'row',
                width: '100%',
              }}>
              <Caption style={{paddingHorizontal: 4, backgroundColor: 'white'}}>
                {`PLO #${i + 1}`}
              </Caption>
              <IconButton
                style={{
                  margin: 0,
                  marginLeft: 'auto',
                  backgroundColor: 'white',
                }}
                color="gray"
                size={18}
                icon="close"
                onPress={() => {
                  setPlos(plos.filter((_, ind) => ind !== i));
                }}
              />
            </View>
            <TextInput
              value={plo.title}
              onChangeText={title => {
                plos[i].title = title;
                setPlos([...plos]);
              }}
              mode="outlined"
              placeholder="Title"
              dense
            />
            <TextInput
              value={plo.description}
              onChangeText={description => {
                plos[i].description = description;
                setPlos([...plos]);
              }}
              mode="outlined"
              placeholder="Description"
              dense
              multiline
            />
          </Card>
        ))}
        <Button
          icon="plus"
          onPress={() => {
            const p = plos.concat({title: '', description: ''});
            setPlos(p);
          }}>
          Add PLO
        </Button>
        <Button
          mode="contained"
          icon="check"
          disabled={isInvalid({title})}
          style={{marginVertical: 4, marginLeft: 'auto'}}
          onPress={() => handleSubmit({title, plos})}>
          Submit
        </Button>
      </Card>
    </ScrollView>
  );
};

const isInvalid = (data: Partial<ProgramType>) => !data.title;
const handleSubmit = (data: Partial<ProgramType>) => {
  if (isInvalid(data)) {
    ToastAndroid.show('Invalid data', ToastAndroid.SHORT);
    return;
  }
  programService
    .insert(data)
    .then(res => {
      ToastAndroid.show('Inserted with ID: ' + res.data.id, ToastAndroid.SHORT);
    })
    .catch(e => {
      ToastAndroid.show('Failed to insert!', ToastAndroid.SHORT);
    });
};
