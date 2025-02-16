import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState } from 'react';

import { HEIGHT_SCREEN, WIDTH_SCREEN } from '../../../constants/constants';
import { ColorsApp } from '../../../utilities/colors';


const Post = () => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <View
      
      style={{
        flex: 1,
        backgroundColor: '#000000',

        padding: 14
      }}>
        <Text>No Camera</Text>
      
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  camera: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // width: WIDTH_SCREEN,
    bottom: 0
  },
  btnCapture: {
    position: 'absolute',
    bottom: 15,
    right: WIDTH_SCREEN / 2 - 52,
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: ColorsApp.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: ColorsApp.white
  },
  containerRight: {
    position: 'absolute',
    top: 15,
    right: 13,
    width: 40
  },
  btnCameraProps: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00000050',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spacer: {
    height: 7
  }
});
