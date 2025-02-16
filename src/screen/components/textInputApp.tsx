import React, { FC } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { ColorsApp } from '../../utilities/colors';
import { Fonts } from '../../utilities/fonts';

interface Props extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureText?: boolean;
  onPressSecure?: () => void;
  inputStyle?: ViewStyle;
  textStyle?: TextStyle;
  placeholderTextColor?: string;
  title?: string
}

const TextInputApp: FC<Props> = ({
  value = '',
  onChangeText = () => { },
  placeholder = '',
  secureText = false,
  onPressSecure = () => { },
  inputStyle = {},
  textStyle = {},
  placeholderTextColor,
  title,
  ...props
}: Props) => {
  return (
    <View>
      {title && <Text style={styles.title }>{title}</Text>}
      <View
        style={{
          ...styles.inputStyle,
          ...inputStyle,
        }}>
        <TextInput
          style={{
            ...styles.textStyle,
            ...textStyle,               
          }}       
          value={value}
          placeholderTextColor={ColorsApp.placeHolderTxtInput}
          onChangeText={onChangeText}
          placeholder={placeholder}
          {...props}
        />
        {secureText && (
          <TouchableOpacity onPress={onPressSecure}>
            <Text style={{ ...styles.textStyle, flex: 0 }}>{secureText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  inputStyle: {
    width: '100%',
    backgroundColor: ColorsApp.white,
    height: 48,
    justifyContent: 'center',
    borderRadius: 12,
    paddingHorizontal: 15
  },
  textStyle: {
    ...Fonts.poppins13,
    flex: 1,
    color: ColorsApp.black,
  },
  title: {
    marginTop: 19,
    marginBottom: 8,
    ...Fonts.poppinsMedium13,
  },
});

export default TextInputApp;





