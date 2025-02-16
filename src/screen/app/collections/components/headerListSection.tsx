import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Fonts } from '../../../../utilities/fonts'
import { spaceLeftRight } from '../../../../constants/constants'
import { ColorsApp } from '../../../../utilities/colors'

type Props = {
    title: string,
    showRightButton: boolean
    onPress: () => void
}
const HeaderListSection = ({ title, showRightButton, onPress }: Props) => {
    return (
        <View style={styles.contain}>
            <Text style={styles.titleList}>{title}</Text>
            {showRightButton && <Pressable hitSlop={10} onPress={onPress}>
                <Text style={styles.viewAll}>View All</Text>
            </Pressable>}
        </View>
    )
}

export default HeaderListSection

const styles = StyleSheet.create({
    contain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        paddingHorizontal: spaceLeftRight
    },
    titleList: {
        ...Fonts.poppinsSemiBold18,
    },
    viewAll: {
        ...Fonts.poppinsSemiBold12,
        color: ColorsApp.link
    }
})