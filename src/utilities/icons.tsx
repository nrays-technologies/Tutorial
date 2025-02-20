import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Icons = {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather
};

export default Icons;

Ionicons.loadFont();
type IconSizeProps = {
  iconSizes: keyof typeof IconSizes;
};

export interface IconProps {
  size: IconSizeProps['iconSizes'];
  name: string;
  color: string;
}

export const IconSizes = {
  small: 13,
  medium: 18,
  large: 23,
  extraLarge: 27
};

const IIcon = ({ size, name, color }: IconProps) => (
  <Ionicons size={IconSizes[size]} name={name} color={color} />
);

export { IIcon };
