import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { selectAppOptions, showDashboardStatusChange, signout, updateAppPin } from '../../redux/reducers/appOptionsSlice';
import StylesG from '../../utilities/stylesG';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { TranslationKeys } from '../../i18n/language';

import OTPInputView from '../components/react-native-otp-input/dist';
import { Fonts } from '../../utilities/fonts';
import { ButtonTitle, Loader, TextInputApp } from '../components';

import {
    HEIGHT_SCREEN,
    WIDTH_SCREEN,
    spaceLeftRight,
    spaceLeftRightAuth,
} from '../../constants/constants';
import { ColorsApp } from '../../utilities/colors';
import { alertShow } from '../../utilities/alerts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackRoots } from '../../navigation/AuthNavigation';
import { loginWithPinCode, pinSetup, sendOTPUser } from '../../network/managers/authAPI';
import ViewKeyboard from './components/viewKeyboard';
import Images, { Icon, Icons } from '../../assets/images';
import BoxPin from './components/boxPin';



const LoginWithPin = ({ navigation }: any) => {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch()
    const refPinInput = useRef<OTPInputView>(null)
    const { userInfo } = useSelector(selectAppOptions)
    const [pinCode, setPinCode] = useState<string>('')
    const [info, setInfo] = useState({
        loading: false,
        title: 'Set Pin Code',
        pin: ['-', '-', '-', '-'],
        showButton: false
    })

    useEffect(() => {
        if (refPinInput.current) {
            // refPinInput.current.focusField(0)
        }
    }, [])

    const onPressKey = (value: string) => {

        if (value.length === 0) {

            var arrPinNumbers = info.pin.join(",").match(/\d/g);
            if (arrPinNumbers && arrPinNumbers.length > 0) {
                const arrPinVerify = [...info.pin]
                arrPinVerify[arrPinNumbers.length - 1] = '-'
                console.log(arrPinVerify)
                setInfo(prevState => ({
                    ...prevState,
                    pin: arrPinVerify
                }))
            }
        }
        else if (info.pin.includes('-')) {
            const pinNew = info.pin.join(",").replace("-", value).split(",")
            let showButton = false
            var arrPinNumbers = pinNew.join(",").match(/\d/g);
            if (arrPinNumbers && arrPinNumbers?.length === 4) {
                showButton = true
            }
            setInfo(prevState => ({
                ...prevState,
                pin: pinNew,
                showButton
            }))
        }
    }

    const onPressLogin = async () => {
        if (pinCode.trim().length < 4) {
            alertShow({ msg: t(TranslationKeys.ERROR_ENTER_4_DIGIT_PIN), buttonTitle: t(TranslationKeys.OK) })
            return
        }
        setInfo(prevState => ({
            ...prevState,
            loading: true
        }))

        const resp = await loginWithPinCode({ pin: pinCode })

        setTimeout(() => {
            if (resp.status == true) {
                dispatch(updateAppPin({ pin: pinCode }))
            }
            else {
                alertShow({ msg: resp.error, buttonTitle: 'Ok' })
            }
            setInfo(prevState => ({
                ...prevState,
                loading: false
            }))

        }, 2000);
    }

    const onPressForgotPin = () => {
        navigation.navigate('EnterPhone')
    }

    const onPressClear = () => {
        if (refPinInput.current) {
            refPinInput.current.clearAllFields()
            setPinCode('')
            refPinInput.current.focusField(0)
        }


        setInfo(prevState => ({
            ...prevState,
            pin: ['-', '-', '-', '-'],
            pinReEnter: ['-', '-', '-', '-'],
            showButton: false
        }))
    }


    return (
        <SafeAreaView style={[styles.container]}>
            <View style={[styles.main, { paddingTop: insets.top }]}>
                <Image source={Images.pinVerify} style={styles.imgPinSetup} />
                <Text style={styles.subTitle}>
                    {t(TranslationKeys.DESC_PIN_LOGIN)}
                </Text>

                <OTPInputView
                    ref={refPinInput}
                    style={{
                        marginTop: 15,
                        height: 47,
                        alignSelf: 'center',
                    }}
                    selectionColor={'#FFFFF00'}
                    pinCount={4}
                    placeholderCharacter=""
                    placeholderTextColor={ColorsApp.placeHolderTxtInput}
                    autoFocusOnLoad={false}
                    code={pinCode}
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeChanged={code => {
                        setPinCode(code);
                    }}
                />
                <View style={styles.containerBtnForgot}>
                    <TouchableOpacity onPress={onPressForgotPin} style={styles.btnForgot}>
                        <Text>{t(TranslationKeys.FORGOT_PIN)}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottom}>

                    {/* <ButtonTitle
                        width={WIDTH_SCREEN - (spaceLeftRight * 2)}
                        showLoading={false}
                        backgroundColor={ColorsApp.bgScreen}
                        colorTitle={ColorsApp.black}
                        title={t(TranslationKeys.FORGOT_PIN)}
                        onPress={onPressForgotPin}
                    /> */}



                    <ButtonTitle
                        width={(WIDTH_SCREEN / 2) - (spaceLeftRight + 10)}
                        showLoading={false}
                        backgroundColor={ColorsApp.grey33}
                        colorTitle={ColorsApp.black}
                        title={t(TranslationKeys.CLEAR_PIN)}
                        onPress={onPressClear}
                    />
                    <ButtonTitle
                        width={(WIDTH_SCREEN / 2) - (spaceLeftRight + 10)}
                        backgroundColor={ColorsApp.theme}
                        colorTitle={ColorsApp.black}
                        title={t(TranslationKeys.LOGIN)}
                        showLoading={info.loading}
                        activityIndicatorColor={ColorsApp.white}
                        disabled={false}
                        onPress={onPressLogin}
                    />

                </View>

                {/* <View style={styles.containerPinRows}>
                    <View>

                        <View style={styles.rowPinCode}>
                            {info.pin.map(item =>
                                <BoxPin value={item} />
                            )}
                        </View>
                    </View>
                </View> */}

                {/* {info.showButton ?
                    <View style={styles.bottom}>

                        <ButtonTitle
                            width={WIDTH_SCREEN - (spaceLeftRight * 2)}
                            showLoading={false}
                            backgroundColor={ColorsApp.bgScreen}
                            colorTitle={ColorsApp.black}
                            title={t(TranslationKeys.FORGOT_PIN)}
                            onPress={onPressForgotPin}
                        />
                        <ButtonTitle
                            width={WIDTH_SCREEN - (spaceLeftRight * 2)}
                            backgroundColor={ColorsApp.theme}
                            colorTitle={ColorsApp.white}
                            title={t(TranslationKeys.LOGIN)}
                            showLoading={info.loading}
                            activityIndicatorColor={ColorsApp.white}
                            disabled={false}
                            onPress={onPressLogin}
                        />
                        <ButtonTitle
                            width={WIDTH_SCREEN - (spaceLeftRight * 2)}
                            showLoading={false}
                            backgroundColor={ColorsApp.grey33}
                            colorTitle={ColorsApp.black}
                            title={t(TranslationKeys.CLEAR_PIN)}
                            onPress={onPressClear}
                        />
                    </View>
                    : <ViewKeyboard onPressKey={onPressKey} />} */}

                
            </View>
            <Loader animating={info.loading} />
        </SafeAreaView>
    )
}

export default LoginWithPin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorsApp.bgScreen,
    },
    main: {
        flex: 1,
        paddingHorizontal: spaceLeftRight,
        backgroundColor: ColorsApp.bgScreen,
        // borderBottomLeftRadius: 30,
        // borderBottomRightRadius: 30,
        alignItems: 'center',

    },
    containerLogout: {
        position: 'absolute',
        right: spaceLeftRight,
        top: 20
    },
    btnLogout: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    },
    txtLogout: {
        ...Fonts.poppinsSemiBold13,
        color: ColorsApp.red
    },
    imgPinSetup: {
        marginTop: '8%',
        resizeMode: 'contain',
        height: WIDTH_SCREEN - 160,
        width: WIDTH_SCREEN - 160,

    },
    subTitle: {
        ...Fonts.poppins12,
        marginTop: '8%',
        textAlign: 'center'
    },
    containerPinRows: {
        flex: 1,
        justifyContent: 'space-around',
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
    boxPin: {
        height: 47,
        width: 47,
        borderRadius: 6,
        backgroundColor: ColorsApp.bgPin,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtPin: {
        ...Fonts.poppinsMedium17
    },
    containerBtnForgot: {
        width: '100%',
        alignItems: 'flex-end',
    },
    btnForgot: {
        paddingVertical: 10
    },
    bottom: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        gap: 20,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingBottom: '15%'
    },
    underlineStyleBase: {
        ...Fonts.poppinsSemiBold13,
        width: 47,
        height: 44,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: ColorsApp.bgTextInput,
        borderColor: ColorsApp.disableBtn,
        color: ColorsApp.black,
    },
    underlineStyleHighLighted: {
        // borderColor: ColorsApp.themeDark
        borderWidth: 2,
        borderColor: ColorsApp.themeDark
    }
})