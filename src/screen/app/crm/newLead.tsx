import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { ColorsApp } from '../../../utilities/colors'
import { ButtonTitle, Loader, SelectionList, TextInputApp } from '../../components'
import { useTranslation } from 'react-i18next'
import { TranslationKeys } from '../../../i18n/language'
import { spaceLeftRight } from '../../../constants/constants'
import { IInfoCreateLead } from '../../../modelTypeScript'
import { createNewLead } from '../../../network/managers/crmAPI'
import { alertShow } from '../../../utilities/alerts'
import { SelectList } from 'react-native-dropdown-select-list'
import { useSelector } from 'react-redux'
import { selectCrmOptions } from '../../../redux/reducers/crmSlice'


const NewLead = ({ navigation }: any) => {
    const { t } = useTranslation()

    const { lead_sources, lead_statuses } = useSelector(selectCrmOptions)

    const [info, setInfo] = useState<IInfoCreateLead>({
        isLoading: false,
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        lead_source: '',
        lead_statuses: '',
        alternate_contact: "",
        address_1: "",
        address_2: "",
        address_city: "",
        address_state: "",
        address_pincode: ""
    })
    // const [info, setInfo] = useState<IInfoCreateLead>({
    //     isLoading: false,
    //     first_name: "Joy",
    //     last_name: "Doe",
    //     email: "",
    //     mobile: "9876543210",
    //     lead_source: '',
    //     lead_statuses: '',
    //     alternate_contact: "9876543210",
    //     address_1: "#321",
    //     address_2: "Neae: School",
    //     address_city: "Ludhiana",
    //     address_state: "Punjab",
    //     address_pincode: "141001"
    // })

    const dataLeadStatus = useMemo(() => lead_statuses.map((item) => { return { key: item.id, value: item.name } }), [lead_statuses])
    const dataLeadSources = useMemo(() => lead_sources.map((item) => { return { key: item.id, value: item.name } }), [lead_sources])

    const onChangeText = (value, key) => {
        console.log(key);
        let a = { ...info }
        a[key] = value
        setInfo(a)
    }

    console.log(info);


    const onPressSave = async () => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        const { first_name, last_name, mobile, alternate_contact, lead_source, lead_statuses, email } = info

        console.log('====================================222', email, reg.test(email) === true);
        if (first_name.trim().length === 0) {
            console.log('=============');
            alertShow({ msg: 'Enter your first name', buttonTitle: 'Ok' })
        }

        else if (last_name.trim().length === 0) {
            console.log('==================');
            alertShow({ msg: 'Enter your last name', buttonTitle: 'Ok' })
        }
        else if (mobile.trim().length === 0 || mobile.trim().length < 10) {
            console.log('======================');
            alertShow({ msg: 'Enter your valid mobile number', buttonTitle: 'Ok' })
        }
        else if (alternate_contact.trim().length > 0 && alternate_contact.trim().length < 10) {
            console.log('======================');
            alertShow({ msg: 'Enter your valid alternate phone number', buttonTitle: 'Ok' })
        }
        else if (lead_source.trim().length === 0) {
            console.log('===============================');
            alertShow({ msg: 'Select lead source', buttonTitle: 'Ok' })
        }
        else if (email.trim().length > 0 && reg.test(email) === false) {
            console.log('===============================');
            alertShow({ msg: 'Enter valid email id', buttonTitle: 'Ok' })
        }
        else {
            console.log('====================================11');
            setInfo((prevState) => ({
                ...prevState,
                isLoading: true
            }))
            const resp = await createNewLead(info)
            setInfo((prevState) => ({
                ...prevState,
                isLoading: false
            }))
            if (resp.status === true) {
                navigation.pop()
            }
            else {
                alertShow({ msg: resp.message, buttonTitle: 'Ok' })
            }
        }
    }

    const onSelectStatus = (value) => {
        console.log("onSelectStatus -- ", value);
        setInfo((prevState) => ({
            ...prevState,
            lead_statuses: value.join(",")
        }))

    }
    const onSelectSources = (value) => {
        console.log("onSelectSources -- ", value);
        setInfo((prevState) => ({
            ...prevState,
            lead_source: value.toString()
        }))
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 65 : 0}>
                <ScrollView style={styles.styleScroll}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}>
                    <TextInputApp
                        title={t(TranslationKeys.FIRST_NAME)}
                        value={info.first_name}
                        onChangeText={(value) => onChangeText(value, 'first_name')}
                        placeholder={t(TranslationKeys.PLACEHOLDER_FIRST_NAME)}

                        returnKeyType={'done'}
                        autoFocus={false}
                        inputStyle={styles.inputStyle}
                    />

                    <TextInputApp
                        title={t(TranslationKeys.LAST_NAME)}
                        value={info.last_name}
                        onChangeText={(value) => onChangeText(value, 'last_name')}
                        placeholder={t(TranslationKeys.PLACEHOLDER_LAST_NAME)}

                        returnKeyType={'done'}
                        autoFocus={false}
                        inputStyle={styles.inputStyle}
                    />
                    <TextInputApp
                        title={t(TranslationKeys.PHONE)}
                        value={info.mobile}
                        onChangeText={(value) => onChangeText(value, 'mobile')}
                        placeholder={t(TranslationKeys.PLACEHOLDER_PHONE_NUMBER)}
                        keyboardType="number-pad"
                        returnKeyType={'done'}
                        autoFocus={false}
                        maxLength={10}
                        inputStyle={styles.inputStyle}
                    />
                    <TextInputApp
                        title={t(TranslationKeys.ALTERNATE_NUMBER)}
                        value={info.alternate_contact}
                        onChangeText={(value) => onChangeText(value, 'alternate_contact')}
                        placeholder={t(TranslationKeys.PLACEHOLDER_ALTERNATE_NUMBER)}
                        keyboardType="number-pad"
                        returnKeyType={'done'}
                        autoFocus={false}
                        maxLength={10}
                        inputStyle={styles.inputStyle}
                    />
                    {dataLeadSources.length > 0 && <SelectionList data={dataLeadSources} title='Source' onSelectValue={onSelectSources} />}
                    {dataLeadStatus.length > 0 && <SelectionList data={dataLeadStatus} title='Status' isMultiSelection={true} onSelectValue={onSelectStatus} />}

                    <TextInputApp
                        title={t(TranslationKeys.EMAIL)}
                        value={info.email}
                        onChangeText={(value) => onChangeText(value, 'email')}
                        placeholder={t(TranslationKeys.PLACEHOLDER_EMAIL)}
                        keyboardType="email-address"
                        returnKeyType={'done'}
                        autoFocus={false}

                        inputStyle={styles.inputStyle}
                    />
                    <TextInputApp
                        title={t(TranslationKeys.ADDRESS)}
                        value={info.address_1}
                        onChangeText={(value) => onChangeText(value, 'address_1')}
                        placeholder={t(TranslationKeys.PLACEHOLDER_ADDRESS)}
                        returnKeyType={'done'}
                        autoFocus={false}
                        inputStyle={styles.inputStyle}
                    />
                    <TextInputApp
                        title={t(TranslationKeys.NEARBY)}
                        value={info.address_2}
                        onChangeText={(value) => onChangeText(value, 'address_2')}
                        placeholder={t(TranslationKeys.PLACEHOLDER_NEARBY)}
                        returnKeyType={'done'}
                        autoFocus={false}
                        inputStyle={styles.inputStyle}
                    />
                    <TextInputApp
                        title={t(TranslationKeys.CITY)}
                        value={info.address_city}
                        onChangeText={(value) => onChangeText(value, 'address_city')}
                        placeholder={t(TranslationKeys.PLACEHOLDER_CITY)}
                        returnKeyType={'done'}
                        autoFocus={false}
                        inputStyle={styles.inputStyle}
                    />
                    <TextInputApp
                        title={t(TranslationKeys.STATE)}
                        value={info.address_state}
                        onChangeText={(value) => onChangeText(value, 'address_state')}
                        placeholder={t(TranslationKeys.PLACEHOLDER_STATE)}
                        returnKeyType={'done'}
                        autoFocus={false}
                        inputStyle={styles.inputStyle}
                    />
                    <TextInputApp
                        title={t(TranslationKeys.PIN_CODE)}
                        value={info.address_pincode}
                        onChangeText={(value) => onChangeText(value, 'address_pincode')}
                        placeholder={t(TranslationKeys.PLACEHOLDER_PIN_CODE)}
                        keyboardType="number-pad"
                        returnKeyType={'done'}
                        autoFocus={false}
                        maxLength={6}
                        inputStyle={styles.inputStyle}
                    />

                    <View style={styles.containerBtn}>
                        <ButtonTitle
                            title={t(TranslationKeys.SAVE)}
                            onPress={onPressSave}
                            //  width={WIDTH_SCREEN - (spaceLeftRight * 2)}
                            backgroundColor={ColorsApp.theme}
                            colorTitle={ColorsApp.white}

                            showLoading={false}
                            activityIndicatorColor={ColorsApp.white}
                        />
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
            <Loader animating={info.isLoading} />
        </View>
    )
}

export default NewLead

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorsApp.white
    },
    styleScroll: {
        flex: 1,
        paddingHorizontal: spaceLeftRight
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: ColorsApp.grey99
    },
    containerBtn: {
        paddingVertical: 25
    }
})