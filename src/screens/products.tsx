import React from "react";
import { StyleSheet, View, Image, Text, FlatList } from "react-native";

import Images from "../assets/images";
import ItemProduct from "./components/itemProduct";
import { useSelector } from "react-redux";


export interface IProduct {
    name: string
    Price: string
    img: any
}

export const data: IProduct[] = [{ "name": "beoPlay", "Price": "$1600", "img": Images.beoPlay },
{ "name": "headPhone1", "Price": "$500", "img": Images.headphone1 },
{ "name": "beoLit", "Price": "$1200", "img": Images.beoLit },
{ "name": "beoSound", "Price": "$1100", "img": Images.beoSound },
{ "name": "beoPlay1", "Price": "$1500", "img": Images.beoplay1 },
{ "name": "headPhone", "Price": "$900", "img": Images.headPhone },
]

const Products = () => {

    const { limit } = useSelector((state) => state.productOptions)


    console.log('==================================== limit');

    console.log(limit);
    console.log('====================================');

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.txtSearch}>Search on STStore</Text>
                <Image style={styles.Logosearch} source={Images.search}></Image>
            </View>
            <View style={styles.lineHorizontal} />
            <Text style={styles.txtResult}>RECENT SEARCHES</Text>
            <View style={styles.middle}>
                <View style={styles.search}>
                    <Image style={styles.logoTimer} source={Images.Timer}></Image>
                    <Text style={styles.txtHistory}>Beosound1</Text>
                    <Image style={styles.logoClose} source={Images.close}></Image>
                </View>
                <View style={styles.lineHorizontal1} />
                <View style={styles.search}>
                    <Image style={styles.logoTimer} source={Images.Timer}></Image>
                    <Text style={styles.txtHistory}>Beosound Balance</Text>
                    <Image style={styles.logoClose} source={Images.close}></Image>
                </View>
                <View style={styles.lineHorizontal1} />
                <View style={styles.search}>
                    <Image style={styles.logoTimer} source={Images.Timer}></Image>
                    <Text style={styles.txtHistory}>Beolit 17</Text>
                    <Image style={styles.logoClose} source={Images.close}></Image>
                </View>
                <View style={styles.lineHorizontal1} />
            </View>
            <Text style={styles.txtResult}>POPULAR SEARCHES</Text>
            {/* <View style={styles.itemList}> */}
            <Text>{limit}</Text>
            <FlatList
                columnWrapperStyle={styles.columnWrapperStyle}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.itemList}
                numColumns={2}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <ItemProduct item={item} />
                )}
            />
            {/* </View> */}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    top: {
        flexDirection: 'row',
        borderRadius: 12,
        height: 44,
        marginHorizontal: 35,
        marginTop: 40,
        backgroundColor: '#F3F6F8'
    },
    txtSearch: {
        flex: 1,
        marginLeft: 16,
        marginTop: 12,
        width: 233,
        height: 20,
        fontWeight: '500',
        fontFamily: 'DMSans'
    },
    Logosearch: {
        height: 19,
        width: 19,
        marginVertical: 10,
        marginRight: 16
    },
    lineHorizontal: {
        height: 1,
        backgroundColor: '#F3F6F8',
        marginTop: 24
    },
    middle: {
        paddingHorizontal: 35
    },
    txtResult: {
        fontFamily: 'DMSans-Regular',
        fontSize: 12,
        paddingHorizontal: 35,
        marginTop: 32
    },
    search: {
        flexDirection: 'row',
        height: 41,
        marginTop: 24
    },
    logoTimer: {
        height: 24,
        width: 24,
        marginRight: 16
    },
    logoClose: {
        height: 16,
        width: 16,
        marginRight: 21,
        marginVertical: 4
    },
    txtHistory: {
        flex: 1,
        fontWeight: '700',
        fontFamily: 'DM Sans'
    },
    lineHorizontal1: {
        height: 1,
        paddingHorizontal: 35,
        backgroundColor: '#B0B3C2'
    },
    itemList: {
        borderColor: 'red',
        borderWidth: 3,
        paddingHorizontal: 35,
        gap: 24,
        flex: 1
    },
    columnWrapperStyle: {
        gap: 15
    },


})
export default Products