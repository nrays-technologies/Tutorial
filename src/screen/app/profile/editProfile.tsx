import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { ColorsApp } from '../../../utilities/colors';
import Images from '../../../assets/images';
import { ButtonTitle, TextInputApp } from '../../components';
import { useTranslation } from 'react-i18next';
import { TranslationKeys } from '../../../i18n/language';
import StylesG from '../../../utilities/stylesG';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fonts } from '../../../utilities/fonts';
import ActionSheet from 'react-native-actionsheet';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ModalImagesPicker from '../../modal/modalImagesPicker';

const EditProfile = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState<string>('');
  const [phoneNum, setPhoneNum] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const actionSheetRef = useRef<ActionSheet>(null);

  // const heightAnim = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardWillShow',
  //     () => {
  //       console.log('Keyboard did show');
  //       // toggleVisibility(true);
  //       // Perform actions when the keyboard is shown
  //     }
  //   );
  //   const keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardWillHide',
  //     () => {
  //       console.log('Keyboard did hide');
  //       // toggleVisibility(false);
  //       // Perform actions when the keyboard is hidden
  //     }
  //   );

  //   // Clean up event listeners
  //   return () => {
  //     keyboardDidShowListener.remove();
  //     keyboardDidHideListener.remove();
  //   };
  // }, []);

  // const toggleVisibility = (isVisible: boolean) => {
  //   Animated.timing(heightAnim, {
  //     toValue: isVisible ? 200 : 0, // Change from 0 to 100 for height animation
  //     duration: isVisible ? 300 : 100, // Animation duration in milliseconds
  //     useNativeDriver: false, // Set to false for layout animation
  //   }).start();
  // };
  const handleTextInput = (text: string) => {
    setName(text);
  };
  const handleTextInputPhone = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const formattedNumber = cleaned
      .replace(/^(\d{3})(\d{0,3})(\d{0,4}).*/, '$1-$2-$3')
      .replace(/-*$/g, '');
    setPhoneNum(formattedNumber);
  };
  const handleTextInputBio = (text: string) => {
    setBio(text);
  };

  const onPressEditImage = async () => {
    console.log(' onPressEditImage ');
    actionSheetRef.current.show();
    return;
  };

  const onPressActionSheetResp = async (index: number) => {
    if (index == 0) {
      try {
        const response = await launchCamera({
          mediaType: 'photo',
          cameraType: 'front'
        });
        if (response.didCancel) {
          Alert.alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          Alert.alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          Alert.alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          Alert.alert(response.errorMessage);
          return;
        }
        console.log('result');
        console.log(response);
      } catch (error) {
        console.log('error');
        console.log(error);
      }
    } else if (index == 1) {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1
      });
      console.log(result);
    }
  };

  const onPressNext = () => {};

  return (
    <View style={[StylesG.container, styles.container]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.bottom + 65 : 0}>
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}>
          <View style={styles.header}>
            <View style={styles.containerProfileImg}>
              <Image source={Images.profile_dummy} style={styles.imgProfile} />
            </View>

            <View style={{ ...styles.containerEditIcon }}>
              <Pressable
                style={{
                  ...styles.btnChangePhoto,
                  backgroundColor: ColorsApp.theme
                }}
                onPress={onPressEditImage}>
                <Images.pencil width={15} height={15} fill={ColorsApp.black} />
              </Pressable>
            </View>
          </View>

          <TextInputApp
            title={t(TranslationKeys.NAME)}
            value={name}
            onChangeText={handleTextInput}
            placeholder={t(TranslationKeys.PLACEHOLDER_NAME)}
            keyboardType="ascii-capable"
            returnKeyType={'done'}
            autoFocus={false}
            maxLength={12}
          />
          <TextInputApp
            title={t(TranslationKeys.USER_NAME)}
            value={name}
            onChangeText={handleTextInput}
            placeholder={t(TranslationKeys.PLACEHOLDER_NAME)}
            keyboardType="ascii-capable"
            returnKeyType={'done'}
            autoFocus={false}
            maxLength={12}
          />
          <TextInputApp
            title={t(TranslationKeys.PHONE)}
            value={phoneNum}
            onChangeText={handleTextInputPhone}
            placeholder={t(TranslationKeys.PLACEHOLDER_PHONE_NUMBER)}
            keyboardType="number-pad"
            returnKeyType={'done'}
            autoFocus={false}
            maxLength={12}
          />
          <TextInputApp
            title={t(TranslationKeys.BIO)}
            value={bio}
            maxLength={220}
            onChangeText={handleTextInputBio}
            placeholder={t(TranslationKeys.BIO)}
            keyboardType="ascii-capable"
            autoFocus={false}
            // autoCorrect={false}
            multiline
            onFocus={() => {}} // <- your coordinates here
            textAlignVertical="top"
            inputStyle={{ height: 120 }}
            scrollEnabled={false}
          />

          <Text style={styles.txtBioCount}>{`${bio.length}/220`}</Text>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={[styles.bottomContainer, { height: 60 + insets.bottom }]}>
        <ButtonTitle
          backgroundColor={ColorsApp.theme}
          colorTitle={ColorsApp.white}
          title={t(TranslationKeys.SAVE)}
          showLoading={false}
          activityIndicatorColor={ColorsApp.white}
          disabled={false}
          onPress={onPressNext}
        />
      </View>
      {/* <ModalImagesPicker isShow={true} /> */}
      <ActionSheet
        ref={actionSheetRef}
        title={'Choose Photo'}
        options={['Camera', 'Gallery', 'Cancel']}
        cancelButtonIndex={2}
        onPress={onPressActionSheetResp}
      />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsApp.white,
    paddingHorizontal: 25
  },
  imgProfile: {
    height: 100,
    width: 100
  },
  header: {
    alignItems: 'center',
    marginTop: 25
  },
  btnChangePhoto: {
    height: 30,
    width: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerProfileImg: {
    height: 100,
    aspectRatio: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },

  containerEditIcon: {
    position: 'absolute',
    bottom: -15,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
  },
  txtBioCount: {
    ...Fonts.poppins13,
    alignSelf: 'flex-end'
  },
  bottomContainer: {
    alignItems: 'center'
  }
});
