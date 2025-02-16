import { Dimensions } from 'react-native';

import { TranslationKeys } from '../i18n/language';
import Images from '../assets/images';

export const HEIGHT_SCREEN = Dimensions.get('screen').height;
export const WIDTH_SCREEN = Dimensions.get('screen').width;


export const spaceLeftRightAuth = 30;
export const spaceHorizontal = 15;
export const spaceLeftRightList = 9;
export const spaceLeftList = 19;
export const spaceLeftRight = 20;
export const authCodeExpire = 'Unauthenticated.';

export const arrSettings = [
  {
    title: TranslationKeys.EDIT_PROFILE,
    icon: Images.pencil
  },
  {
    title: TranslationKeys.NOTIFICATION_SETTINGS,
    icon: Images.bell
  },
  {
    title: TranslationKeys.PRIVACY_POLICY,
    icon: Images.privacyPolicy
  },
  {
    title: TranslationKeys.TERMS_OF_USE,
    icon: Images.termOfUse
  },
  {
    title: TranslationKeys.LOGOUT,
    icon: Images.pencil
  }
];

export const arrNotificationSettings = [
  {
    title: TranslationKeys.PUSH_NOTIFICATION
  },
  {
    title: TranslationKeys.FOLLOW_NOTIFICATION
  },
  {
    title: TranslationKeys.LIKE_NOTIFICATION
  },
  {
    title: TranslationKeys.COMMENT_NOTIFICATION
  }
];


export enum TypeList {
  OverduePayments = 'OverduePayments',
  PaymentCollections = 'PaymentCollections',
  UpcomingPayments = 'UpcomingPayments'
}
