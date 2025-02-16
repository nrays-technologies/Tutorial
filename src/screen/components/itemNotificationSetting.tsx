import { StyleSheet, Switch, Text, View } from 'react-native';
import React from 'react';
import { TFunction } from 'i18next';
import { spaceLeftRightList } from '../../constants/constants';
import StylesG from '../../utilities/stylesG';
import { Fonts } from '../../utilities/fonts';
import { ColorsApp } from '../../utilities/colors';

interface IItemNotificationSetting {
  title: string;
}

type Props = {
  translator: TFunction;
  item: IItemNotificationSetting;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const ItemNotificationSetting = ({
  translator,
  item,
  value,
  onValueChange
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerRow}>
        <Text style={styles.title}>{translator(item.title)}</Text>
        <Switch
          value={value}
          trackColor={{ true: ColorsApp.bgSwitch, false: ColorsApp.disableBtn }}
          thumbColor={ColorsApp.theme}
          onValueChange={onValueChange}
        />
      </View>
    </View>
  );
};

export default ItemNotificationSetting;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    paddingHorizontal: spaceLeftRightList
  },
  containerRow: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    paddingHorizontal: 15,
    ...StylesG.shadow
  },
  title: {
    ...Fonts.poppins13
  }
});
