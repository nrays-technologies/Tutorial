import { View, Text, StyleSheet, Modal, Image } from 'react-native';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { ColorsApp } from '../../utilities/colors';
import LottieView from 'lottie-react-native';
import { WIDTH_SCREEN } from '../../constants/constants';


type props = {
  animating?: boolean;
};
const Loader = ({ animating }: props) => {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={animating}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
      
        <ActivityIndicator color={ColorsApp.theme} size='large' animating={animating} />
        {/* <LottieView
          style={{
            width: WIDTH_SCREEN,
            height: 250,
          }}
          source={require('../../assets/images/lotties/loaders.json')}
          autoPlay 
          loop 
        /> */}
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000080'
  }
});
