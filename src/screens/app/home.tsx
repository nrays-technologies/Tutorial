import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ButtonTitle from '../../components/buttonTitle'

const testPromise = (num: number) => {
  return new Promise((resolve, reject) => {
    try {
      for (let index = 0; index < num; index++) {
        console.log('====================================');
        console.log(index);
        console.log('====================================');
      }
      resolve(true)
    } catch (error) {
      reject(false)
    }
  })
}


const Home = () => {
  const onPressButton = async () => {
    const resp = await testPromise(50000);
    console.log('====================================');
    console.log("resp => ", resp);
    console.log('====================================');
  }
  return (
    <View style={styles.constainer}>
      <Text>Home</Text>

      <ButtonTitle title='Check' onPress={onPressButton} />


    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})