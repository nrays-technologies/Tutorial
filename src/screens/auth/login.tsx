import React, { useState } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Images from '../../assets/images';
import { PropsLogin } from '../../typeScript/navType';

const WIDTH_SCREEN = Dimensions.get('screen').width;
const Login = ({navigation}: PropsLogin) => {

    const [email, setEmail] = useState('');

    const onPressForgotPass = () => navigation.navigate('ForgotPassword', {email: email, name: "raman" })

    const onPressSignup = () => navigation.navigate('Signup')

    return (
        <View style={styles.container} >

            <View style={styles.containerTop}>
                <Image style={styles.imgLogo} source={Images.logo} />
            </View>
            <View style={styles.containerMiddle}>
                <TextInput
                    style={styles.txtInput}
                    placeholder='Enter your email'
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    keyboardType='email-address' />

                <TextInput
                    style={styles.txtInput}
                    placeholder='Enter your password'
                    onChangeText={(value) => { console.log(value) }}
                    returnKeyType='done'
                />
                <Pressable onPress={onPressForgotPass}><Text>Forgot Password</Text></Pressable>

                <Pressable onPress={onPressSignup}><Text>Signup</Text></Pressable>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    containerTop: {
        flex: 0.3,
        justifyContent: 'center'
    },
    containerMiddle: {
        flex: 0.4,
        width: WIDTH_SCREEN,
        gap: 20,
        paddingHorizontal: 20,
        justifyContent: 'flex-end'
    },
    containerBottom: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center'
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
    containerModal: {
        flex: 1,
        backgroundColor: '#00000090',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    containerContent: {
        width: WIDTH_SCREEN,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        paddingBottom: 30,
        paddingHorizontal: 15
    },
    titleModal: {
        fontSize: 20,
        fontWeight: '600'
    },
    descModal: {
        fontSize: 15,
        fontWeight: '400',
        textAlign: 'justify',
        marginTop: 10
    },
    btnCross: {
        position: 'absolute',
        right: 10,
        top: 20,
        height: 24,
        width: 24,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnCrossTitle: {
        fontSize: 12,
        fontWeight: 'bold'
    }

})