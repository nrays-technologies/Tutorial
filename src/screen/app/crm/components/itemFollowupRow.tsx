import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Fonts } from '../../../../utilities/fonts';
import { ColorsApp } from '../../../../utilities/colors';

type Props = {
    title: string;
    value: string;
}

const ItemFollowupRow = ({title, value}: Props) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    )
  }

export default ItemFollowupRow

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    title: {
        ...Fonts.poppinsSemiBold10
    },
    value: {
        ...Fonts.poppins8,
        color: ColorsApp.black60
    }
})