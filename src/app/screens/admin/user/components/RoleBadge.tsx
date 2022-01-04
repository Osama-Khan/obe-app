import React from 'react';
import {colors} from '@app/styles';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

export default function RoleBadge({roleName}: {roleName: string}) {
  roleName = roleName.toLowerCase();
  return (
    <View style={[styles.roleView, getRoleStyle(roleName)]}>
      <Text style={[{fontWeight: 'bold'}, getRoleTextStyle(roleName)]}>
        {roleName.toUpperCase()}
      </Text>
    </View>
  );
}

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
    backgroundColor: colors.primarySubtle,
  },
  roleAdminText: {
    color: colors.primaryDark,
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
