import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ButtonTitle, SelectionList, TextInputApp } from '../../components';
import { useSelector } from 'react-redux';
import { selectCrmOptions } from '../../../redux/reducers/crmSlice';
import { useTranslation } from 'react-i18next';
import { TranslationKeys } from '../../../i18n/language';
import { ColorsApp } from '../../../utilities/colors';
import { Fonts } from '../../../utilities/fonts';
import { spaceLeftRight } from '../../../constants/constants';
import { getDateFrom } from '../../../utilities';
import { alertShow } from '../../../utilities/alerts';
import { addFollowup, updateFollowup } from '../../../network/managers/crmAPI';
import { useAppDispatch } from '../../../redux/store';
import { getFollowup } from '../../../redux/reducers/crmLeadDetailsSlice';

interface IInfo {
    customer_id: number
    followup_datetime: string;
    followup_datetime_show: string;
    followup_mode: number;
    followup_mode_val: string
    followup_status: number
    followup_status_val: string
    priority: number;
    priority_val: string;
    notes: string
}

const Followup = ({ navigation, route }: any) => {
    const { customer_id, id } = route.params

    const { t } = useTranslation()

    const { followup_mode, followup_status, priorities } = useSelector(selectCrmOptions)
    const dispatch = useAppDispatch()
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const arrFollowupMode = useMemo(() => followup_mode.map((item) => { return { key: item.id, value: item.name } }), [followup_mode])
    const arrFollowupStatus = useMemo(() => followup_status.map((item) => { return { key: item.id, value: item.name } }), [followup_status])
    const arrPriorities = useMemo(() => priorities.map((item) => { return { key: item.id, value: item.name } }), [priorities])

    const [info, setInfo] = useState<IInfo>({
        customer_id: customer_id,
        followup_datetime: "Select Date time",
        followup_datetime_show: 'Select Date time',
        followup_mode: arrFollowupMode[0].key,
        followup_mode_val: arrFollowupMode[0].value,
        followup_status: arrFollowupStatus[0].key,
        followup_status_val: arrFollowupStatus[0].value,
        priority: arrPriorities[0].key,
        priority_val: arrPriorities[0].value,
        notes: '',
    });

    useEffect(() => {
        const { customer_id, followup_datetime,
            followup_mode,
            followup_mode_val,
            followup_status,
            followup_status_val,
            priority,
            priority_val,
            notes
        } = route.params

        setInfo((prevState) => ({
            ...prevState,
            followup_datetime: followup_datetime ?? "Select Date time",
            followup_datetime_show: getDateFrom({ date: followup_datetime, format: 'YYYY-MM-DD HH:mm' }),
            followup_mode: followup_mode ?? arrFollowupMode[0].key,
            followup_mode_val: followup_mode_val ?? arrFollowupMode[0].value,
            followup_status: followup_status ?? arrFollowupStatus[0].key,
            followup_status_val: followup_status_val ?? arrFollowupStatus[0].value,
            priority: priority ?? arrPriorities[0].key,
            priority_val: priority_val ?? arrPriorities[0].value,
            notes: notes ?? '',
        }))

    }, [])

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);

        setInfo((prevState) => ({
            ...prevState,
            followup_datetime: getDateFrom({ date: date, format: 'YYYY-MM-DDTHH:mm' }),
            followup_datetime_show: getDateFrom({ date: date, format: 'YYYY-MM-DD HH:mm' }),
        }))
        hideDatePicker();
    };

    const onSelectMode = (value) => {
        console.log("onSelectMode -- ", value);
        setInfo((prevState) => ({
            ...prevState,
            followup_mode: value,
            followup_mode_val: arrFollowupMode.filter(item => item.key == value)[0].value,
        }))
    }

    const onSelectStatus = (value) => {
        console.log("onSelectStatus -- ", value);
        setInfo((prevState) => ({
            ...prevState,
            followup_status: value,
            followup_status_val: arrFollowupStatus.filter(item => item.key == value)[0].value,
        }))

    }
    const onSelectPriorties = (value) => {
        console.log("onSelectPriorties -- ", value);
        setInfo((prevState) => ({
            ...prevState,
            priority: value,
            priority_val: arrPriorities.filter(item => item.key == value)[0].value,
        }))

    }
    const onChangeText = (value: string) => {
        setInfo((prevState) => ({
            ...prevState,
            notes: value
        }))
    }
    const onPressAddUpdate = async () => {

        const { customer_id, followup_mode, followup_status, followup_datetime, notes, priority } = info

        if (followup_datetime === "Select Date time") {
            alertShow({ msg: "Please select date time", buttonTitle: t(TranslationKeys.OK) })
        }
        else {
            let resp
            if (id) {
                resp = await updateFollowup({
                    id,
                    followup_mode,
                    followup_status,
                    followup_datetime,
                    notes,
                    priority
                })
            }
            else {
                resp = await addFollowup({
                    customer_id,
                    followup_mode,
                    followup_status,
                    followup_datetime,
                    notes,
                    priority
                })
            }

            alertShow({ msg: resp.message, buttonTitle: t(TranslationKeys.OK) })
            if (resp.status === true) {
                dispatch(getFollowup(customer_id))
                navigation.pop()
            }
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 65 : 0}>
                <ScrollView style={styles.styleScroll}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}>
                    <Text style={styles.title}>Followup Date Time</Text>
                    <Pressable style={styles.dateTime} onPress={showDatePicker}>
                        <Text>{info.followup_datetime_show}</Text>
                    </Pressable>
                    <SelectionList data={arrFollowupMode} title='Followup Mode*' onSelectValue={onSelectMode} selectedValue={{ key: info.followup_mode, value: info.followup_mode_val }} />
                    <SelectionList data={arrFollowupStatus} title='Followup Status' onSelectValue={onSelectStatus} selectedValue={{ key: info.followup_status, value: info.followup_status_val }} />
                    <SelectionList data={arrPriorities} title='Followup Priorty' onSelectValue={onSelectPriorties} selectedValue={{ key: info.priority, value: info.priority_val }} />

                    <TextInputApp
                        title='Note'
                        value={info.notes}
                        onChangeText={onChangeText}
                        placeholder={t(TranslationKeys.PLACEHOLDER_FIRST_NAME)}
                        returnKeyType={'done'}
                        autoFocus={false}
                        inputStyle={styles.inputStyle}
                    />

                    <View style={styles.containerBtn}>
                        <ButtonTitle
                            title='Add'
                            onPress={onPressAddUpdate}
                            //  width={WIDTH_SCREEN - (spaceLeftRight * 2)}
                            backgroundColor={ColorsApp.theme}
                            colorTitle={ColorsApp.white}

                            showLoading={false}
                            activityIndicatorColor={ColorsApp.white}
                        />
                    </View>

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="datetime"
                        timeZoneName='IST'
                        minimumDate={new Date()}
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default Followup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorsApp.white
    },
    styleScroll: {
        flex: 1,
        paddingHorizontal: spaceLeftRight
    },
    dateTime: {
        width: '100%',
        height: 48,
        justifyContent: 'center',
        borderRadius: 12,
        paddingHorizontal: 15,
        borderColor: ColorsApp.grey99,
        borderWidth: 1
    },
    textStyle: {
        ...Fonts.poppinsLight13,
        flex: 1,
        color: ColorsApp.black,
    },
    title: {
        marginTop: 19,
        marginBottom: 8,
        ...Fonts.poppins13,
    },
    inputStyle: {
        borderColor: ColorsApp.grey99,
        borderWidth: 1,
        borderRadius: 12,
    },
    containerBtn: {
        paddingVertical: 25
    },
})