import React, { useCallback, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { Fonts } from '../../utilities/fonts';

type Props = {
  selectedIndex?: number;
  arrItems: string[];
  onPress: ({ item, index }: { item: string; index: number }) => void;
};

// interface ISelectedSegment {
//   item: string;
//   index: number;
// }

interface ILayout {
  x: number;
  width: number;
}

const SegmentedControl = ({
  selectedIndex = 0,
  arrItems = [],
  onPress
}: Props) => {
  const { t } = useTranslation();
  const [indexSelected, setIndexSelected] = useState(selectedIndex);
  const arrItemLayout = useRef<ILayout[]>([]);

  const translateX = useSharedValue(0);
  const widthBar = useSharedValue(100.1);

  const onPressItem = (index: number) => {
    widthBar.value = withSpring(arrItemLayout.current[index].width - 20);
    translateX.value = withSpring(arrItemLayout.current[index].x + 10);
    setIndexSelected(index);
  };

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { x, y, height, width } = event.nativeEvent.layout;

    arrItemLayout.current.push({ x, width });
    if (arrItemLayout.current.length == 1) {
      translateX.value = withSpring(arrItemLayout.current[0].x + 10);
      widthBar.value = withSpring(arrItemLayout.current[0].width - 20);
      setIndexSelected(0);
    }
  }, []);

  // const playAnimation = (x: number) => {
  //   Animated.timing(refAnimated, {
  //     toValue: x,
  //     duration: 300,
  //     useNativeDriver: true
  //   }).start();
  // };

  return (
    <View style={styles.container}>
      <View style={styles.containerRow}>
        {arrItems.length > 0 &&
          arrItems.map((item, index) => {
            return (
              <Pressable
                key={item + index.toString()}
                onLayout={onLayout}
                onPress={() => onPressItem(index)}>
                <Text style={styles.title}>{item}</Text>
              </Pressable>
            );
          })}
      </View>
      <Animated.View
        style={[
          styles.barBottom,
          {
            width: widthBar,
            transform: [{ translateX }]
          }
        ]}
      />
    </View>
  );
};

export default SegmentedControl;

const styles = StyleSheet.create({
  container: { flex: 1, borderColor: 'green', borderWidth: 0 },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    marginHorizontal: 10,
    ...Fonts.poppinsMedium17,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    color: '#FFF'
  },
  barBottom: {
    height: 3,
    backgroundColor: '#FFF',
    width: 82,
    borderRadius: 10
  }
});
