import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ColorsApp } from '../../../utilities/colors'
import { Fonts } from '../../../utilities/fonts'

const boxPin = ({ value = '-' }) => {
  return ( <View style={styles.boxPin}>
    <Text style={styles.txtPin}>{value}</Text>
  </View>
  )
}

export default boxPin

const styles = StyleSheet.create({
    boxPin: {
      borderColor: ColorsApp.grey99,
      borderWidth: 1,
        height: 47,
        width: 47,
        borderRadius: 6,
        backgroundColor: ColorsApp.grey33,//ColorsApp.bgPin,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
      },
      txtPin: {
        ...Fonts.poppinsMedium17
      },
})