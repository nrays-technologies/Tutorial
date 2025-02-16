import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Animated,
  Easing,
  SafeAreaView,
  Image,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackRoots } from '../../navigation/AuthNavigation';
import OTPInputView from '../components/react-native-otp-input/dist';
import { useTranslation } from 'react-i18next';
import { TranslationKeys } from '../../i18n/language';
import { HEIGHT_SCREEN, spaceLeftRight, spaceLeftRightAuth, WIDTH_SCREEN } from '../../constants/constants';
import { ButtonTitle } from '../components';
import Images from '../../assets/images';
import StylesG from '../../utilities/stylesG';
import { Fonts } from '../../utilities/fonts';
import { ColorsApp } from '../../utilities/colors';
import { sendOTPUser, verificationOTPUser } from '../../network/managers/authAPI';
import { useSelector } from 'react-redux';
import { selectAppOptions, updateAuthInfoWithToken } from '../../redux/reducers/appOptionsSlice';
import { useAppDispatch } from '../../redux/store';
import { alertShow } from '../../utilities/alerts';

type Props = NativeStackScreenProps<AuthStackRoots, 'EnterOTP'>;

const EnterOTP = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const mobile = route.params.mobile
  const { userInfo } = useSelector(selectAppOptions)
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [otpTxt, setOtpTxt] = useState<string>('');
  const [seconds, setSeconds] = useState<number>(60);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const dispatch = useAppDispatch()

  const startAnimation = () => {
    setOtpTxt('');
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      rotateAnim.setValue(0);
      resendOtp();
    });
  };

  const rotateStyle = {
    transform: [
      {
        rotate: rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);
    if (seconds === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds]);

  const onPressNext = async () => {
    
    if (otpTxt.length === 4) {
      setIsLoader(true);

      const resp = await verificationOTPUser({ mobile: mobile, code: otpTxt })

      console.log(resp);
      
      setTimeout(() => {
        setIsLoader(false);
        if (resp.status == true && resp.data) {
          dispatch(updateAuthInfoWithToken({ ...resp.data }))
          navigation.navigate('PinSetup')
        }
        else {
          alertShow({ msg: resp.error, buttonTitle: 'Ok' })
        }

      }, 2000);
    }

  };

  const resendOtp = async () => {

    

    const resp = await sendOTPUser({ mobile: mobile })
    if (resp.status == true) {
      setSeconds(60);
      alertShow({ msg: 'Sent OTP on your mobile number', buttonTitle: 'Ok' })
    }
    else {
      alertShow({ msg: resp.error, buttonTitle: 'Ok' })
    }
  };

  return (

    <View style={[styles.container]}>
      
        <Text style={styles.title}>{mobile}</Text>

        <Text style={styles.subTitle}>
          {t(TranslationKeys.PLEASE_ENTER_THE_4_DIGIT)}
        </Text>

        <OTPInputView
          style={{
            height: 47,
            alignSelf: 'center',
          }}

          // selectionColor={'#FFFFF00'}
          pinCount={4}
          placeholderCharacter=""
          placeholderTextColor={ColorsApp.placeHolderTxtInput}
          autoFocusOnLoad={false}
          code={otpTxt}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeChanged={code => {
            setOtpTxt(code);
          }}
        />
        <View style={styles.bottom}>

          <Image resizeMode='contain' source={Images.otpAuth} style={styles.imgOtpAuth} />

          {seconds != 0 && (
            <Text style={styles.resendCodeAfter}>
              {`${t(TranslationKeys.RESEND_CODE_IN)} `}
              <Text style={styles.counter}>
                {seconds > 0 ? seconds : 0} seconds
              </Text>
            </Text>
          )}

          {seconds == 0 && (
            <TouchableOpacity
              onPress={startAnimation}
              style={styles.btnResendOTP}>
              <Animated.View style={[rotateStyle]}>
                <Images.resendOtp />
              </Animated.View>

              <Text style={styles.resendCode}>{t(TranslationKeys.RESEND)}</Text>
            </TouchableOpacity>
          )}
          <ButtonTitle
          width={WIDTH_SCREEN - (spaceLeftRight * 2)}
            backgroundColor={ColorsApp.theme}
            colorTitle={ColorsApp.white}
            title={t(TranslationKeys.NEXT)}
            showLoading={isLoader}
            activityIndicatorColor={ColorsApp.white}
            disabled={otpTxt.length >= 4 ? false : true}
            onPress={onPressNext}
          />
        </View>

        {/* <View style={styles.button}>
          
        </View> */}
      
    </View>

  );
};

export default EnterOTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsApp.bgScreen,
    paddingHorizontal: spaceLeftRight,
    alignItems: 'center'
  },
  title: {
    marginTop: 20,
    ...Fonts.poppinsSemiBold24,
  },
  subTitle: {
    ...Fonts.poppins12,
    marginVertical: '4%',
    textAlign: 'center'
  },
  imgOtpAuth: {
    // marginTop: '10%',
    height: '38%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  resendCode: {
    ...Fonts.poppins15,
    color: ColorsApp.black,
    marginLeft: 5,

  },
  resendCodeAfter: {
    // marginTop: '15%',
    ...Fonts.poppins15,
    color: ColorsApp.black,
    // alignSelf: 'center',
  },
  counter: {
    ...Fonts.poppinsSemiBold13,
    color: ColorsApp.black,
    alignSelf: 'center',
  },
  btnResendOTP: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
    borderWidth: 0,
    borderColor: 'red',
    // marginTop: '15%',
    // alignSelf: 'center',
  },
  button: {
    justifyContent: "flex-end",
    flex: 1,
    paddingBottom: 40,
  },
  underlineStyleBase: {
    width: 47,
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    color: ColorsApp.black,
    backgroundColor: ColorsApp.bgTextInput,
    borderColor: ColorsApp.disableBtn
  },
  underlineStyleHighLighted: {
    borderWidth: 1,
    borderColor: ColorsApp.theme,
  },
  bottom: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
});
