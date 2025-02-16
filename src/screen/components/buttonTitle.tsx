import React, { PropsWithChildren, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { MotiView, useDynamicAnimation } from 'moti';
import { MaterialIndicator } from 'react-native-indicators';
// import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { ColorsApp } from '../../utilities/colors';
import { Fonts } from '../../utilities/fonts';
import { WIDTH_SCREEN } from '../../constants/constants';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

type PropsButtonAnimatedGlobalGlobal = PropsWithChildren<{
  title?: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  colorTitle?: string;
  activityIndicatorColor?: string;
  customStyles?: ViewStyle;
  onPress: () => void;
  showLoading: boolean;
  disabled?: boolean;
}>;

const ButtonTitle = ({
  title = 'Login',
  width = WIDTH_SCREEN / 2, //WIDTH_SCREEN - 200,
  height = 48,
  backgroundColor = ColorsApp.white,
  colorTitle = ColorsApp.black,
  activityIndicatorColor = ColorsApp.theme,
  disabled = false,
  onPress,
  showLoading = false,
}: PropsButtonAnimatedGlobalGlobal) => {
  const [clicked, setClicked] = useState(false);

  const animation = useDynamicAnimation(() => {
    return {
      width: width,
      height: height,
      borderRadius: 24,
    };
  });
  useEffect(() => {
    if (!showLoading) {
      setClicked(false);
      animation.animateTo({
        width: width,
        height: height,
        borderRadius: 24,
      });
    } else {
      setClicked(true);
      animation.animateTo({ width: 48, height: height, borderRadius: 24 });
    }
  }, [showLoading]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={() => {
        // ReactNativeHapticFeedback.trigger('impactLight', options);
        onPress();
      }}>
      <MotiView
        state={animation}
        transition={{ type: 'timing', duration: 300 }}
        style={{
          ...styles.btnContainer, width: width,
          height: height,
          backgroundColor: disabled ? ColorsApp.disableBtn : backgroundColor
        }}>
        {clicked == true ? (
          <MaterialIndicator color={activityIndicatorColor} size={20} />
        ) : (
          <Text style={{ ...styles.btnTitleStyle, color: colorTitle }}>
            {title}
          </Text>
        )}
      </MotiView>
    </TouchableOpacity>
  );
};

export default ButtonTitle;

const styles = StyleSheet.create({
  btnTitleStyle: {
    textAlign: 'center',
    ...Fonts.poppinsMedium13,
  },
  btnContainer: {
    justifyContent: 'center',
    alignSelf: "center"
  }
});
