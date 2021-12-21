import {ConfirmModal} from '@app/components/modal';
import uiService from '@app/services/ui.service';
import userService from '@app/services/user.service';
import {colors} from '@app/styles';
import {UserType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {
  ActivityIndicator,
  Card,
  Divider,
  IconButton,
  Text,
} from 'react-native-paper';
import RoleBadge from './components/RoleBadge';
import EditUserModal from './detail-user/edit.modal';

export default function UserDetailScreen() {
  const [modal, setModal] = useState(0);
  const [updating, setUpdating] = useState(false);
  const hideModal = () => setModal(0);
  const navigation = useNavigation();
  const route = useRoute<any>();
  const {user: pUser, onUpdate} = route.params!;
  const [user, setUser] = useState<UserType>(pUser);

  useMemo(() => {
    navigation.setOptions({headerTitle: user.username});
  }, [user]);

  return (
    <>
      <Card style={{margin: 8, padding: 8}}>
        {updating ? (
          <ActivityIndicator style={{margin: 16, alignSelf: 'center'}} />
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <RoleBadge roleName={user.role!.name} />
              <View style={{flexDirection: 'row'}}>
                <IconButton
                  icon="trash-can"
                  color={colors.red}
                  onPress={() => setModal(2)}
                  style={{backgroundColor: colors.redSubtle}}
                />
                <IconButton
                  icon="pencil"
                  color={colors.primary}
                  onPress={() => setModal(1)}
                  style={{backgroundColor: colors.primarySubtle}}
                />
              </View>
            </View>
            <TextPair title="ID" description={user.id} />
            <Divider />
            <TextPair title="Username" description={user.username} />
            <Divider />
            <TextPair title="Email" description={user.email} />
            <Divider />
            <TextPair
              title="Date of Birth"
              description={new Date(user.dateOfBirth).toLocaleDateString()}
            />
            <Divider />
            <TextPair
              title="Created On"
              description={new Date(user.createdAt).toLocaleDateString()}
            />
            <Divider />
            <TextPair
              title="Last Update"
              description={new Date(user.updatedAt).toLocaleDateString()}
            />
          </>
        )}
      </Card>
      {modal ? (
        modal === 1 ? (
          <EditUserModal
            data={user}
            onEdit={newData => {
              setUpdating(true);
              hideModal();
              const submission: Partial<UserType> = {};
              if (newData.username) submission.username = newData.username;
              if (newData.email) submission.email = newData.email;
              userService
                .update(user.id, submission)
                .then(res => {
                  uiService.toastSuccess('Updated user successfully!');
                  onUpdate();
                  setUser({...user, ...res.data});
                })
                .catch(e => {
                  console.error(e);
                  uiService.toastError('Failed to update user!');
                })
                .finally(() => {
                  setUpdating(false);
                });
            }}
            visible={true}
            onDismiss={hideModal}
          />
        ) : (
          <ConfirmModal
            title="Delete User?"
            description={`Are you sure you want to delete the user "${user.username}"?`}
            visible={true}
            positiveButton={{
              onPress: () => {
                setUpdating(true);
                hideModal();
                userService
                  .delete(user.id)
                  .then(() => {
                    uiService.toastSuccess('User Deleted!');
                    onUpdate();
                    navigation.goBack();
                  })
                  .catch(() => {
                    uiService.toastError('Failed to delete user!');
                  })
                  .finally(() => {
                    setUpdating(false);
                  });
              },
            }}
            negativeButton={{onPress: hideModal}}
            onDismiss={hideModal}
          />
        )
      ) : (
        <></>
      )}
    </>
  );
}

const TextPair = ({title, description}: any) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 8,
      borderColor: colors.slateSubtle,
    }}>
    <Text style={{fontWeight: 'bold'}}>{title}: </Text>
    <Text>{description}</Text>
  </View>
);
