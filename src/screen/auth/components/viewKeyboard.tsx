import { Image, PixelRatio, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Images from '../../../assets/images'
import StylesG from '../../../utilities/stylesG'

type Props = {
    onPressKey: (value: string) => void
}

const ViewKeyboard = ({ onPressKey }: Props) => {

    const onPress = (value: string) => {
        onPressKey(value)
    }
    return (
        <View style={styles.containerKeys}>
            <View style={styles.rowKeys}>
                <Pressable style={styles.btnKey} onPress={() => onPress("1")}>
                    <Text>1</Text>
                </Pressable>
                <Pressable style={styles.btnKey} onPress={() => onPress("2")}>
                    <Text>2</Text>
                </Pressable>

                <Pressable style={styles.btnKey} onPress={() => onPress("3")}>
                    <Text>3</Text>
                </Pressable>
            </View>
            <View style={styles.rowKeys}>
                <Pressable style={styles.btnKey} onPress={() => onPress("4")}>
                    <Text>4</Text>
                </Pressable>
                <Pressable style={styles.btnKey} onPress={() => onPress("5")}>
                    <Text>5</Text>
                </Pressable>
                <Pressable style={styles.btnKey} onPress={() => onPress("6")}>
                    <Text>6</Text>
                </Pressable>
            </View>
            <View style={styles.rowKeys}>
                <Pressable style={styles.btnKey} onPress={() => onPress("7")}>
                    <Text>7</Text>
                </Pressable>
                <Pressable style={styles.btnKey} onPress={() => onPress("8")}>
                    <Text>8</Text>
                </Pressable>
                <Pressable style={styles.btnKey} onPress={() => onPress("9")}>
                    <Text>9</Text>
                </Pressable>
            </View>
            <View style={styles.rowKeys}>
                <Pressable style={styles.btnKeyWithoutBg}>
                    <Text></Text>
                </Pressable>
                <Pressable style={styles.btnKey} onPress={() => onPress("0")}>
                    <Text>0</Text>
                </Pressable>
                <Pressable style={styles.btnKeyWithoutBg} onPress={() => onPress("")}>
                    <Image resizeMode='contain' source={Images.deleteKey} style={styles.imgDeleteKey} />
                </Pressable>
            </View>
        </View>
    )
}

export default ViewKeyboard

const styles = StyleSheet.create({
    containerKeys: {
        flex: 1,
        gap: 6,
        height: 150,
        justifyContent: 'flex-end',
        paddingBottom: '5%'
    },
    rowKeys: {
        width: '100%',
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
    },
    btnKey: {
        width: '31%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        ...StylesG.shadow
    },
    btnKeyWithoutBg: {
        width: '31%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: 'transparent'
    },
    imgDeleteKey: {
        height: 20,
        width: 25
    }
})