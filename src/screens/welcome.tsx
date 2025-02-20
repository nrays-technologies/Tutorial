import React, { useEffect, useState } from 'react'
import AuthNavigation from '../navigation/authNavigation'
import { Image, StyleSheet, View } from 'react-native'
import Images from '../assets/images'
import AppNavigation from '../navigation/appNavigation'
import Speaker from './speaker'
import Products from './products'
import { getProductsList, setProducts } from '../redux/reducers/productSlice'
import { useDispatch } from 'react-redux'

const Welcome = () => {

    const [hideSplash, setHideSplash] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        getProducts()

        setTimeout(() => {
            setHideSplash(true);
        }, 3000);
    }, []);

    const getProducts = () => {
        dispatch(getProductsList())
        // fetch('https://dummyjson.com/products')
        //     .then(res => res.json())
        //     .then(products => {
        //         console.log("res products--->", products)
        //         dispatch(setProducts(products))
        //     });
    }

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