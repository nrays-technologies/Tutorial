import React, { useEffect, useState } from 'react'
import AuthNavigation from '../navigation/authNavigation'
import { Image, StyleSheet, View } from 'react-native'
import Images from '../assets/images'
import AppNavigation from '../navigation/appNavigation'
import Speaker from './speaker'
import Products from './products'

const Welcome = () => {

    const [hideSplash, setHideSplash] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setHideSplash(true);
        }, 3000);
    }, []);
    
    if (hideSplash === false) {
        return <View style={styles.container}>
            <Image style={styles.imgLogo} source={Images.logo} />
        </View>
    }

    return <Products />
    // return <AppNavigation />;
}

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    imgLogo: {
        width: 200,
        height: 50
    },
})