import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'

type Props = {
  title: string
  onPress?: () => void
  value?: number | string
}

const ButtonTitle = ({ title, value, onPress }: Props) => {

  return (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor={"red"}
      style={styles.btnSubmit}
      onPress={onPress}
    >
      <Text style={styles.btnSubmitTitle}>{`${title}`}</Text>
    </TouchableHighlight>
  )
}

export default ButtonTitle

const styles = StyleSheet.create({
  btnSubmit: {
    height: 45,
    width: 200,
    backgroundColor: '#c7edeb',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23
  },
  btnSubmitTitle: {
    color: '#1e706c',
  }
})