import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Caption, Card, Title} from 'react-native-paper';
import Icon from '@app/components/icon';
import {readFile} from 'react-native-fs';
import {pickSingle} from 'react-native-document-picker';
import uiService from '@app/services/ui.service';
import {colors} from '@app/styles';
import allocationService from '@app/services/allocation.service';

export function UploadAllocationScreen() {
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
          <View
            style={{backgroundColor: stream ? colors.primary : colors.slate}}>
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
          allocationService
            .uploadAllocationFile(stream)
            .then(() =>
              uiService.toastSuccess('Successfully uploaded allocation file!'),
            )
            .catch(e => {
              uiService.toastError(
                e.response
                  ? e.response.data?.message ||
                      `Error Code: ${e.response.status}`
                  : 'Could not upload file!',
                'Upload Failed!',
              );
            })
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
