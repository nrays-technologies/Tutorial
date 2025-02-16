import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Fonts } from '../../utilities/fonts'
import StylesG from '../../utilities/stylesG'
import { IHomeItem } from '../../modelTypeScript'

type Props = {
    item: IHomeItem,
    onPress: (item: IHomeItem) => void
}

const ItemHome = ({item, onPress}: Props) => {
  return (
    <Pressable onPress={() => onPress(item)} style={[styles.container, {backgroundColor: item.backgroundColor,}]}>
        {item.icon}
        <Text style={[styles.title]}>{item.title}</Text>
    </Pressable>
  )
}

export default ItemHome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        ...StylesG.shadow,
    },
    title: {
        ...Fonts.poppinsMedium13,
        color:'#00000080'
    }
})