import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { ColorsApp } from '../../utilities/colors';

export type Props = {
  isShow: boolean;
  options: string[];
  selectedOptions?: string[];
  onPressCancel: () => void;
  onPressDone: (items: string[]) => void;
};

const ModalImagesPicker = ({
  isShow = false,
  options,
  selectedOptions = [],
  onPressCancel,
  onPressDone
}: Props) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isShow}>
      <Pressable onPress={onPressCancel} style={styles.container}>
        <Pressable
          onPress={() => console.log('')}
          style={[styles.dropdoenStyle]}></Pressable>
      </Pressable>
    </Modal>
  );
};

export default ModalImagesPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.0)',
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  dropdoenStyle: {
    width: '100%',
    maxHeight: '70%',
    backgroundColor: ColorsApp.white,
    borderRadius: 10,
    paddingVertical: 20,
    overflow: 'hidden'
  }
});
