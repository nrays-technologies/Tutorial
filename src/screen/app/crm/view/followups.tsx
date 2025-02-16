import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IFollowup } from '../../../../modelTypeScript';
import StylesG from '../../../../utilities/stylesG';
import ItemFollowup from '../components/itemFollowup';
import { Fonts } from '../../../../utilities/fonts';

import { Icon, Icons } from '../../../../assets/images';
import { getStringFrom } from '../../../../utilities';
import { ButtonTitle } from '../../../components';
import { ColorsApp } from '../../../../utilities/colors';

type Props = {
    followups: IFollowup[];
    onPressEdit: (remark: IFollowup) => void
    onPressAdd: () => void
}

const Followups = ({ followups, onPressAdd, onPressEdit }: Props) => {

    return (
        <View style={styles.container}>
            {followups.length === 0 && <View style={styles.containerNoFollowup}>
                    <Text style={styles.txtNoFollowup}>
                    You don't have any "Follow-up" for this customer. You can add a comment by clicking the "Add Followup" button.
                    </Text>
                </View>}
            {followups.map((item, index) => <ItemFollowup index={index} item={item} onPressEdit={onPressEdit}  /> )}
            <View style={styles.containerBtn}>
                <ButtonTitle
                    title='Add Followup'
                    onPress={onPressAdd}
                    backgroundColor={ColorsApp.theme}
                    colorTitle={ColorsApp.white}
                    showLoading={false}
                    activityIndicatorColor={ColorsApp.white}
                />
            </View>
        </View>
    )
}

export default Followups

const styles = StyleSheet.create({
    container: {
        gap: 10
    },
    containerNoFollowup: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    txtNoFollowup: {
        ...Fonts.poppinsMedium13,
        textAlign: 'center'
    },
    containerFollowup: {
        ...StylesG.shadow,
        borderRadius: 10,
        padding: 10,
        gap: 5
    },
    rowRemark: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20
    },
    txtRemark: {
        flex: 1,
        ...Fonts.poppinsMedium13,
        paddingBottom: 5,
        paddingLeft: 5
    },
    btnEdit: {},
    containerBtn: {
        paddingVertical: 25
    },
})