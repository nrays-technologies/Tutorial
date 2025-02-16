import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useRef, useState } from 'react'
import Images, { Icons } from '../../../assets/images'
import ItemHome from '../itemHome'
import { spaceLeftRight, TypeList, WIDTH_SCREEN } from '../../../constants/constants'
import { ScrollView } from 'moti'
import ItemCollection from './components/itemCollection'
import { IHomeCollectionHeader, IHomeItem, IReportData } from '../../../modelTypeScript'
import ItemOverdue from './components/itemOverdue'
import { Fonts } from '../../../utilities/fonts'
import { useSelector } from 'react-redux'
import { selectCollectionOption } from '../../../redux/reducers/collectionsSlice'
import ReportData from './components/reportData'
import ItemPaymentCollection from './components/itemPaymentCollection'
import ItemUpcomingPayment from './components/itemUpcoming'
import HeaderListSection from './components/headerListSection'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackRoots } from '../../../navigation/AppNavigation'
import { Loader } from '../../components'
import Reanimated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import Animated from 'react-native-reanimated'
import { currencyFormatter } from '../../../utilities'
import { ColorsApp } from '../../../utilities/colors'

// const arrData: IHomeCollectionHeader[] = [
//     {
//         title: 'Today',
//         icon: <Images.crm height={45} width={45} />,
//         backgroundColor: '#E7F2FD',
//         color: '#0859A4',
//         principle: 100,
//         interest: 20,
//         total: 200,
//         received: 0,
//         pending: 0,
//         overdue: 0
//     },
//     {
//         title: 'This Week',
//         icon: <Images.collection height={45} width={45} />,
//         backgroundColor: '#F3FFE2',
//         color: '#406A06',
//         principle: 100,
//         interest: 20,
//         total: 200,
//         received: 0,
//         pending: 0,
//         overdue: 0
//     },
//     {
//         title: 'This Month',
//         icon: <Images.attendance height={45} width={45} />,
//         backgroundColor: '#FFF6FA',
//         color: '#5A082E',
//         principle: 100,
//         interest: 20,
//         total: 200,
//         received: 0,
//         pending: 0,
//         overdue: 0
//     },
//     {
//         title: 'This Year',
//         icon: <Images.crm height={45} width={45} />,
//         backgroundColor: '#E1E2EF',
//         color: '#060D5E',
//         principle: 100,
//         interest: 20,
//         total: 200,
//         received: 0,
//         pending: 0,
//         overdue: 0
//     }
// ]



type Props = NativeStackScreenProps<AppStackRoots, 'HomeCollection'>

const HomeCollection = ({ navigation }: Props) => {
    const translateX = useSharedValue(-WIDTH_SCREEN);
    const { isLoading, today, this_week, this_month, this_year, overdue_payments, payment_collections, upcoming_payments } = useSelector(selectCollectionOption)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const refTimerSnackbar = useRef(null)
    const [showReport, setShowReport] = useState<IReportData>({
        total: "0",
        co_lender: "0",
        self: "0"
    })

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         title: "DC Energies",
    //         headerLeft: () => <Pressable style={styles.btnMenu} onPress={onPressMenu}>
    //             <Icon type={Icons.Ionicons} name='list-outline' color='#000' />
    //         </Pressable>,
    //         headerTitleStyle: {
    //             ...Fonts.fontNavBarTitleLogo,
    //             fontFamily: 'Neuropol-Regular',
    //             // fontWeight: '800'
    //         }
    //     });
    // }, [])

    const onPressMenu = () => {
        setShowMenu(!showMenu)
    }

    const onPressItem = (item: IHomeItem) => {
        switch (item.title) {
            case 'CRM':
                navigation.navigate('HomeCRM')
                break;
            case 'Collection':
                navigation.navigate('HomeCollection')
                break;
            default:
                break;
        }
    }

    const onLongPressAmount = (item: IReportData) => {
        console.log('==================================== item-');
        console.log(item);
        console.log('====================================');
        setShowReport(item)
        if (refTimerSnackbar.current) {
            clearTimeout(refTimerSnackbar.current)
        }
        translateX.value = withSpring(0);
        refTimerSnackbar.current = setTimeout(() => {
            translateX.value = withSpring(-WIDTH_SCREEN);
        }, 10000);
    }
    const onPressClossSnackbar = () => {
        translateX.value = withSpring(-WIDTH_SCREEN);
    }

    const onPressViewAll = (type: TypeList) => {
        // navigation.navigate('OverduePayments', { type })
        switch (type) {
            case TypeList.OverduePayments:
                navigation.navigate('OverduePayments', { type })
                break;
            case TypeList.PaymentCollections:
                navigation.navigate('CollectionPayments', { type })
                break;
            case TypeList.UpcomingPayments:
                navigation.navigate('UpcomingPayments', { type })
                break;
            default:
                break;
        }
    }


    return (
        <View style={styles.container}>
            {isLoading === false && <ScrollView showsVerticalScrollIndicator={false}>
                <ReportData onPressAmount={onLongPressAmount} />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    numColumns={2}
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.contentContainer}
                    data={[today, this_week, this_month, this_year]}
                    renderItem={({ item, index }) => <ItemCollection index={index} item={item} onPress={onPressItem} onPressAmount={onLongPressAmount} />}
                    keyExtractor={(item, index) => item?.interest_amount.toString() + index}
                />

                <HeaderListSection title='Overdue Payments' showRightButton={overdue_payments.has_more_records} onPress={() => onPressViewAll(TypeList.OverduePayments)} />
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={styles.contentContainerHorizontal}
                    data={overdue_payments.data}
                    renderItem={({ item, index }) => <ItemOverdue item={item} onPress={onPressItem} />}
                    keyExtractor={(item, index) => item.payment_id + index}
                />

                <HeaderListSection title='Payment Collections' showRightButton={payment_collections.has_more_records} onPress={() => onPressViewAll(TypeList.PaymentCollections)} />
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={styles.contentContainerHorizontal}
                    data={payment_collections.data}
                    renderItem={({ item, index }) => <ItemPaymentCollection item={item} onPress={onPressItem} />}
                    keyExtractor={(item, index) => item.payment_id + index}
                />

                <HeaderListSection title='Upcoming Payments' showRightButton={upcoming_payments.has_more_records} onPress={() => onPressViewAll(TypeList.UpcomingPayments)} />
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={styles.contentContainerHorizontal}
                    data={upcoming_payments.data}
                    renderItem={({ item, index }) => <ItemUpcomingPayment item={item} onPress={onPressItem} />}
                    keyExtractor={(item, index) => item.payment_id + index}
                />
                <View style={{ height: 15 }} />

                {/* <ModalMenu showMenu={showMenu} onPressClose={onPressMenu} /> */}
            </ScrollView>
            }
            <Animated.View style={[styles.topNotification, { transform: [{ translateX }] }]}>
                <Text style={styles.txtReportDataTitle}>{`Self:\nCo-Lender:`}</Text>
                <Text style={styles.txtReportDataValue}>{`${currencyFormatter(showReport.self)}\n${currencyFormatter(showReport.co_lender)}`}</Text>
                <Pressable hitSlop={10} style={styles.btnClose} onPress={onPressClossSnackbar}>
                    <Icons.Ionicons name='close' color={ColorsApp.white} size={22} />
                </Pressable>
            </Animated.View>
            <Loader animating={isLoading} />
        </View>
    )
}

export default HomeCollection


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        width: WIDTH_SCREEN,
    },
    columnWrapper: { gap: 15 },
    contentContainer: {
        gap: 15,
        paddingHorizontal: spaceLeftRight,
        paddingTop: 5,
        paddingBottom: 8
    },
    contentContainerHorizontal: {
        gap: 15,
        paddingHorizontal: spaceLeftRight,
        paddingTop: 5,
        paddingBottom: 8
    },
    btnMenu: {
        paddingLeft: spaceLeftRight
    },
    listFooter: {
        height: 40
    },
    topNotification: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        paddingHorizontal: 10,
        gap: 20,
        position: 'absolute',
        top: 0,
        left: 0,
        width: WIDTH_SCREEN / 1.5,
        height: 80,
        backgroundColor: ColorsApp.theme,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    txtReportDataTitle: {
        ...Fonts.poppinsSemiBold13,
        color: ColorsApp.white
    },
    txtReportDataValue: {
        ...Fonts.poppins13,
        color: ColorsApp.white
    },
    btnClose: {
        position: 'absolute',
        top: 10,
        right: 10
    }
})