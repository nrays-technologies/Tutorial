import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ColorsApp } from '../../utilities/colors';
import { TextInput } from 'react-native-gesture-handler';
import { Fonts } from '../../utilities/fonts';
import { ButtonTitle } from '../components';
import { addRemark } from '../../network/managers/crmAPI';
import { alertShow } from '../../utilities/alerts';
import { IRemark } from '../../modelTypeScript';
import { Icon, Icons } from '../../assets/images';
import StylesG from '../../utilities/stylesG';

export type Props = {
    isShow: boolean;
    id: number
    oldRemark: IRemark | undefined;

    onPressCancel: () => void;
    onPressDone: () => void;
};

const ModalAddRemark = ({
    isShow = false,
    id,
    oldRemark,
    onPressCancel,
    onPressDone
}: Props) => {

    const [loading, setLoading] = useState(false)
    const [remark, setRemark] = useState('')
    useEffect(() => {
        if (oldRemark) {
            setRemark(oldRemark.remark)
        }
        else {
            setRemark('')
        }
    }, [oldRemark])


    const onPressSubmit = async () => {
        setLoading(true)
        let remarkId = oldRemark ? oldRemark.id : undefined
        const resp = await addRemark({ id, remarkId, remark })
        if (resp.status == true) {
            
            setLoading(false)
            onPressDone()
            
        }
        else {
            setLoading(false)
            alertShow({ msg: resp.message, buttonTitle: 'Ok' })
        }
    }
    return (
        <Modal animationType="slide" transparent={true} visible={isShow}>
            <Pressable onPress={onPressCancel} style={styles.container}>
                <Pressable
                    onPress={() => console.log('')}
                    style={[styles.dropdoenStyle]}>
                    <Text style={styles.title}>Remark</Text>
                    <TextInput
                        placeholder='Enter your inputs'
                        multiline={true}
                        style={styles.inputRemark}
                        value={remark}
                        onChangeText={(value) => setRemark(value)}
                    />
                    <View style={styles.containerBtn}>
                        <ButtonTitle
                            title={oldRemark ? 'Update' : 'Submit'}
                            onPress={onPressSubmit}
                            //  width={WIDTH_SCREEN - (spaceLeftRight * 2)}
                            backgroundColor={ColorsApp.theme}
                            colorTitle={ColorsApp.white}

                            showLoading={false}
                            activityIndicatorColor={ColorsApp.white}
                        />
                    </View>
                    <Pressable style={styles.btnCross} onPress={onPressCancel}>
                        <Icon type={Icons.MaterialIcons} name='close' color='#000' size={30} />
                    </Pressable>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default ModalAddRemark

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#00000080',
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    dropdoenStyle: {
        width: '100%',

        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingVertical: 20,
        overflow: 'hidden',
        alignItems: 'center'
    },
    title: {
        ...Fonts.poppinsSemiBold20,
    },
    inputRemark: {
        marginTop: 20,
        height: 120,
        width: '90%',
        borderWidth: 1,
        borderColor: ColorsApp.txtDescGrey,
        borderRadius: 10,
        padding: 10,
        ...Fonts.poppins15
    },
    containerBtn: {
        paddingVertical: 25
    },
    btnCross: {
        position: 'absolute',
        top: 9,
        right: 3,
        height: 50,
        width: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})