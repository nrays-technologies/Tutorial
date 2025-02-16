import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ColorsApp } from '../../../utilities/colors';
import Images from '../../../assets/images';
import { Fonts } from '../../../utilities/fonts';
import { arrSettings, spaceLeftRightList } from '../../../constants/constants';
import { useTranslation } from 'react-i18next';
import { ItemSetting } from '../../components';
import { TranslationKeys } from '../../../i18n/language';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackRoots } from '../../../navigation/AppNavigation';
import { updateAuthInfoWithToken } from '../../../redux/reducers/appOptionsSlice';
import { useAppDispatch } from '../../../redux/store';

type Props = NativeStackScreenProps<AppStackRoots, 'Settings'>;

const Settings = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onPressItem = (title: string) => {
    switch (title) {
      case TranslationKeys.EDIT_PROFILE:
        navigation.navigate('EditProfile');
        break;
      case TranslationKeys.NOTIFICATION_SETTINGS:
        navigation.navigate('NotificationSettings');
        break;
      case TranslationKeys.PRIVACY_POLICY:
        navigation.navigate('TermsAndPP', { title });
        break;
      case TranslationKeys.TERMS_OF_USE:
        navigation.navigate('TermsAndPP', { title });
        break;
      case TranslationKeys.LOGOUT:
        dispatch(updateAuthInfoWithToken({ accessToken: '' }));
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={Images.profile_dummy} style={styles.imgProfile} />
        <Text style={styles.name}>Alfredo Press</Text>
        <Text style={styles.desc}>200k followers</Text>
      </View>
      <FlatList
        data={arrSettings}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item, index }) => (
          <ItemSetting translator={t} item={item} onPress={onPressItem} />
        )}
        keyExtractor={(item, index) => item.title + index.toString()}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    // paddingHorizontal: spaceLeftRightList,
    paddingVertical: 21
  },
  header: {
    marginHorizontal: spaceLeftRightList,
    backgroundColor: ColorsApp.bgButton,
    padding: 22,
    alignItems: 'center',
    borderRadius: 12
  },
  imgProfile: {
    height: 75,
    width: 75
  },
  name: {
    marginTop: 6,
    ...Fonts.poppinsSemiBold15
  },
  desc: {
    ...Fonts.poppinsMedium10,
    color: ColorsApp.txtDescGrey,
    textAlign: 'center'
  },
  contentContainerStyle: {
    gap: 12,
    paddingTop: 21
  }
});
