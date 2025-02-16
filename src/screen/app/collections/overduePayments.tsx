import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ItemOverdue from './components/itemOverdue'
import { IOverduePayment, IPaymentCollection, IUpcomingPayment } from '../../../modelTypeScript'
import { HEIGHT_SCREEN, spaceLeftRight, TypeList, WIDTH_SCREEN } from '../../../constants/constants'
import { useSelector } from 'react-redux'
import { selectCollectionOption } from '../../../redux/reducers/collectionsSlice'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackRoots } from '../../../navigation/AppNavigation'
import { getOverduePayment } from '../../../network/managers/collectionsAPI'
import { alertShow } from '../../../utilities/alerts'
import { Loader } from '../../components'
import { ActivityIndicator } from 'react-native'
import SearchBar from '../../components/searchBar'
import Images from '../../../assets/images'
import { Fonts } from '../../../utilities/fonts'

interface IInfo {
    loading: boolean,
    data: IOverduePayment[]
    records_count: number,
    has_more_records: boolean
    loaderMore: boolean
    // data: IOverduePayment[] | IPaymentCollection[] | IUpcomingPayment[]
}

type Props = NativeStackScreenProps<AppStackRoots, 'OverduePayments'>

const OverduePayments = ({ navigation, route }: Props) => {
    const { type } = route.params
    const { overdue_payments, payment_collections, upcoming_payments } = useSelector(selectCollectionOption)

    const refPagenumber = useRef(1)
    const refLoadMore = useRef(false)
    const refSearchString = useRef('')

    const [info, setInfo] = useState<IInfo>({
        loading: true,
        data: [],
        records_count: 0,
        has_more_records: true,
        loaderMore: false
    })


    useEffect(() => {
        setInfo(prevState => ({
            ...prevState,
            data: []
        }))
        // switch (type) {
        //     case TypeList.OverduePayments:
        //         setInfo(prevState => ({
        //             ...prevState,
        //             data: overdue_payments
        //         }))
        //         break;
        //     case TypeList.PaymentCollections:
        //         setInfo(prevState => ({
        //             ...prevState,
        //             data: payment_collections
        //         }))
        //         break;
        //     case TypeList.UpcomingPayments:
        //         setInfo(prevState => ({
        //             ...prevState,
        //             data: upcoming_payments
        //         }))
        //         break;

        //     default:
        //         break;
        // }
        setInfo(prevState => ({
            ...prevState,
            loading: true
        }))
        getPaymentData()
    }, [])

    const getPaymentData = async () => {

        const resp = await getOverduePayment({ page: refPagenumber.current, search: refSearchString.current })

        console.log('==================================== resp');
        console.log(resp);
        console.log('====================================');
        if (resp.status == true) {

            setInfo(prevState => ({
                ...prevState,
                data: refPagenumber.current == 1 ? resp.data : [...prevState.data, ...resp.data],
                has_more_records: resp.has_more_records ?? false,
                records_count: resp.records_count ?? prevState.records_count,
                loading: false,
                loaderMore: false
            }))
            refLoadMore.current = resp.has_more_records ?? false
        }
        else {
            setInfo(prevState => ({
                ...prevState,
                loading: false,
                loaderMore: false
            }))
            alertShow("", resp.error)
        }

    }

    const onPressItem = () => {
    }

    const loadMore = () => {

        if (info.has_more_records && info.loaderMore == false && refLoadMore.current == true) {

            refLoadMore.current = false
            refPagenumber.current = refPagenumber.current + 1
            setInfo((prevState) => ({
                ...prevState,
                loaderMore: true
            }))
            getPaymentData()
        }
    }

    const onSearch = (searchText: string) => {
        console.log('====================================');
        console.log(searchText);
        console.log('====================================');
        refSearchString.current = searchText
        refLoadMore.current = false
        refPagenumber.current = 1
        setInfo((prevState) => ({
            ...prevState,
            loading: true
        }))
        getPaymentData()
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerSearch}>
                <SearchBar onSearchTyping={onSearch} />
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerHorizontal}
                data={info.data}
                renderItem={({ item, index }) => <ItemOverdue style={styles.styleItem} item={item} onPress={onPressItem} sty />}
                // refreshControl={
                //     <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                // }
                ListFooterComponent={() => <View style={styles.footerList}>
                    <ActivityIndicator animating={info.loaderMore} />
                </View>}
                ListEmptyComponent={() => {
                    if (info.loading) {
                        return <View />
                    }
                    return <View style={styles.containerEmpty}>
                        <Images.noData height={HEIGHT_SCREEN / 2} width={WIDTH_SCREEN / 2} />
                        <Text style={styles.titleNoData}>No Data Found</Text>
                    </View>
                }}
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
                keyExtractor={(item, index) => item.payment_id + item.customer_id + index}
            />
            <Loader animating={info.loading} />
        </View>
    )
}

export default OverduePayments

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    containerSearch: {
        paddingTop: 10,
        paddingHorizontal: spaceLeftRight,
    },
    contentContainerHorizontal: {
        gap: 15,
        paddingHorizontal: spaceLeftRight,
        paddingTop: 10,
    },
    styleItem: {
        width: '100%'
    },
    footerList: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerEmpty: {
        height: HEIGHT_SCREEN - 250,
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleNoData: {
        ...Fonts.poppinsSemiBold15
    }
})