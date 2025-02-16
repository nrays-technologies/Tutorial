import React, { PropsWithChildren } from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ViewStyle
} from 'react-native';

import StylesG from '../../utilities/stylesG';
import { spaceLeftRight } from '../../constants/constants';

const width_screen = Dimensions.get('screen').width;

type SectionProps = PropsWithChildren<{
  style?: ViewStyle;
  styleCard?: ViewStyle;
  onPress?: () => void;
}>;

const CardView = ({ children, style, styleCard, onPress }: SectionProps) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableHighlight 
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={onPress} style={[styles.card, styleCard]}>
        <View>
        {children}
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default CardView;

const styles = StyleSheet.create({
  container: {
    width: width_screen,
    paddingHorizontal: 4,
    paddingTop: 3,
    paddingBottom: 7
  },
  card: {
    borderRadius: 8,

    ...StylesG.shadow
  }
});
