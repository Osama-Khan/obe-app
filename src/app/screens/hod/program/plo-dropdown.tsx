import {addPloRoute} from '@app/routes/hod.routes';
import ploService from '@app/services/plo.service';
import {PLOType} from '@app/types';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Menu, Button, Caption} from 'react-native-paper';

type P = {
  selectedPlos: Partial<PLOType>[];
  onAdd: (plo: PLOType) => void;
};

const PloDropdown = ({selectedPlos, onAdd}: P) => {
  const [shown, setShown] = useState(false);
  const [plos, setPlos] = useState<PLOType[]>();

  const navigation = useNavigation();

  useEffect(() => {
    ploService.get().then(res => {
      setPlos(res.data);
    });
  }, []);
  return plos ? (
    plos.length > 0 ? (
      <Menu
        anchor={
          <Button
            mode="outlined"
            color="gray"
            icon="chevron-down"
            style={{margin: 4}}
            onPress={() => setShown(true)}>
            Select PLO
          </Button>
        }
        visible={shown}
        onDismiss={() => setShown(false)}
        children={[
          <Menu.Item
            title="Create new PLO"
            icon="plus"
            onPress={() => {
              navigation.navigate(addPloRoute.name);
              setShown(false);
            }}
          />,
          plos.map(p => (
            <Menu.Item
              key={p.id}
              title={p.title}
              disabled={selectedPlos?.find(_p => _p.id === p.id) !== undefined}
              onPress={() => {
                onAdd(p);
              }}
            />
          )),
        ]}
      />
    ) : (
      <Caption>No plos available...</Caption>
    )
  ) : (
    <ActivityIndicator />
  );
};

export default PloDropdown;
