import React, { useEffect, useRef, useState } from 'react';
import AuthNavigation from '../navigation/AuthNavigation';
import SplashScreen from 'react-native-splash-screen';
import { selectAppOptions, showDashboardStatusChange, signout, updateAuthToken, updateUserInfo } from '../redux/reducers/appOptionsSlice';
import { useSelector } from 'react-redux';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MotiView } from 'moti';
import Images from '../assets/images';
// import AppNavigation from '../navigation/AppNavigation';
import { FontName } from '../constants/fontConst';
import { ColorsApp } from '../utilities/colors';
import { StorageKey, getObjectData, getValue } from '../utilities/storage';
import { useAppDispatch } from '../redux/store';
import AppNavigation from '../navigation/AppNavigation';
import { WIDTH_SCREEN } from '../constants/constants';
import GradientText from './components/gradientText';
import StylesG from '../utilities/stylesG';
import Pin from './auth/pin screen/pin';
import { Loader } from './components';
import { TranslationKeys } from '../i18n/language';
import { useTranslation } from 'react-i18next';
import { alertShow } from '../utilities/alerts';
import { Fonts } from '../utilities/fonts';
import LottieView from 'lottie-react-native';

const Welcome = () => {
  const { t } = useTranslation()
  const { accessToken, userInfo, showDashboard } = useSelector(selectAppOptions);
  const [hideSplash, setHideSplash] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const animationRef = useRef<LottieView>(null);

  const checkUserStatus = async () => {
    const authToken = await getValue(StorageKey.authToken);
    const userInfo = await getObjectData(StorageKey.user);

    if (authToken && authToken != null) {
      dispatch(updateAuthToken({ accessToken: authToken }));
      if (userInfo && userInfo != null) {
        dispatch(updateUserInfo({ user: userInfo }));
      }
    }
  }

  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    // animationRef.current?.play(30, 550);
  }, []);

  useEffect(() => {

    checkUserStatus()
  }, []);

  useEffect(() => {
    SplashScreen.hide();
    setTimeout(() => {
      setHideSplash(true);
    }, 3400);
  }, []);

  const onPressForgotPin = () => {
    dispatch(signout())
  }
  const onResetPin = () => { }

  const onSuccess = async (pin: string) => {
    setLoading(true)

    setTimeout(() => {
      if (userInfo?.pin === pin) {
        dispatch(showDashboardStatusChange(true))
      }
      else {
        alertShow({ msg: t(TranslationKeys.ERROR_WRONG_PIN), buttonTitle: t(TranslationKeys.OK) })
      }
      setLoading(false)
    }, 2000);

  }

  if (hideSplash === false) {
    return (
      <View style={styles.container}>
        {/* <LottieView source={require('../assets/images/lotties/SplashErick.json')} autoPlay loop /> */}
        <LottieView
          ref={animationRef}
          style={{
            width: WIDTH_SCREEN,
            height: 250,
          }}
          source={require('../assets/images/lotties/SplashErick.json')}
          autoPlay 
          loop 
        />
      </View>
    );
  }
  // if (accessToken && userInfo && userInfo.pin.length == 4 && showDashboard == false) {
  //   return (
  //     <View style={[StylesG.container, styles.containerPin]}>
  //       <Pin removePin={loading === false} title={t(TranslationKeys.ENTER_PIN)} onSuccess={onSuccess} onReset={onResetPin}/>
  //       <View style={styles.forgotPin}>
  //         <Pressable style={styles.btnForgotPin} onPress={onPressForgotPin}>
  //         <Text style={styles.btnTitleForgotPin}>Forgot Pin</Text>
  //         </Pressable>
  //       </View>
  //       <Loader animating={loading} />
  //     </View>
  //   )
  // }
  // <MotiView
  //         from={{scale: 1}}
  //         animate={{
  //           scale: [0.6, 1],
  //         }}
  //         transition={{
  //           type: 'timing',
  //           duration: 1000,
  //         }}>

  //         {/* <Image source={Images.logo} style={{height:WIDTH_SCREEN -50, width: WIDTH_SCREEN -50}}  /> */}

  //         <GradientText colors={['#cc2b5e', '#753a88']} style={styles.text}>
  //         DC Energies
  //     </GradientText>
  //       </MotiView>
  if (accessToken && userInfo && userInfo.pin.length == 4 && showDashboard == true) {
    return <AppNavigation />;
  }
  return <AuthNavigation />;
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontFamily: FontName.DancingScriptBold,

    fontSize: 80,
    color: ColorsApp.theme,
  },
  logoPart: {
    fontFamily: FontName.DancingScriptBold,

    fontSize: 40,
    color: ColorsApp.theme,
  },
  text: {
    fontSize: 35,
    fontFamily: 'Gill Sans',
    fontWeight: 'bold',
  },
  containerPin: {
    ...StyleSheet.absoluteFillObject
  },
  forgotPin: {
    position: 'absolute',
    top: 20,
    height: 50,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  btnForgotPin: {
    paddingHorizontal: 20
  },
  btnTitleForgotPin: {
    ...Fonts.poppinsSemiBold13
  }
});
