import {FetchingDataTable} from '@app/components/data-table';
import {ManyCriteria} from '@app/models/criteria';
import userService from '@app/services/user.service';
import UserType from '@app/types/user.type';
import React, {useState} from 'react';
import {Button, Card, Text} from 'react-native-paper';
import {addUserRoute} from '@app/routes/admin.routes';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {colors} from '@app/styles';
import {useNavigation} from '@react-navigation/native';

const criteria = new ManyCriteria<UserType>({relations: ['role']});

export const ViewUserScreen = () => {
  const [updates, setUpdates] = useState(0);
  const navigation = useNavigation<any>();
  return (
    <ScrollView>
      <Button
        icon="plus"
        style={{margin: 8, marginLeft: 'auto'}}
        mode="contained"
        onPress={() =>
          navigation.navigate(addUserRoute.name, {
            onAdd: () => setUpdates(updates + 1),
          })
        }>
        Add
      </Button>
      <Card style={{margin: 8}}>
        <FetchingDataTable
          fetchMethod={criteria => userService.get(criteria)}
          criteria={criteria}
          key={updates}
          columns={[
            {
              selector: 'username',
              title: 'Username',
              weight: 0.5,
            },
            {
              selector: 'email',
              title: 'Email',
            },
            {
              selector: ({item: user}) => (
                <View style={[styles.roleView, getRoleStyle(user.role!.name)]}>
                  <Text
                    style={[
                      {fontWeight: 'bold'},
                      getRoleTextStyle(user.role!.name),
                    ]}>
                    {user.role!.name.toUpperCase()}
                  </Text>
                </View>
              ),
              title: 'Role',
              weight: 0.5,
            },
          ]}
        />
      </Card>
    </ScrollView>
  );
};

const getRoleStyle = (roleName: string) => {
  switch (roleName) {
    case 'admin':
      return styles.roleAdminView;
    case 'hod':
      return styles.roleHodView;
    case 'teacher':
      return styles.roleTeacherView;
    default:
      return styles.roleStudentView;
  }
};

const getRoleTextStyle = (roleName: string) => {
  switch (roleName) {
    case 'admin':
      return styles.roleAdminText;
    case 'hod':
      return styles.roleHodText;
    case 'teacher':
      return styles.roleTeacherText;
    default:
      return styles.roleStudentText;
  }
};

const styles = StyleSheet.create({
  roleView: {
    padding: 4,
    borderRadius: 4,
  },
  roleAdminView: {
    backgroundColor: colors.redSubtle,
  },
  roleAdminText: {
    color: colors.redDark,
  },
  roleHodView: {
    backgroundColor: colors.greenSubtle,
  },
  roleHodText: {
    color: colors.greenDark,
  },
  roleTeacherView: {
    backgroundColor: colors.yellowSubtle,
  },
  roleTeacherText: {
    color: colors.yellowDark,
  },
  roleStudentView: {
    backgroundColor: colors.slateSubtle,
  },
  roleStudentText: {
    color: colors.slateDark,
  },
});
