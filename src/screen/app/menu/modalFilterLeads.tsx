import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import { ColorsApp } from '../../../utilities/colors'
import { ButtonTitle } from '../../components'
import { Fonts } from '../../../utilities/fonts'
import { spaceHorizontal, WIDTH_SCREEN } from '../../../constants/constants'
import { useSelector } from 'react-redux'
import { selectCrmOptions } from '../../../redux/reducers/crmSlice'

import { Icon, Icons } from '../../../assets/images'
import { ICrmLeadSource, ICrmTag } from '../../../modelTypeScript'

export interface IFilterOptions {
    tags: string;
    lead_source: string;
    sort_order: string;
    sort_by: string;
    duration: string;
}

type Props = {
    showMenu: boolean
    onPressClose: () => void,
    filterOptions: IFilterOptions,
    onPressApply: (selectedInfo: IFilterOptions) => void
}

const duration = ["today", "this weak", "last weak", "this month", "last month"]
const sortBy = ["name", "date"]


const ModalFilterLeads = ({ showMenu, filterOptions, onPressClose, onPressApply }: Props) => {

    const { lead_sources, lead_statuses } = useSelector(selectCrmOptions)
    const [selectedInfo, setSelectedInfo] = useState<IFilterOptions>({
        duration: '',
        sort_by: '',
        sort_order: 'asc',
        tags: '',
        lead_source: '',
    })

    useEffect(() => {
        setSelectedInfo(filterOptions)
    }, [filterOptions, showMenu])


    const onPressDuration = (value: string) => {
        console.log(value);
        setSelectedInfo(prevState => ({
            ...prevState,
            duration: prevState.duration == value ? '' : value
        }))
    }
    const onPressSortBy = (value: string) => {
        console.log(value);
        setSelectedInfo(prevState => ({
            ...prevState,
            sort_by: prevState.sort_by == value ? '' : value
        }))
    }
    const onPressSource = (value: ICrmLeadSource) => {
        console.log(value);
        setSelectedInfo(prevState => ({
            ...prevState,
            lead_source: prevState.lead_source == value.id.toString() ? '' : value.id.toString()
        }))
    }
    const onPressStatus = (value: ICrmTag) => {
        let { tags } = selectedInfo
        setSelectedInfo(prevState => ({
            ...prevState,
            tags: prevState.tags == value.id.toString() ? '' : value.id.toString()
        }))

    }

    const onPressClearFilter = () => {
        setSelectedInfo({
            duration: '',
            sort_by: '',
            sort_order: 'asc',
            tags: '',
            lead_source: '',
        })
    }
    const onPressApplyFilter = () => {
        onPressApply(selectedInfo)
    }

    console.log(selectedInfo);


    return (
        <Modal
            isVisible={showMenu}
            // animationIn="slideInLeft"
            // animationOut="slideOutLeft"
            coverScreen={true}
            animationInTiming={500}
            style={{
                justifyContent: 'flex-end',
                margin: 0,
            }}
            backdropColor='#00000040'
        >
            <View style={styles.conatiner}>
                <Pressable onPress={onPressClose} hitSlop={5} style={styles.btnClose}>
                    <Icon type={Icons.Ionicons} name='close' />
                </Pressable>
                <Text style={styles.title}>Filter</Text>
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

                        <Text style={styles.titleOption}>Duration</Text>
                        <View style={styles.rowFilter}>
                            {duration.map((item) => {
                                let backgroundColor = ColorsApp.white
                                if (item == selectedInfo.duration) {
                                    backgroundColor = ColorsApp.theme
                                }
                                return <Pressable style={[styles.itemFilter, { backgroundColor }]} onPress={() => onPressDuration(item)}>
                                    <Text style={styles.txtItemTitle}>{item}</Text>
                                </Pressable>
                            })}
                        </View>
                        <View style={styles.seprator} />
                        <Text style={styles.titleOption}>Sort By</Text>
                        <View style={styles.rowFilter}>
                            {sortBy.map((item) => {
                                let backgroundColor = ColorsApp.white
                                if (item == selectedInfo.sort_by) {
                                    backgroundColor = ColorsApp.theme
                                }
                                return <Pressable style={[styles.itemFilter, { backgroundColor }]} onPress={() => onPressSortBy(item)}>
                                    <Text style={styles.txtItemTitle}>{item}</Text>
                                </Pressable>
                            })}
                        </View>
                        <View style={styles.seprator} />
                        {lead_sources && lead_sources.length > 0 && <>
                            <Text style={styles.titleOption}>Source</Text>
                            <View style={styles.rowFilter}>
                                {lead_sources.map((item) => {
                                    let backgroundColor = ColorsApp.white
                                    if (item.id.toString() == selectedInfo.lead_source) {
                                        backgroundColor = ColorsApp.theme
                                    }
                                    return <Pressable style={[styles.itemFilter, { backgroundColor }]} onPress={() => onPressSource(item)}>
                                        <Text style={styles.txtItemTitle}>{item.name}</Text>
                                    </Pressable>
                                })}
                            </View>
                            <View style={styles.seprator} />
                        </>}


                        {lead_statuses && lead_statuses.length > 0 && <>
                            <Text style={styles.titleOption}>Status</Text>
                            <View style={styles.rowFilter}>
                                {lead_statuses.map((item) => {
                                    const { tags } = selectedInfo
                                    let backgroundColor = ColorsApp.white
                                    if (item.id.toString() == tags) {
                                        backgroundColor = ColorsApp.theme
                                    }
                                    return <Pressable style={[styles.itemFilter, { backgroundColor }]} onPress={() => onPressStatus(item)}>
                                        <Text style={styles.txtItemTitle}>{item.name}</Text>
                                    </Pressable>
                                })}
                            </View>
                        </>}


                    </ScrollView>
                </View>
                <View style={styles.containerButton}>
                    <ButtonTitle
                        title='Clear'
                        colorTitle={ColorsApp.black60}
                        width={WIDTH_SCREEN / 4}
                        onPress={onPressClearFilter} />

                    <ButtonTitle
                        title='Apply'
                        backgroundColor={ColorsApp.theme}
                        width={WIDTH_SCREEN / 4}
                        onPress={onPressApplyFilter} />
                </View>

            </View>
        </Modal>
    )
}

export default ModalFilterLeads

const styles = StyleSheet.create({
    conatiner: {
        height: '80%',
        width: '100%',
        backgroundColor: '#FFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    btnClose: {
        position: 'absolute',
        right: spaceHorizontal,
        top: 20
    },
    title: {
        marginTop: 20,
        ...Fonts.poppinsMedium17,
        alignSelf: 'center'
    },
    containerButton: {

        flexDirection: 'row',
        paddingHorizontal: '20%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingBottom: 30
    },
    seprator: {
        marginTop: 17,
        borderTopColor: ColorsApp.grey33,
        borderTopWidth: 1,
    },
    titleOption: {
        paddingTop: 17,
        paddingBottom: 6,
        paddingLeft: spaceHorizontal,
        ...Fonts.poppinsMedium15,

    },
    rowFilter: {
        paddingHorizontal: spaceHorizontal,
        flexDirection: 'row', flexWrap: 'wrap',
        gap: 10
    },
    itemFilter: {
        borderWidth: 1,
        borderColor: ColorsApp.grey33,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20
    },
    txtItemTitle: {
        ...Fonts.poppins12,
        textTransform: 'capitalize'
    }
})