import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { Icons } from '../../../../assets/images'
import StylesG from '../../../../utilities/stylesG'
import { WIDTH_SCREEN } from '../../../../constants/constants'
import { Fonts } from '../../../../utilities/fonts'
import { ColorsApp } from '../../../../utilities/colors'
import { IOverduePayment } from '../../../../modelTypeScript'
import { currencyFormatter, getDateFrom } from '../../../../utilities'

type Props = {
    item: IOverduePayment
    style: ViewStyle
}
const ItemOverdue = ({ item, style }: Props) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.rowHeader}>
                <Text style={styles.id}># {item.payment_id}</Text>
                <Text style={styles.dueAmount}>{currencyFormatter(item.amount_pending)}</Text>
            </View>
            <View style={styles.row}>
                <Icons.FontAwesome name='user' />
                <Text style={styles.value}>{item.customer_first_name ?? 'N/A'}</Text>
            </View>
            <View style={styles.row}>
                <Icons.FontAwesome name='phone' />
                <Text style={styles.value}>{item.customer_mobile ?? 'N/A'}</Text>
            </View>

            <View style={styles.row}>
                <Icons.FontAwesome name='calendar' />
                <Text style={styles.value}>{getDateFrom({ date: item.overdue_datetime, format: 'DD MMM, YYYY' })}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.txtTotal}>Total:</Text>
                <Text style={styles.value}>{currencyFormatter(item.amount_pending)}</Text>
            </View>
            {/* <View style={[styles.row, {justifyContent: 'space-between'}]}>
                <View style={styles.row}>
                    <Text>Overdue: </Text>
                    <Text>8000</Text>
                </View>
                <View style={styles.row}>
                    <Text>Total:</Text>
                    <Text>200000</Text>
                </View>
            </View> */}
        </View>
    )
}

export default ItemOverdue

const styles = StyleSheet.create({
    container: {
        width: WIDTH_SCREEN - 100,
        padding: 12,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 5,
        ...StylesG.shadow,
    },
    id: {
        ...Fonts.poppinsSemiBold15
    },
    value: {
        ...Fonts.poppins13
    },
    txtTotal: {
        ...Fonts.poppinsSemiBold13
    },
    dueAmount: {
        ...Fonts.poppinsSemiBold14,
        color: ColorsApp.red
    },
    rowHeader: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    }
})