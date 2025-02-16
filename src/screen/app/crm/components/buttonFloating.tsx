import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { Icon, Icons } from '../../../../assets/images'
import StylesG from '../../../../utilities/stylesG'
import { ColorsApp } from '../../../../utilities/colors'

type Props = {
    style: ViewStyle,
    onPress: () => void
}


const ButtonFloating = ({style, onPress}: Props) => {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
        <Icon type={Icons.MaterialIcons} name='person-add' color={ColorsApp.theme} size={40}  />
      </Pressable>
  )
}

export default ButtonFloating

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: 60,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        ...StylesG.shadow
    }
})