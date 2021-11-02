import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Caption, Card, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {readFile} from 'react-native-fs';
import {pickSingle} from 'react-native-document-picker';
import courseService from '@app/services/course.service';
import uiService from '@app/services/ui.service';

export default function AllocationScreen() {
  const [fileName, setFileName] = useState('');
  const [stream, setStream] = useState('');
  const [saving, setSaving] = useState(false);
  return (
    <View>
      <Caption style={{marginTop: 16, marginHorizontal: 16}}>
        Pick an allocation file to upload!
      </Caption>
      <Card
        style={{margin: 16, overflow: 'hidden'}}
        onPress={() => {
          pickSingle().then(async file => {
            const f = await readFile(file.uri, 'base64');
            setFileName(file.name);
            setStream(f);
          });
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{backgroundColor: stream ? '#0f0' : '#70f'}}>
            <Icon
              name={stream ? 'check' : 'plus'}
              size={32}
              style={{alignSelf: 'center', margin: 16}}
            />
          </View>
          <Title style={{margin: 16}}>{fileName || 'Pick a File...'}</Title>
        </View>
      </Card>

      <Button
        mode="contained"
        icon="upload"
        style={{margin: 16}}
        disabled={!fileName || !stream || saving}
        loading={saving}
        onPress={() => {
          setSaving(true);
          courseService
            .uploadAllocationFile(stream)
            .then(() =>
              uiService.toastSuccess('Successfully uploaded allocation file!'),
            )
            .catch(e =>
              uiService.toastError('Failed to upload allocation file!'),
            )
            .finally(() => {
              setStream('');
              setFileName('');
              setSaving(false);
            });
        }}>
        Upload
      </Button>
    </View>
  );
}
