import React, { useState } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { pinSetup } from '../../network/managers/authAPI'
import { updateAppPin } from '../../redux/reducers/appOptionsSlice'
import { useAppDispatch } from '../../redux/store'
import { alertShow } from '../../utilities/alerts'
import { ButtonTitle, Loader } from '../components'
import { ColorsApp } from '../../utilities/colors'
import { spaceLeftRight, WIDTH_SCREEN } from '../../constants/constants'
import Images from '../../assets/images'
import { useTranslation } from 'react-i18next'
import { TranslationKeys } from '../../i18n/language'
import { Fonts } from '../../utilities/fonts'
import OTPInputView from '../components/react-native-otp-input/dist';

const PinSetup = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const [info, setInfo] = useState({
    loading: false,
    pin: '',
    showButton: false
  })

  const onPressSubmit = async () => {
    setInfo(prevState => ({
      ...prevState,
      loading: true
    }))

    const resp = await pinSetup({ pin: info.pin })

    setTimeout(() => {
      setInfo(prevState => ({
        ...prevState,
        loading: false
      }))
      if (resp.status == true) {
        dispatch(updateAppPin({ pin: info.pin }))
      }
      else {
        alertShow({ msg: resp.error, buttonTitle: 'Ok' })
      }
    }, 2000);
  }

  const onPressClear = () => {
    setInfo(prevState => ({
      ...prevState,
      pin: '',
      showButton: false
    }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Image resizeMode='center' source={Images.pinSetup} style={styles.imgPinSetup} />
        <Text style={styles.subTitle}>
          {t(TranslationKeys.DESC_SET_UP_YOUR_PIN)}
        </Text>
        
        <View style={styles.containerPinRows}>
          <Text style={styles.titleRow}>{t(TranslationKeys.PIN_CODE)}</Text>
          <OTPInputView
          style={{
            height: 47,
            alignSelf: 'center',
          }}
          pinCount={4}
          placeholderCharacter=""
          placeholderTextColor={ColorsApp.placeHolderTxtInput}
          autoFocusOnLoad={false}
          code={info.pin}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeChanged={code => {
            
            setInfo(prevState => ( {
              ...prevState,
              pin: code,
              
            }));
          }}
        />
        </View>
        
          <View style={styles.bottom}>
            <ButtonTitle
              width={WIDTH_SCREEN - (spaceLeftRight * 2)}
              backgroundColor={ColorsApp.theme}
              colorTitle={ColorsApp.white}
              title={t(TranslationKeys.SUBMIT)}
              showLoading={info.loading}
              
              activityIndicatorColor={ColorsApp.white}
              disabled={info.pin.length != 4}
              onPress={onPressSubmit}
            />
            <ButtonTitle
              width={WIDTH_SCREEN - (spaceLeftRight * 2)}
              showLoading={false}
              backgroundColor={ColorsApp.bgScreen}
              colorTitle={ColorsApp.black}
              title={t(TranslationKeys.RESET_PIN)}
              onPress={onPressClear}
            />
          </View>
         
      </View>
      <Loader animating={info.loading} />
    </SafeAreaView>
  )
}

export default PinSetup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsApp.bgScreen,
  },
  main: {
    flex: 1,
    paddingHorizontal: spaceLeftRight,
    alignItems: 'center'
  },
  imgPinSetup: {
    marginTop: '10%',
    resizeMode: 'contain',
    height: '26%',
    aspectRatio: 1

  },
  subTitle: {
    ...Fonts.poppins12,
    marginTop: '5%',
    textAlign: 'center'
  },
  containerPinRows: {
    flex: 1,
    paddingTop: '8%',
    gap: 10,
    borderWidth: 0,
    borderColor: 'red'
  },
  titleRow: {
    marginBottom: 5,
    ...Fonts.poppins12,
  },
  rowPinCode: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  bottom: {
    flex: 1,
    gap: 6,
    height: 150,
    justifyContent: 'flex-end',
    paddingBottom: '5%'
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
})