import { ActivityIndicator, Dimensions, FlatList, ImageBackground, Modal, Pressable, RefreshControl, ScrollView, SectionList, StyleSheet, Switch, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
const WIDTH_SCREEN = Dimensions.get('window').width

import data from "./data.json";
import ButtonTitle from './src/components/buttonTitle';
import Name from './name';

type Prop = {
    id: number,
    first_name: string,
    email: string
}

function someOfArray() {
    [1, 2, 3, 4, 5].reduce((prev, curr) => {
        return prev + curr
    }, 0)
}

const Students = () => {

    const [arr, setArray] = useState([1, 2, 3, 4, 5])

    const [changeValue, setChangeValue] = useState(true)



    const onPressUseState = () => {
        setChangeValue(!changeValue)
    }

    const addTwoNumbers = useCallback(() => { },[])

    return (
        <View style={styles.container}>
            <ButtonTitle title='useState' onPress={onPressUseState} />
            <Name results={addTwoNumbers}/>
        </View>
    )
}

export default Students

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sv: {
        paddingTop: 50
    },
    header: {
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    contentContainerStyle: {
        padding: 10
    },
    txtHeadetTitle: {
        fontSize: 20,
        fontWeight: '600'
    },
    title: {
        marginTop: 50,
        fontSize: 25,
        fontWeight: '800',
    },
    desc: {
        fontSize: 15,
        fontWeight: '400',
        marginTop: 15
    },
    item: {
        marginTop: 10,
        padding: 10,
        paddingLeft: 70,
        gap: 10,
        borderWidth: 0.5,
        borderColor: '#CCCCCC',
        width: WIDTH_SCREEN - 20,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 3 },
        backgroundColor: 'white',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
    }
})