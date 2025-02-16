import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getLeadDetails } from '../../../network/managers/crmAPI'
import { ColorsApp } from '../../../utilities/colors';
import { useTranslation } from 'react-i18next';
import { TranslationKeys } from '../../../i18n/language';
import { Fonts } from '../../../utilities/fonts';
import { IFollowup, ILead, IRemark } from '../../../modelTypeScript';
import { callOnMobileNumber, getAddress, getDateFrom, getSourceType, getStringFrom, getTagColor } from '../../../utilities';
import { ButtonTitle, Loader } from '../../components';
import Images, { Icon, Icons } from '../../../assets/images';
import { HEIGHT_SCREEN, spaceLeftRight, WIDTH_SCREEN } from '../../../constants/constants';
import ModalAddRemark from '../../modal/modalAddRemark';
import StylesG from '../../../utilities/stylesG';
import ItemFollowup from './components/itemFollowup';
import Remarks from './view/remarks';
import Followups from './view/followups';
import { useSelector } from 'react-redux';
import { getLeadDetailsCrm, getRemarks, selectCrmLeadDetailOptions } from '../../../redux/reducers/crmLeadDetailsSlice';
import { useAppDispatch } from '../../../redux/store';
import LinearGradient from 'react-native-linear-gradient';

interface IInfo {
    loading: boolean
    data: ILead | undefined
}

interface IRemarkMadal {
    show: boolean
    remark: IRemark | undefined
}



const LeadDetails = ({ navigation, route }: any) => {

    const { t } = useTranslation()
    const { isLoading, lead, remarks, followups } = useSelector(selectCrmLeadDetailOptions)
    const dispatch = useAppDispatch()
    const [showRemarkModal, setShowRemarkModal] = useState<IRemarkMadal>({
        show: false,
        remark: undefined
    })
    // const [infoLead, setInfoLead] = useState<IInfo>({
    //     loading: false,
    //     data: undefined
    // })
    useEffect(() => {
        getDetails()
    }, [])


    const getDetails = async () => {

        dispatch(getLeadDetailsCrm(route.params.id))
    }

    const onPressHideRemarkModal = () => {
        setShowRemarkModal({
            show: false,
            remark: undefined
        })
    }

    const onPressAddRemark = () => {
        setShowRemarkModal({
            show: true,
            remark: undefined
        })
    }
    const onPressEdit = (remark: IRemark) => {

        setShowRemarkModal({
            show: true,
            remark: remark
        })
    }

    const onPressDoneRemark = () => {
        onPressHideRemarkModal()
        // getDetails()
        dispatch(getRemarks(route.params.id))
    }

    const onPressEditFollowup = (item: IFollowup) => {
        console.log('====================================');
        console.log(JSON.stringify(item));
        console.log('====================================');
        navigation.navigate('Followup', {
            customer_id: route.params.id,
            id: item.id,
            followup_datetime: item.followup_datetime,
            followup_mode: item.followup_modes && item.followup_modes.length > 0 ? item.followup_modes[0].id : undefined,
            followup_mode_val: item.followup_modes && item.followup_modes.length > 0 ? item.followup_modes[0].name : undefined,
            followup_status: item.followup_statuses && item.followup_statuses.length > 0 ? item.followup_statuses[0].id : undefined,
            followup_status_val: item.followup_statuses && item.followup_statuses.length > 0 ? item.followup_statuses[0].name : undefined,
            priority: item.followup_priorities && item.followup_priorities.length > 0 ? item.followup_priorities[0].id : undefined,
            priority_val: item.followup_priorities && item.followup_priorities.length > 0 ? item.followup_priorities[0].name : undefined,
            notes: item.notes,
        })

    }
    const onPressAddFollowup = () => {
        navigation.navigate('Followup', { customer_id: route.params.id })
    }

    return (
        <View style={styles.container}>
            {isLoading === false && typeof lead === 'undefined' && <View style={styles.containerEmpty}>
                <Images.noData height={HEIGHT_SCREEN / 2} width={WIDTH_SCREEN / 2} />
                <Text style={styles.title}>No Data Found</Text>
            </View>}
            {lead && <View style={{ flex: 1 }}>

                <ScrollView style={styles.sv} showsVerticalScrollIndicator={false}>
                    <View style={styles.vwContainerContent} >
                        <View style={styles.header}>
                            <LinearGradient
                                start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 1.0 }}
                                // locations={[0,0.5,0.6]}
                                colors={['#CCECA7', '#6CBABE']}
                                style={styles.gradient}>

                                <View style={styles.headerTop}>
                                    <View style={styles.containerImage}>
                                        <Text style={styles.txtImage}>{lead.first_name.charAt(0).toUpperCase()}</Text>
                                    </View>
                                    <View style={styles.containerOtherInfp}>
                                        <Pressable style={styles.mobile} onPress={() => callOnMobileNumber(lead.mobile)}>
                                            <Icon type={Icons.FontAwesome5} name='phone-alt' size={18} />
                                            <Text style={styles.phone}>{lead.mobile}</Text>
                                        </Pressable>
                                        {lead.alternate_contact && lead.alternate_contact.length > 0 && <Pressable style={[styles.mobile]} onPress={() => callOnMobileNumber(lead.mobile)}>
                                            <Icon type={Icons.FontAwesome5} name='phone-alt' size={18} />
                                            <Text style={styles.phone}>{lead.alternate_contact}</Text>
                                        </Pressable>}
                                    </View>
                                    <View>
                                        {lead.email && <>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Icon type={Icons.MaterialCommunityIcons} name='email' size={18} />
                                                <Text style={styles.emailTitle}>{t(TranslationKeys.EMAIL)}</Text>
                                            </View>

                                            <Text numberOfLines={1} adjustsFontSizeToFit={true} style={styles.emailValue}>{lead.email}</Text>
                                        </>}
                                    </View>
                                </View>

                                <Text style={styles.name}>{lead.first_name} {lead.last_name}</Text>

                                {lead.address_1 && <>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                        <Icon type={Icons.MaterialCommunityIcons} name='map-marker' size={18} />
                                        <Text style={styles.emailTitle}>{t(TranslationKeys.ADDRESS)}</Text>
                                    </View>

                                    <Text style={styles.emailValue}>{getAddress(lead)}</Text>
                                </>}



                                {lead.lead_statuses && lead.lead_statuses.length > 0 && <View style={styles.containerTag}>
                                    {lead.lead_statuses.map(item => <View key={item.id} style={[styles.tag, { backgroundColor: item.color_code }]}>
                                        <Text style={styles.tagName}>{item.name}</Text>
                                    </View>)}
                                </View>}
                            </LinearGradient>
                        </View>

                        {lead.lead_sources && lead.lead_sources.length > 0 && <>
                            <Text style={styles.txtSourceTypeQuestion}>{t(TranslationKeys.SOURCE_TYPE)}</Text>
                            <Text style={styles.value}>{getSourceType(lead)}</Text>
                        </>}

                        <Text style={styles.title}>Remarks</Text>
                        <Remarks remarks={remarks} onPressAddRemark={onPressAddRemark} onPressEdit={onPressEdit} />

                        <Text style={styles.title}>Follow-up</Text>
                        <Followups followups={followups} onPressAdd={onPressAddFollowup} onPressEdit={onPressEditFollowup} />
                    </View>
                </ScrollView>

            </View>}

            <Loader animating={isLoading} />
            <ModalAddRemark
                id={route.params.id}
                isShow={showRemarkModal.show}
                oldRemark={showRemarkModal.remark}
                onPressCancel={onPressHideRemarkModal}
                onPressDone={onPressDoneRemark} />
        </View>
    )
}

export default LeadDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorsApp.white,
    },
    containerEmpty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50
    },
    priority: {
        height: 10,
        width: '100%',
        backgroundColor: 'green',
    },
    sv: {
        flex: 1,

    },
    vwContainerContent: {
        padding: 20
    },
    header: {
        ...StylesG.shadow,
        borderRadius: 15,
    },
    gradient: {
        padding: 15,
        borderRadius: 15,
    },
    headerTop: {
        flexDirection: 'row',
        gap: 10
    },
    containerImage: {
        height: 50,
        width: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        ...StylesG.shadow
    },
    txtImage: {
        ...Fonts.poppinsSemiBold24,
        color: ColorsApp.theme
    },
    name: {
        marginTop: 5,
        ...Fonts.poppinsSemiBold20,
    },
    containerOtherInfp: {
        justifyContent: 'space-between',
    },
    mobile: {
        flexDirection: 'row',
        gap: 5
    },
    txtSourceTypeQuestion: {
        marginTop: 15,
        ...Fonts.poppinsSemiBold18,
    },
    title: {
        marginTop: 15,
        ...Fonts.poppinsSemiBold18,
        paddingBottom: 10
    },
    phone: {
        ...Fonts.poppins13,
    },
    emailTitle: {
        ...Fonts.poppins13,
        paddingLeft: 4,
        textTransform: 'capitalize'
    },
    emailValue: {
        ...Fonts.poppins13,
        color: ColorsApp.black60,
    },
    value: {
        ...Fonts.poppinsMedium15,
    },
    containerSource: {
        position: 'absolute',
        top: 12,
        left: 0,
        gap: 3
    },
    sources: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
    },
    containerTag: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5
    },
    tag: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        ...StylesG.shadow
    },
    tagName: {
        ...Fonts.poppinsMedium10,
        color: ColorsApp.white
    },



})