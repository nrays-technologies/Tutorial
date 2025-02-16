import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {ColorsApp} from '../../utilities/colors';
import {Fonts} from '../../utilities/fonts';

type Props = {
  icon?: any;
  title: string;
  onPress: () => void;
};

const Button = ({title = 'Title', icon, onPress}: Props) => {
  return (
    <TouchableHighlight
      underlayColor={ColorsApp.underlayColor}
      onPress={onPress}
      style={styles.container}>
      <View style={styles.containerContent}>
        {icon && <View style={styles.containerIcon}>{icon}</View>}
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: ColorsApp.bgButton,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  containerContent: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 50,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...Fonts.poppinsMedium13,
  },
});
