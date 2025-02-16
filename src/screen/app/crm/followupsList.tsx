import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { ColorsApp } from '../../../utilities/colors'
import { FlatList } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { getAllFollowup } from '../../../network/managers/crmAPI'
import ItemFollowup from './components/itemFollowup'
import { IFollowup } from '../../../modelTypeScript'
import { Loader } from '../../components'
import moment from 'moment'
import { getDateFrom, getStringFrom } from '../../../utilities'
import { HEIGHT_SCREEN, spaceHorizontal, WIDTH_SCREEN } from '../../../constants/constants'
import StylesG from '../../../utilities/stylesG'
import Images from '../../../assets/images'
import { Fonts } from '../../../utilities/fonts'


interface IInfo {
    isLoading: boolean,
    data: IFollowup[]
    selectedDate: ''
}
interface IDatesInfo {
    selectedDate: string,
    dates: string[]
}

const FollowupsList = ({ navigation, route }: any) => {

    console.log('==================================== route.params ');
    console.log(route.params);
    console.log('====================================');
    const { showDateList, leadId, customer_id } = route.params
    const isFocused = useIsFocused()
    
    const [info, setInfo] = useState<IInfo>({
        isLoading: true,
        selectedDate: '',
        data: []
    })
    const datesCollect: string[] = useMemo(() => [ ...[...Array(30).keys()].map(i => moment().subtract(i, 'days').toString()).reverse(), ...[...Array(30).keys()].map(i => moment().add(i+1, 'days').toString()), ], [])

    // useEffect(() => {
    //     //         moment().subtract(30, 'days'); // or...
    //     // moment().add(-30, 'days');
    //     const datesCollect: string[] = [...Array(30).keys()].map(i => moment().subtract(i, 'days').toString())
    //     setDatesInfo({
    //         selectedDate: datesCollect[0],
    //         dates: datesCollect
    //     })
    // }, [])

    // console.log("datesCollect --->");
    // console.log(datesCollect);
    
    useEffect(() => {

        if (isFocused === true) {
            getAllFollowups(showDateList == true ? datesCollect[0] : undefined)
        }
    }, [isFocused])

    const getAllFollowups = async (date?: string) => {
        setInfo((prevState) => ({
            ...prevState,
            isLoading: true,
            selectedDate: date ? date: ''
        }))
        const resp = await getAllFollowup({customerId: customer_id, dateSelected: date ? getStringFrom({ date: date, format: 'YYYY-MM-DD' }): undefined })
        if (resp.status === true) {
            setInfo((prevState) => ({
                ...prevState,
                isLoading: false,
                data: resp.data
            }))
        }
        else {
            setInfo((prevState) => ({
                ...prevState,
                isLoading: false,
                data: []
            }))
        }
    }

    const onPressEdit = (item: IFollowup) => {

        navigation.navigate('Followup', {
            customer_id: -1,
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

    const onPresDate = (item: string) => {

        console.log('====================================');
        console.log(item);
        console.log('====================================');
        getAllFollowups(item)
    }

    const listHeader = () => {
        return <View style={{ width: '100%', marginTop: 10 }}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 5, padding: 10 }}
                data={datesCollect}
                renderItem={({ item, index }) => {
                    let backgroundColor = ColorsApp.white
                    if (item == info.selectedDate) {
                        backgroundColor = ColorsApp.theme
                    }
                    return <Pressable style={[styles.dateContainer, { backgroundColor }]} onPress={() => onPresDate(item)}>
                        <Text>{getStringFrom({ date: item, format: 'ddd' })}</Text>
                        <Text>{getStringFrom({ date: item, format: 'DD' })}</Text>
                        <Text>{getStringFrom({ date: item, format: 'MMM' })}</Text>
                    </Pressable>
                }}
                keyExtractor={(item, index) => item.toString()} />
        </View>
    }

    return (
        <View style={styles.container}>
            
            {showDateList == true && listHeader()}
            
            <FlatList
                contentContainerStyle={styles.contentContainerStyle}
                showsVerticalScrollIndicator={false}
                data={info.data}
                renderItem={({ item, index }) => {
                    return <ItemFollowup showEdit={showDateList == true ? false : true} index={index} item={item} onPressEdit={onPressEdit} />
                }}
                ListEmptyComponent={() => {
                    return <View style={styles.containerEmpty}>
                      <Images.blank height={HEIGHT_SCREEN / 3} width={WIDTH_SCREEN / 2} />
                      <Text style={styles.txtNoData}>No Data Found</Text>
                    </View>
                  } }
                keyExtractor={(item, index) => item.id.toString()}
            />
            <Loader animating={info.isLoading} />
        </View>
    )
}

export default FollowupsList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorsApp.white,
    },
    contentContainerStyle: {
        gap: 10,
        padding: 10
    },
    dateContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: 45,
        borderColor: ColorsApp.grey33,
        borderWidth: 0.7,
        borderRadius: 5,
        gap: 5,
        ...StylesG.shadowBottom
    },
    containerEmpty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: HEIGHT_SCREEN / 1.8
      },
      txtNoData: {
        ...Fonts.poppinsMedium20
      },
})