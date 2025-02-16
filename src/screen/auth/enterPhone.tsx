import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  Image,
  Platform
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackRoots } from '../../navigation/AuthNavigation';
import { useTranslation } from 'react-i18next';
import { TranslationKeys } from '../../i18n/language';
import { HEIGHT_SCREEN, spaceLeftRight, spaceLeftRightAuth, WIDTH_SCREEN } from '../../constants/constants';
import ButtonTitle from '../components/buttonTitle';
import TextInputApp from '../components/textInputApp';
import StylesG from '../../utilities/stylesG';
import { ColorsApp } from '../../utilities/colors';
import { Fonts } from '../../utilities/fonts';
import Images from '../../assets/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppDispatch } from '../../redux/store';
import { signout, updateUserInfo } from '../../redux/reducers/appOptionsSlice';
import { alertShow } from '../../utilities/alerts';
import { sendOTPUser } from '../../network/managers/authAPI';
import HighLight from 'react-native-highlight-word';


const EnterPhone = ({ navigation }: any) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const insets = useSafeAreaInsets();

  const [phoneNum, setPhoneNum] = useState<string>('9802244899')
  const [acceptTC, setAcceptTC] = useState<boolean>(false);
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);

  const onPressLogin = async () => {


    if (acceptTC === false) {
      alertShow({ msg: "Accept term & condition and Privacy Policy", buttonTitle: t(TranslationKeys.OK) })
      return
    }

    // if (accessToken && userInfo && userInfo.pin && userInfo.pin != null) {
    //     setLoadingLogin(true)
    //     const resp = await loginWithPinCode({ pin: pin })
    //     setTimeout(() => {
    //         setLoadingLogin(false)
    //         console.log('====================================');
    //         console.log(resp);
    //         console.log('====================================');
    //         if (resp.status == true && resp.data) {
    //             dispatch(showDashboardStatusChange(true))
    //         }
    //         else {
    //             alertShow({ msg: resp.error, buttonTitle: 'Ok' })
    //         }
    //     }, 2000);
    // }
    // else {
    // alertShow({ msg: `You don't have an account, Please signup with us` })
    // navigation.navigate('EnterOTP', { mobile: phoneNum })
    dispatch(signout())
    setLoadingLogin(true)
    const resp = await sendOTPUser({ mobile: phoneNum })
    setTimeout(() => {
      setLoadingLogin(false)
      if (resp.status == true) {
        navigation.navigate('EnterOTP', { mobile: phoneNum })
      }
      else {
        alertShow({ msg: resp.error, buttonTitle: 'Ok' })
      }
    }, 2000);
    // }
  }

  const handleTextInputPhone = (value: string) => {
    setPhoneNum(value)
  }
  const onPressHightlightWord = (value) => {
    console.log(value)
  }
  const onPressCheckbox = () => {
    setAcceptTC(!acceptTC)
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={'padding'}>
        <View style={styles.containerContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{t(TranslationKeys.WELCOME_TO_DC_ENERGIES)}</Text>
            <Image source={Images.rikshaAuth} style={styles.imgRicksaw} />
          </View>
          <View style={styles.center}>
            <Text style={styles.subTitle}>
              {t(TranslationKeys.ENTER_MOBILE_NUMBER)}
            </Text>
            <TextInputApp
              // title={t(TranslationKeys.PHONE)}
              value={phoneNum}
              onChangeText={handleTextInputPhone}
              placeholder={t(TranslationKeys.PLACEHOLDER_PHONE_NUMBER)}
              keyboardType="number-pad"
              returnKeyType={'done'}
              autoFocus={false}
              maxLength={10}
            />
            <View style={styles.containerTcAndPP}>
              <Pressable style={styles.btnCheckbox} onPress={onPressCheckbox}>
                <View style={styles.checkBox}>
                  {acceptTC && <Text style={styles.tick}>✔</Text>}
                </View>
              </Pressable>
              <View style={{ flex: 1 }}>
                <HighLight
                  paragraph={t(TranslationKeys.BY_CONTINUEING_TC_AND_PP)}
                  substrings={[t(TranslationKeys.TERMS_CONDITIONS), t(TranslationKeys.PRIVACY_POLICY)]}
                  paragraphStyle={styles.paragraph}
                  highlightStyle={styles.paragraphHighLight}
                  showHighlightColor={true}
                  onPressWord={onPressHightlightWord} />
              </View>
            </View>

          </View>
          <View style={{ gap: 15 }}>
            <ButtonTitle
              width={WIDTH_SCREEN - (spaceLeftRight * 2)}
              title={t(TranslationKeys.LOGIN)}
              backgroundColor={ColorsApp.theme}
              colorTitle={ColorsApp.white}
              showLoading={loadingLogin}
              activityIndicatorColor={ColorsApp.white}
              disabled={phoneNum.length == 10 ? false : true}
              onPress={onPressLogin}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EnterPhone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsApp.bgScreen,
  },
  containerContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: '10%'
  },
  header: {
    alignItems: 'center',
    gap: 20,
    borderColor: 'red',
    borderWidth: 0,
  },
  title: {
    marginTop: '8%',
    ...Fonts.poppinsSemiBold24,
  },
  imgRicksaw: {
    height: '50%',
    aspectRatio: 1
  },
  subTitle: {
    ...Fonts.poppinsSemiBold18,
    marginTop: 10,
  },
  center: {
    paddingHorizontal: spaceLeftRight,
    gap: 10,
    borderColor: 'red',
    borderWidth: 0,

  },
  containerTcAndPP: {
    width: WIDTH_SCREEN - spaceLeftRight,
    flexDirection: 'row',
    gap: 10
  },
  btnCheckbox: {
    paddingVertical: 4
  },
  checkBox: {
    borderWidth: 1,
    borderColor: ColorsApp.black,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  tick: {
    ...Fonts.poppins12,
    fontSize: 10
  },
  paragraph: {
    ...Fonts.poppins13
  },
  paragraphHighLight: {
    ...Fonts.poppinsMedium13,
    color: ColorsApp.link
  },
  viewBottomButton: {
    height: 100
  }
})
