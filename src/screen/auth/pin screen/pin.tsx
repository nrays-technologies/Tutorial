import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PinCode from './pinCode';
import { HEIGHT_SCREEN } from '../../../constants/constants';
import { ColorsApp } from '../../../utilities/colors';

const arrKeypad = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'Reset',
  '0',
  '◀︎',
];
const WIDTH_SCREEN = Dimensions.get('screen').width;
const WIDTH_ITEM = (WIDTH_SCREEN - 60) / 3;

type Props = {
  removePin?: boolean
  title: string,
  onSuccess: (value: string) => void
  onReset: () => void
}

const Pin = ({removePin = false, title= 'Enter Pin', onSuccess, onReset}: Props) => {
  const [pinCode, setPinCode] = useState<string>('');

  useEffect(() => {
    if(removePin === true) {
      setPinCode('')
    }
  }, [removePin])

  useEffect(() => {
    if (pinCode.length == 4) {
      onSuccess(pinCode)
      if(removePin === false) {
        setPinCode('')
      }
    }
  }, [pinCode])
  
  const onPressItemPin = (key: string) => {
    if (key === 'Reset') {
      setPinCode('')
      onReset()
    }
    else if (key === arrKeypad[arrKeypad.length - 1]) {
      if (pinCode.length == 0) {
        setPinCode('');
      } else {
        setPinCode(pinCode.substring(0, pinCode.length - 1));
      }
    } else if (pinCode.length < 4) {
      setPinCode(pinCode + key);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.title}>{title}</Text>
        <PinCode code={pinCode} />
      </View>
      <FlatList
        numColumns={3}
        columnWrapperStyle={styles.columnWrapperStyle}
        contentContainerStyle={styles.contentContainerStyle}
        data={arrKeypad}
        renderItem={({item}) => {
          return (
            <View style={styles.item}>
              <TouchableOpacity
                style={[styles.btnItem, {borderWidth: item.length > 0 ? 1: 0}]}
                onPress={() => onPressItemPin(item)}>
                <Text style={styles.titleItem}>{item}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Pin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
  containerHeader: {
    height: '35%',
    paddingVertical: '20%',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    color: ColorsApp.theme,
  },
  columnWrapperStyle: {
    paddingHorizontal: 30,
    gap: WIDTH_ITEM/ 50
  },
  contentContainerStyle: {
    gap: HEIGHT_SCREEN / 50
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  titleItem: {
    fontSize: 20,
    fontWeight: '700',
    color: ColorsApp.theme
  },
  btnItem: {
    width: '80%',
    aspectRatio: 1,
    borderRadius: WIDTH_ITEM / 2,
    // backgroundColor: '#7F462C', //'#483C32', // '#827B60', //'#8A865D',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: ColorsApp.theme
  },
});
