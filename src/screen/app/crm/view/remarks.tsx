import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IRemark } from '../../../../modelTypeScript'
import { Fonts } from '../../../../utilities/fonts'
import { getDateFrom } from '../../../../utilities'
import { Icon, Icons } from '../../../../assets/images'
import { ColorsApp } from '../../../../utilities/colors'
import { ButtonTitle } from '../../../components'

type Props = {
    remarks: IRemark[];
    onPressEdit: (remark: IRemark) => void
    onPressAddRemark: () => void
}


const Remarks = ({ remarks, onPressEdit, onPressAddRemark }: Props) => {

    return (
        <View style={styles.container}>
            {remarks.length === 0 && <View style={styles.containerNoRemark}>
                    <Text style={styles.txtNoRemark}>
                    You don't have any comments for this customer. You can add a comment by clicking the "Add Remark" button.
                    </Text>
                </View>}
            {remarks.map((item, index) => <View style={styles.containerRemark}>
                <View style={styles.rowRemark}>
                    <Text style={styles.txtRemark}>❊  {item.remark}</Text>
                    {index === 0 && <Pressable
                        hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
                        style={styles.btnEdit} onPress={() => onPressEdit(item)}>
                        <Icon type={Icons.MaterialIcons} name='edit' />
                    </Pressable>}
                </View>
                <View style={styles.containerDate}>
                    <Text style={styles.txtDate}>{getDateFrom({ date: item.created_at, format: 'D MMM, YY hh:mm a' })}</Text>
                </View>
            </View>
            )}
            <View style={styles.containerBtn}>
                <ButtonTitle
                    title='Add Remark'
                    onPress={onPressAddRemark}
                    //  width={WIDTH_SCREEN - (spaceLeftRight * 2)}
                    backgroundColor={ColorsApp.theme}
                    colorTitle={ColorsApp.white}

                    showLoading={false}
                    activityIndicatorColor={ColorsApp.white}
                />
            </View>
        </View>
    )
}

export default Remarks

const styles = StyleSheet.create({
    container: {
        gap: 5
    },
    containerNoRemark: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    txtNoRemark: {
        ...Fonts.poppinsMedium13,
        textAlign: 'center'
    },
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