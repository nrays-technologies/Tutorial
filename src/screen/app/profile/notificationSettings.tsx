import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { AppStackRoots } from '../../../navigation/AppNavigation';
import { arrNotificationSettings } from '../../../constants/constants';
import { ItemNotificationSetting } from '../../components';
import { useTranslation } from 'react-i18next';
import { ColorsApp } from '../../../utilities/colors';

type Props = NativeStackScreenProps<AppStackRoots, 'NotificationSettings'>;

const NotificationSettings = ({ navigation }: Props) => {
  const { t } = useTranslation();

  const [notificationSetting, setNotificationSetting] = useState<boolean[]>([
    true,
    false,
    false,
    false
  ]);

  const onValueChange = ({
    value,
    index
  }: {
    value: boolean;
    index: number;
  }) => {
    notificationSetting[index] = value;
    setNotificationSetting([...notificationSetting]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={arrNotificationSettings}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item, index }) => (
          <ItemNotificationSetting
            translator={t}
            item={item}
            value={notificationSetting[index]}
            onValueChange={(value) => onValueChange({ value, index })}
          />
        )}
        keyExtractor={(item, index) => item.title + index.toString()}
      />
    </View>
  );
};

export default NotificationSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsApp.white
  },
  contentContainerStyle: { gap: 12, paddingTop: 21 }
});
