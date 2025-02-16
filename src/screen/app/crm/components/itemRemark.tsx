import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Fonts } from '../../../../utilities/fonts'
import { ColorsApp } from '../../../../utilities/colors'
import { Icon, Icons } from '../../../../assets/images'
import { getDateFrom } from '../../../../utilities'
import { IRemark } from '../../../../modelTypeScript'

type Props = {

    index: number;
    item: IRemark;
    onPressEdit: (item: IRemark) => void
}

const ItemRemark = ({ index, item, onPressEdit }: Props) => {
    return (
        <View style={styles.containerRemark}>
            <View style={styles.rowRemark}>
                <Text style={styles.txtRemark}>❊  {item.remark}</Text>
                {/* {index === 0 && <Pressable
                    hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
                    style={styles.btnEdit} onPress={() => onPressEdit(item)}>
                    <Icon type={Icons.MaterialIcons} name='edit' />
                </Pressable>} */}
            </View>
            <View style={styles.containerDate}>
                <Text style={styles.txtDate}>{getDateFrom({ date: item.created_at, format: 'D MMM, YY hh:mm a' })}</Text>
            </View>
        </View>
    )
}

export default ItemRemark

const styles = StyleSheet.create({
    containerRemark: {
        paddingVertical: 5,
        borderBottomColor: ColorsApp.listSeparator,
        borderBottomWidth: 1
    },
    rowRemark: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20
    },
    txtRemark: {
        flex: 1,
        ...Fonts.poppinsMedium13,
        paddingBottom: 5,
        paddingLeft: 5
    },
    btnEdit: {},
    containerDate: {
        width: '100%',
        alignItems: 'flex-end'
    },
    txtDate: {
        ...Fonts.poppins12,
        color: ColorsApp.txtDescGrey
    },
    containerBtn: {
        paddingVertical: 25
    },
})