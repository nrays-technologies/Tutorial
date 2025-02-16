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
import { spaceLeftRightAuth } from '../../constants/constants';
import ButtonTitle from '../components/buttonTitle';
import TextInputApp from '../components/textInputApp';
import StylesG from '../../utilities/stylesG';
import { ColorsApp } from '../../utilities/colors';
import { Fonts } from '../../utilities/fonts';
import Images from '../../assets/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { sendOTPUser, signupUser } from '../../network/managers/authAPI';
import { useAppDispatch } from '../../redux/store';
import { updateUserInfo } from '../../redux/reducers/appOptionsSlice';

type Props = NativeStackScreenProps<AuthStackRoots, 'EnterPhone'>;
const ForgotPinPhone = ({ navigation, route }: Props) => {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    
    const [phoneNum, setPhoneNum] = useState<string>('');
    const [disableBtn, setDisableBtn] = useState<boolean>(true);
    const [loading, setLoader] = useState<boolean>(false);

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (phoneNum.length == 10) {
            setDisableBtn(false)
        }
        else {
            setDisableBtn(true)
        }
    }, [ phoneNum])


    
    const handleTextInputPhone = (text: string) => {
        const cleaned = text.replace(/\D/g, '');
        // const formattedNumber = cleaned
        //   .replace(/^(\d{3})(\d{0,3})(\d{0,4}).*/, '$1-$2-$3')
        //   .replace(/-*$/g, '');
        setPhoneNum(cleaned);
    };



    const onPressNext = async () => {

        if (disableBtn == false) {
            setLoader(true)
            const resp = await sendOTPUser({ mobile: phoneNum })

            setTimeout(() => {
                setLoader(false)
                if (resp.status == true && resp.data) {
                    dispatch(updateUserInfo({ user: { ...resp.data, pin: null } }))
                    navigation.navigate('EnterOTP', {mobile: phoneNum})
                }
            }, 2000);

        }
    };

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

                    <Text style={styles.titleStyle}>{t(TranslationKeys.PHONE)}</Text>
                    <Text style={styles.subTitleStyle}>
                        {t(TranslationKeys.ENTER_YOUR_PHONE)}
                    </Text>
                    <TextInputApp
                        value={phoneNum}
                        onChangeText={handleTextInputPhone}
                        placeholder={t(TranslationKeys.PLACEHOLDER_PHONE_NUMBER)}
                        keyboardType="number-pad"
                        returnKeyType={'done'}
                        autoFocus={false}
                        maxLength={10}
                    />


                </ScrollView>
            </KeyboardAvoidingView>
            <View style={[styles.bottomContainer, { height: 60 + insets.bottom }]}>
                <ButtonTitle
                    backgroundColor={ColorsApp.theme}
                    colorTitle={ColorsApp.white}
                    title={t(TranslationKeys.NEXT)}
                    showLoading={loading}
                    activityIndicatorColor={ColorsApp.white}
                    disabled={disableBtn}
                    onPress={onPressNext}
                />
            </View>
            {/* <ModalImagesPicker isShow={true} /> */}
            {/* <ActionSheet
          ref={actionSheetRef}
          title={'Choose Photo'}
          options={['Camera', 'Gallery', 'Cancel']}
          cancelButtonIndex={2}
          onPress={onPressActionSheetResp}
        /> */}
        </View>
    );
};

export default ForgotPinPhone


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: ColorsApp.white,
      paddingHorizontal: 25
    },
    titleStyle: {
      marginTop: 20,
      ...Fonts.poppinsSemiBold24,
    },
    subTitleStyle: {
      ...Fonts.poppins13,
      marginBottom: 20
    },
  
    bottomContainer: {
      alignItems: 'center'
    }
  });
  