import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ButtonTitle, TextInputApp } from '../components'
import StylesG from '../../utilities/stylesG'
import { Fonts } from '../../utilities/fonts'
import { ColorsApp } from '../../utilities/colors'
import { HEIGHT_SCREEN, spaceLeftRight, spaceLeftRightAuth, WIDTH_SCREEN } from '../../constants/constants'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../redux/store'
import { useSelector } from 'react-redux'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { TranslationKeys } from '../../i18n/language'
import { selectAppOptions, showDashboardStatusChange, signout } from '../../redux/reducers/appOptionsSlice'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackRoots } from '../../navigation/AuthNavigation'
import { loginWithPinCode, sendOTPUser } from '../../network/managers/authAPI'
import { alertShow } from '../../utilities/alerts'
import Images from '../../assets/images'
import HighLight from 'react-native-highlight-word';
import EnterPhone from './enterPhone'
import LoginWithPin from './loginWithPin'

type Props = NativeStackScreenProps<AuthStackRoots, 'Authorization'>;

const Authorization = ({ navigation }: Props) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { accessToken, userInfo } = useSelector(selectAppOptions);
    const insets = useSafeAreaInsets();
    const [phoneNum, setPhoneNum] = useState<string>('9802244899')
    const [acceptTC, setAcceptTC] = useState<boolean>(false);
    const [loadingLogin, setLoadingLogin] = useState<boolean>(false);

    const onPressLogin = async () => {

        // navigation.navigate('EnterOTP', { mobile: phoneNum })
        // return
        
        if (acceptTC === false) {
            alertShow({msg: "Accept term & condition and Privacy Policy", title: t(TranslationKeys.OK)})
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


    if (accessToken) {
        return <LoginWithPin navigation={navigation}/>
    }

    return <EnterPhone navigation={navigation}/>

    return (
        

        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
            <ScrollView
            bounces={false}
                style={{ flex: 1, height: HEIGHT_SCREEN, width: WIDTH_SCREEN }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'handled'}>
                <View style={[styles.main,{ paddingTop: insets.top}]}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{t(TranslationKeys.WELCOME_TO_DC_ENERGIES)}</Text>
                        <Image source={Images.rikshaAuth} style={styles.imgRicksaw} />
                        <Text style={styles.subTitle}>
                            {t(TranslationKeys.ENTER_MOBILE_NUMBER)}
                        </Text>
                    </View>
                    <View style={styles.center}>
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
                        <ButtonTitle
                            width={WIDTH_SCREEN - (spaceLeftRight*2)}
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
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Authorization

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: ColorsApp.white
    },
    main: {
        height: HEIGHT_SCREEN - 70,
        backgroundColor: ColorsApp.bgScreen,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'space-between'
    },
    header: {
        alignItems: 'center',
        gap: 20,
    },
    title: {
        marginTop: '8%',
        ...Fonts.poppinsSemiBold24,
    },
    imgRicksaw: {
        height: WIDTH_SCREEN - 200,
        width: WIDTH_SCREEN - 200,
    },
    subTitle: {
        ...Fonts.poppinsSemiBold18,
        marginTop: 10,
        marginBottom: 20
    },
    center: {
        flex: 1,
        justifyContent: 'space-evenly',
        
        paddingHorizontal: spaceLeftRight,
        gap: 10,
        borderColor: 'red',
        borderWidth: 0
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