import { t } from 'i18next';
import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet, ViewStyle, TextInput } from 'react-native';
import { TranslationKeys } from '../../i18n/language';
import { Fonts } from '../../utilities/fonts';
import { ColorsApp } from '../../utilities/colors';
import Images, { Icon, Icons } from '../../assets/images';

type Props = {
  searchString?: string;
  style?: ViewStyle;
  editable?: boolean;
  showCross?: boolean;
  autoFocus?: boolean;
  onSearchTyping: (searchText: string) => void;
  onSearchCancel?: (searchText: string) => void;
};

const SearchBar = ({
  searchString,
  style,
  editable = true,
  showCross = false,
  autoFocus = false,
  onSearchTyping
}: Props) => {
  const [searchText, setSearchText] = useState<string>('');

  const refInput = useRef<TextInput>(null);

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    };
  };

  const handleChange = (value: string) => {
    onSearchTyping(value);
  };

  const callOnceAfterPayment = useCallback(debounce(handleChange), []);

  const onChangeText = (value: string) => {
    setSearchText(value);
    callOnceAfterPayment(value);
  };

  const onKeyboardDismiss = () => {
    onSearchTyping(searchText);
  };

  const onPressClear = () => {
    setSearchText('');
    refInput.current?.clear();
    onSearchTyping('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={refInput}
        editable={editable}
        autoFocus={autoFocus}
        placeholder={t(TranslationKeys.PLACEHOLDER_SEARCH)}
        placeholderTextColor={ColorsApp.placeHolderTxtInput}
        style={{ flex: 1, ...Fonts.poppinsMedium13, marginLeft: 20 }}
        returnKeyType="search"
        value={searchText}
        onChangeText={onChangeText}
        onSubmitEditing={onKeyboardDismiss}
      />
      <View style={styles.icon}>
        {/* <Images.tabSearch stroke={ColorsApp.white} fill={ColorsApp.white} /> */}
        <Icon type={Icons.Ionicons} name='search' color='#000' size={25} />
      </View>
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: ColorsApp.grey33,
    borderRadius: 14
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 34,
    borderRadius: 18,
    marginHorizontal: 10,
    // backgroundColor: ColorsApp.theme
  }
});
