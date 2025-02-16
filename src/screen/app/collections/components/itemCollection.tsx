import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StylesG from '../../../../utilities/stylesG'
import { Fonts } from '../../../../utilities/fonts'
import { IHomeCollectionHeader, IHomeItem, IReportData } from '../../../../modelTypeScript'
import { currencyFormatter } from '../../../../utilities'
type Props = {
    item: IHomeCollectionHeader,
    index: number,
    onPress: (item: IHomeCollectionHeader) => void
    onPressAmount: (item: IReportData) => void
}

const ItemCollection = ({ item, index, onPress, onPressAmount }: Props) => {

    let title = 'Today'
    let backgroundColor = '#E7F2FD'
    if (index == 1) {
        title = 'This Week'
        backgroundColor = '#F3FFE2'
    }
    else if (index == 2) {
        title = 'This Month'
        backgroundColor = '#FFF6FA'
    }
    else if (index == 3) {
        title = 'This Month'
        backgroundColor = '#E1E2EF'
    }
    return (
        <Pressable onPress={() => onPress(item)} style={[styles.container, { backgroundColor }]}>
            <Text style={[styles.title]}> {title}</Text>
            <Text onPress={() => onPressAmount(item.principle_amount)} style={[styles.amount]}>{`Principle:\n  ${currencyFormatter(item.principle_amount.total)}`}</Text>
            <Text
                onPress={() => onPressAmount(item.interest_amount)}
                style={[styles.amount]}>{`Interest:\n  ${currencyFormatter(item.interest_amount.total)}`}</Text>
            <Text onPress={() => onPressAmount(item.total_amount)} style={[styles.amount]}>{`Total:\n  ${currencyFormatter(item.total_amount.total)}`}</Text>
            <Text onPress={() => onPressAmount(item.received_amount)} style={[styles.amount]}>{`Received:\n  ${currencyFormatter(item.received_amount.total)}`}</Text>
            <Text onPress={() => onPressAmount(item.pending_amount)} style={[styles.amount]}>{`Pending:\n  ${currencyFormatter(item.pending_amount.total)}`}</Text>
            <Text onPress={() => onPressAmount(item.overdue_amount)} style={[styles.amount]}>{`Overdue:\n  ${currencyFormatter(item.overdue_amount.total)}`}</Text>
        </Pressable>
    )
}

export default ItemCollection

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 12,

        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 8,
        ...StylesG.shadow,
    },
    title: {
        paddingHorizontal: 10,
        ...Fonts.poppinsSemiBold15,
        color: '#00000080'
    },
    amount: {
        paddingHorizontal: 12,
        ...Fonts.poppinsMedium13,
        color: '#00000080'
    }
})