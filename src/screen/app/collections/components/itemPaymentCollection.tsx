import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { Fonts } from '../../../../utilities/fonts'
import StylesG from '../../../../utilities/stylesG'
import { ColorsApp } from '../../../../utilities/colors'
import { IPaymentCollection } from '../../../../modelTypeScript'
import { Icons } from '../../../../assets/images'
import { WIDTH_SCREEN } from '../../../../constants/constants'
import { currencyFormatter } from '../../../../utilities'

type Props = {
    item: IPaymentCollection
    style: ViewStyle
}

const ItemPaymentCollection = ({ item, style }: Props) => {

    return (
        <View style={[styles.container, style]}>
            <View style={styles.rowHeader}>
                <Text style={styles.id}># {item.payment_id}</Text>
                <Text style={styles.txtAmount}>{currencyFormatter(item.amount_paid)}</Text>
            </View>
            <View style={styles.row}>
                <Icons.FontAwesome name='user' />
                <Text style={styles.value}>{item.customer_first_name ?? 'N/A'}</Text>
            </View>
            <View style={styles.row}>
                <Icons.FontAwesome name='phone' />
                <Text style={styles.value}>{item.customer_mobile ?? 'N/A'}</Text>
            </View>

            {/* <View style={styles.row}>
                    <Icons.FontAwesome name='calendar' />
                    <Text>19 Dec, 2024</Text>
                </View> */}
            <View style={styles.row}>
                <Text style={styles.txtTotal}>Total:</Text>
                <Text style={styles.value}>{currencyFormatter(item.total_paid)}</Text>
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

export default ItemPaymentCollection

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
    txtAmount: {
        ...Fonts.poppinsSemiBold14,
        // color: ColorsApp.red
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