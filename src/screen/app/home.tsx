import { Button, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { spaceLeftRight, WIDTH_SCREEN } from '../../constants/constants'
import Images, { Icon, Icons } from '../../assets/images'
import StylesG from '../../utilities/stylesG'
import ItemHome from './itemHome'
import { Fonts } from '../../utilities/fonts'
import { IHomeItem } from '../../modelTypeScript'
import Modal from "react-native-modal";
import ModalMenu from './menu/modalMenu'
import { FontName } from '../../constants/fontConst'
import { useDispatch } from 'react-redux'
import { getCollectionHome } from '../../redux/reducers/collectionsSlice'
import { useAppDispatch } from '../../redux/store'

const arrData = [
    {
        title: 'CRM',
        icon: <Images.crm height={45} width={45} />,
        backgroundColor: '#E7F2FD',
        color: '#0859A4'
    },
    {
        title: 'Collection',
        icon: <Images.collection height={45} width={45} />,
        backgroundColor: '#F3FFE2',
        color: '#406A06'
    },
    {
        title: 'Attendance',
        icon: <Images.attendance height={45} width={45} />,
        backgroundColor: '#FFF6FA',
        color: '#5A082E'
    },
    {
        title: 'CRM',
        icon: <Images.crm height={45} width={45} />,
        backgroundColor: '#E1E2EF',
        color: '#060D5E'
    }
]


const Home = ({ navigation }: any) => {

    const [showMenu, setShowMenu] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "DC Energies",
            headerLeft: () => <Pressable style={styles.btnMenu} onPress={onPressMenu}>
                <Icon type={Icons.Ionicons} name='list-outline' color='#000' />
            </Pressable>,
            headerTitleStyle: {
                ...Fonts.fontNavBarTitleLogo,
                fontFamily: 'Neuropol-Regular',
                // fontWeight: '800'
            }
        });
    }, [])

    useEffect(() => {
      
        dispatch(getCollectionHome())
      
    }, [])
    
    const onPressMenu = () => {
        setShowMenu(!showMenu)
    }

    const onPressItem = (item: IHomeItem) => {
        switch (item.title) {
            case 'CRM':
                navigation.navigate('HomeCRM')
                break;
                case 'Collection':
                navigation.navigate('HomeCollection')
                break;
            default:
                break;
        }
    }


    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                bounces={false}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.contentContainer}
                data={arrData}
                renderItem={({ item, index }) => <ItemHome item={item} onPress={onPressItem} />}
                ListHeaderComponent={() => {
                    return <View style={styles.header}>
                        <Image source={Images.banner} resizeMode='contain' style={{ width: WIDTH_SCREEN - (spaceLeftRight * 2), height: (WIDTH_SCREEN - (spaceLeftRight * 2)) / 2 }} />
                    </View>
                }}
                stickyHeaderIndices={[0]}
                keyExtractor={(item) => item.title} 
                ListFooterComponent={() => {
                    return <View style={styles.listFooter} />
                }}/>

            <ModalMenu showMenu={showMenu} onPressClose={onPressMenu} />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        width: WIDTH_SCREEN,
    },
    columnWrapper: { gap: 15 },
    contentContainer: {
        gap: 15,
        paddingHorizontal: spaceLeftRight,
        
    },
    btnMenu: {
        paddingLeft: spaceLeftRight
    },
    listFooter: {
        height: 40
    }
})