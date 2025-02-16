import React from 'react';
import Images from '../../assets/images';
import { Image, StyleSheet, Text } from 'react-native';
import { FontName } from '../../constants/fontConst';
import { ColorsApp } from '../../utilities/colors';

type Props = {
  color?: String;
};

const HeaderTitleNav = ({ }: Props) => {
  return (
    // <Images.logoSVG width={37} height={37} />
    // <Image source={Images.logo} resizeMode='contain' style={{height:30, width: 69}}  />
    <Text style={styles.logo}>TondonTax</Text>
  );
};

export default HeaderTitleNav;


const styles = StyleSheet.create({
  
  logo: {
    fontFamily: FontName.DancingScriptBold,
    fontSize: 20,
    color: ColorsApp.theme,
  },
});
