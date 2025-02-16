import { Button, Pressable, StyleSheet, Switch, Text, View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import StylesG from '../../../utilities/stylesG'
import { useSelector } from 'react-redux'
import { selectAppOptions, signout } from '../../../redux/reducers/appOptionsSlice'
import { Fonts } from '../../../utilities/fonts'
import { ColorsApp } from '../../../utilities/colors'
import { getFirstCharOfWord } from '../../../utilities'
import { FlatList } from 'react-native'
import Images, { Icon, Icons } from '../../../assets/images'
import { spaceHorizontal, spaceLeftRight } from '../../../constants/constants'
import { ButtonTitle } from '../../components'
import { alertShowWithMultiButtonPromise } from '../../../utilities/alerts'
import { useTranslation } from 'react-i18next'
import { TranslationKeys } from '../../../i18n/language'
import { navigationRef } from '../../../navigation/navigationRef'
import { useAppDispatch } from '../../../redux/store'

const iconSize = 20

const arrMenu = [
    {
        title: 'Notification',
        icons: <Images.menu_notification height={iconSize} width={iconSize} />
    },
    {
        title: 'Change Pin',
        icons: <Images.meun_pin height={iconSize} width={iconSize} />
    },
    {
        title: 'Terms & Condition',
        icons: <Images.menu_tc height={iconSize} width={iconSize} />
    },
    {
        title: 'Privacy Policy',
        icons: <Images.menu_pp height={iconSize} width={iconSize} />
    },
]

type Props = {
    showMenu: boolean
    onPressClose: (value: string) => void
}

const ModalMenu = ({ showMenu, onPressClose }: Props) => {

    const { userInfo } = useSelector(selectAppOptions)
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const onPressLogout = async () => {
        const result = await alertShowWithMultiButtonPromise({ msg: 'Are you sure? you want to logout.', buttonsTitle: ["Yes", "No"] })
        if (result === "Yes") {
            // onPressClose()
            dispatch(signout())
        }
    }
    const onPressdelete = async () => {
        const result = await alertShowWithMultiButtonPromise({ msg: 'Are you sure? you want to delete your account.', buttonsTitle: ["Yes", "No"] })
        if (result === "Yes") {
            // onPressClose()
            dispatch(signout())
        }
    }

    const onPressItem = (title: string) => {
        switch (title) {
            case 'Terms & Condition':
                onPressClose()
                navigationRef.navigate('WebScreen', {
                    title: 'Terms & Condition',
                    url: 'https://google.com'
                })
                break;
            case 'Privacy Policy':
                onPressClose()
                navigationRef.navigate('WebScreen', {
                    title: 'Terms & Condition',
                    url: 'https://yahoo.com'
                })
                break;
            case 'Change Pin':

                break;
            default:
                break;
        }

    }
    return (
        <Modal
            isVisible={showMenu}
            animationIn="slideInLeft"
            animationOut="slideOutLeft"
            coverScreen={true}
            animationInTiming={500}
            style={{ margin: 0 }}
            backdropColor='#FFF'
        >
            <View style={styles.conatiner}>
                <View style={styles.header}>
                    <View style={styles.containerImage}>
                        <Text style={styles.nameLetter}>{getFirstCharOfWord(userInfo?.first_name)}</Text>
                    </View>
                    <View>
                        <Text style={styles.name}>{`${userInfo?.first_name} ${userInfo?.last_name}`}</Text>
                        <Text style={styles.phone}>{userInfo?.mobile}</Text>
                    </View>

                    <Pressable onPress={onPressClose} hitSlop={5} style={styles.btnClose}>
                        <Icon type={Icons.Ionicons} name='close' />
                    </Pressable>
                </View>
                <FlatList
                    contentContainerStyle={styles.listContent}
                    data={arrMenu}
                    renderItem={({ item, index }) => {
                        return <Pressable style={styles.item} onPress={() => onPressItem(item.title)}>
                            <View style={styles.itemContent}>
                                {item.icons}
                                <Text>{item.title}</Text>
                            </View>
                            {item.title == 'Notification' && <Switch />}
                        </Pressable>
                    }}
                    keyExtractor={(item) => item.title} />
                <ButtonTitle title='Logout' backgroundColor={ColorsApp.theme} onPress={onPressLogout} />
                <ButtonTitle title='Delete Account' colorTitle={ColorsApp.red} onPress={onPressdelete} />
            </View>
        </Modal>
    )
}

export default ModalMenu

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: spaceLeftRight
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        // paddingHorizontal: spaceLeftRight,
        paddingVertical: '10%'
    },
    containerImage: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        aspectRatio: 1,
        borderRadius: 45,
        ...StylesG.shadow
    },
    nameLetter: {
        ...Fonts.poppinsSemiBold32,
        color: ColorsApp.theme
    },
    name: {
        ...Fonts.poppinsSemiBold24,
        color: ColorsApp.black60,
        textTransform: 'capitalize'
    },
    phone: {
        ...Fonts.poppins13,
        color: ColorsApp.black60
    },
    btnClose: {
        position: 'absolute',
        right: 0,
        top: 40
    },
    listContent: {
        paddingHorizontal: 0
    },
    item: {
        flexDirection: 'row',
        height: 45,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemContent: {
        flex: 1,
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
    }
})