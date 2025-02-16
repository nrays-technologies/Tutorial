import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Images from '../../assets/images';
import {ColorsApp} from '../../utilities/colors';
import { spaceLeftRight } from '../../constants/constants';

type Props = {};

const ButtonBackNav = ({}: Props) => {
  const navigation = useNavigation();
  const onPressBtn = () => {
    navigation.goBack();
  };
  return (
    <Pressable style={styles.btn} onPress={onPressBtn}>
      <View style={styles.container}>
      <Images.arrowBack width={12} height={12} />
      </View>
    </Pressable>
  );
};

export default ButtonBackNav;

const styles = StyleSheet.create({
  btn: {
    height: 38,
    width: 50,
    justifyContent: 'center',
    
    // paddingLeft: spaceLeftRight,
    alignItems: 'center',
    borderRadius: 56 / 2,
    
  },
  container: {
    height: 35,
    width: 35,
    borderRadius: 18,
    backgroundColor: ColorsApp.theme,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
