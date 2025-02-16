import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ColorsApp } from '../../../utilities/colors'
import StylesG from '../../../utilities/stylesG'
import { Loader } from '../../components'
import { IRemark } from '../../../modelTypeScript'
import Remarks from './view/remarks'
import ItemRemark from './components/itemRemark'
import { getLeadRemarks } from '../../../network/managers/crmAPI'

interface IInfo {
    isLoading: boolean,
    data: IRemark[]
}

const RemarkList = ({ navigation, route }: any) => {

    const {showDateList, leadId, customer_id} = route.params
    const [info, setInfo] = useState<IInfo>({
        isLoading: true,
        data: []
    })

    useEffect(() => {
        
        getRemarks()
        
    }, [])

    const getRemarks = async () => {
        setInfo((prevState) => ({
            ...prevState,
            isLoading: true,
        }))
        const resp = await getLeadRemarks(leadId)
        if (resp.status === true) {
            setInfo((prevState) => ({
                ...prevState,
                isLoading: false,
                data: resp.data
            }))
        }
        else {
            setInfo((prevState) => ({
                ...prevState,
                isLoading: false,
                data: []
            }))
        }
    }
    const onPressEdit = () => {

    }

    return (
        <View style={styles.container}>
            
            <FlatList
                contentContainerStyle={styles.contentContainerStyle}
                showsVerticalScrollIndicator={false}
                data={info.data}
                renderItem={({ item, index }) => {
                    return <ItemRemark index={index} item={item} onPressEdit={onPressEdit} />
                }}
                keyExtractor={(item, index) => item.id.toString()}
            />
            <Loader animating={info.isLoading} />
        </View>
    )
}

export default RemarkList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorsApp.white,
    },
    contentContainerStyle: {
        gap: 10,
        padding: 10
    },
    dateContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 40,
        borderColor: ColorsApp.grey33,
        borderWidth: 0.7,
        borderRadius: 5,
        gap: 5,
        ...StylesG.shadowBottom
    }
})