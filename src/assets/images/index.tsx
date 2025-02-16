import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import SVGArrowBack from './svg/arrowBack.svg';
import SVGApple from './svg/apple.svg';
import SVGGoogle from './svg/google.svg';
import SVFacebook from './svg/facebook.svg';
import SVGPhone from './svg/phone.svg';

import SVGHome from './svg/home.svg';
import SVGSearch from './svg/search.svg';
import SVGPost from './svg/post.svg';
import SVGProfile from './svg/profile.svg';

import SVGResendOtp from './svg/resendOtp.svg';

import SVGPlay from './svg/play.svg';

import SVGBookmark from './svg/bookmark.svg';
import SVGSettings from './svg/settings.svg';
import SVGThreeDot from './svg/threedots.svg';
import SVGCameraSwitch from './svg/cameraSwitch.svg';
import SVGflash from './svg/flash.svg';
import SVGCollection from './svg/collection.svg';
import SVGAttendance from './svg/attendance.svg';
import SVGCRM from './svg/crm.svg';
import SVGFilter from './svg/filter.svg';
import SVGNoData from './svg/noData.svg';
import SVGEmpty from './svg/empty.svg';
import SVGBlank from './svg/blank.svg';

import SVGMenuNotification from './svg/menu_notification.svg';
import SVGMenuPP from './svg/menu_pp.svg';
import SVGMenuTC from './svg/menu_tc.svg';
import SVGMeunPin from './svg/meun_pin.svg';




export const Icons = {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Feather,
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Entypo,
  SimpleLineIcons,
  Octicons,
  Foundation,
  EvilIcons
};

export interface IconProps {
  type: Function;
  name: string;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export const Icon = ({ type, name, color, size = 24, style }: IconProps) => {
  const fontSize = 24;
  const Tag = type;
  return (
    <>
      {type && name && (
        <Tag name={name} size={size || fontSize} color={color} style={style} />
      )}
    </>
  );
};

const Images = {
  logo: require('./logo.png'),
  profile_dummy: require('./profile_dummy.png'),

  slider1: require('./slider/slider1.png'),
  slider2: require('./slider/slider2.png'),
  slider3: require('./slider/slider3.png'),
  slider4: require('./slider/slider4.png'),

  rikshaAuth: require('./rikshaAuth.png'),
  otpAuth: require('./otp.png'),
  pinSetup: require('./pinSetup.png'),
  pinVerify: require('./pinVerify.png'),
  deleteKey: require('./deleteKey.png'),
  tag: require('./tag.png'),
  
  banner: require('./banner.png'),
  
  

  arrowBack: SVGArrowBack,
  apple: SVGApple,
  google: SVGGoogle,
  facebook: SVFacebook,
  phone: SVGPhone,
  play: SVGPlay,

  //TabIcons
  tabHome: SVGHome,
  tabSearch: SVGSearch,
  tabPost: SVGPost,
  tabProfile: SVGProfile,
  resendOtp: SVGResendOtp,
  bookmark: SVGBookmark,
  settings: SVGSettings,
  threeDots: SVGThreeDot,
  cameraSwitch: SVGCameraSwitch,
  flash: SVGflash,
  collection: SVGCollection,
  attendance: SVGAttendance,
  crm: SVGCRM,
  filter: SVGFilter,
  empty: SVGEmpty,
  noData: SVGNoData,
  blank: SVGBlank,
  menu_notification: SVGMenuNotification,
  menu_pp: SVGMenuPP,
  menu_tc: SVGMenuTC,
  meun_pin: SVGMeunPin,
};

export default Images;
