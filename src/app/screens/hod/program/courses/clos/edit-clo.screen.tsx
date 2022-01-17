import {ManyCriteria} from '@app/models/criteria';
import cloService from '@app/services/clo.service';
import objectiveMapService from '@app/services/objective-map.service';
import programPloService from '@app/services/program-plo.service';
import uiService from '@app/services/ui.service';
import {CLOType, CourseType, PLOType, ProgramType} from '@app/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {Caption, ActivityIndicator, Card} from 'react-native-paper';

export type ParamsType = {
  /** Called with the added CLO when a CLO is added */
  onAdd: (clo: Partial<CLOType>) => void;

  /** CLOs that are already assigned to the course*/
  clos: CLOType[];

  /** The course the CLO is being added to */
  course: CourseType;

  /** The program the course exists in */
  program: ProgramType;
};

export type PLOWeightedType = PLOType & {number: number; weight: number};

export default function AddCloScreen() {
  return (
    <ScrollView>
    </ScrollView>
  );
}
