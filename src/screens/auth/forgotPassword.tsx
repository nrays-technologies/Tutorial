import { Dimensions, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Images from '../../assets/images';
import ButtonTitle from '../../components/buttonTitle';



const WIDTH_SCREEN = Dimensions.get('screen').width

const ForgotPassword = ({ navigation, route }) => {

    console.log('====================================');
    console.log(route.params);
    console.log('====================================');
    const [email, setEmail] = useState(route.params.email)

    const onPressSubmit = () => { }

    return (
        <View style={styles.container}>

            <Image style={styles.imgLogo} source={Images.logo} />

            <View style={styles.containerMiddle}>
                <TextInput
                    style={styles.txtInput}
                    placeholder='Enter your email'
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    keyboardType='email-address' />

                <ButtonTitle title='Submit' onPress={onPressSubmit} />
            </View>
        </View>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    containerMiddle: {
        flex: 0.4,
        width: WIDTH_SCREEN,
        gap: 20,
        paddingHorizontal: 20,
        justifyContent: 'flex-end'
    },
    imgLogo: {
        width: 200,
        height: 50
    },
    txtInput: {
        height: 45,
        width: '100%',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        paddingHorizontal: 10
    },
})