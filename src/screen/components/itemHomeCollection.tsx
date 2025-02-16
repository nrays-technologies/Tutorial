import { Linking, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CardView from './card'
import { ICollectionOverDue, ICollectionToday } from '../../modelTypeScript'
import { Fonts } from '../../utilities/fonts'

type Props = {
    item: ICollectionOverDue | ICollectionToday
}

const ItemHomeCollection = ({ item }: Props) => {
    let amount = 0
    let days = ''
    if (item.amountCollected) {
        amount = item.amountCollected
    }
    else if (item.amountOverdue) {
        amount = item.amountOverdue
        days = `${item.daysOverdue} Days`
    }

    const onPressDiaMobile = (number: string) => {

        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${number}`;
        } else {
            phoneNumber = `telprompt:${number}`;
        }

        Linking.openURL(phoneNumber);
    }

    return (
        <CardView style={{ width: 250, marginRight: 10 }} styleCard={{ padding: 15, width: 250 }}>
            <Text numberOfLines={1} style={styles.txtTitle}>Name: <Text style={styles.txtValue}>{item.clientName}</Text></Text>
            <Text style={styles.txtTitle}>Contact No: <Text style={styles.txtValue} onPress={() => onPressDiaMobile(item.contact)} >{item.contact}</Text></Text>
            <Text style={styles.txtTitle}>Amount: <Text style={styles.txtValue}>{amount}</Text></Text>
            {days.length > 0 && <Text style={styles.txtValue}>{days}</Text>}
        </CardView>
    )
}

export default ItemHomeCollection

const styles = StyleSheet.create({
    txtTitle: {
        ...Fonts.poppinsMedium13
    },
    txtValue: {
        ...Fonts.poppins13
    }
})