/* eslint-disable react-native/no-inline-styles */
import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { PropsWithChildren, useState } from 'react';
import { WIDTH_SCREEN } from '../constants/constants';
import { ColorsApp } from '../utilities/colors';
import { Fonts } from '../utilities/fonts';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
// Create an array with a length of 4, each element being an object with 'route' and 'index' fields
const arrayWithRouteAndIndex = [
  { route: 'Videos' },
  { route: 'Users' },
  { route: 'Category' },
  { route: 'Location' }
];

type PropsSegment = PropsWithChildren<{
  onPressItem: (index: number) => void;
}>;

const Segment = ({ onPressItem }: PropsSegment) => {
  const TAB_BAR_WIDTH = WIDTH_SCREEN;
  const TAB_WIDTH = TAB_BAR_WIDTH / arrayWithRouteAndIndex.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);
  const widthBar = useSharedValue(100.1);
  const translateAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(TAB_WIDTH * currentIndex) }]
    };
  });

  const onPressTab = (index: number) => {
    translateX.value = (WIDTH_SCREEN / 4) * index;
    setCurrentIndex(index);
    onPressItem(index);
  };

  return (
    <View
      style={[
        styles.tabBarContainer,
        {
          width: WIDTH_SCREEN
        }
      ]}>
      {arrayWithRouteAndIndex.map((item, index) => {
        return (
          <Pressable
            style={{ flex: 1 }}
            onPress={() => {
              onPressTab(index);
            }}>
            <View style={styles.contentContainer}>
              <Text style={styles.txtStyle}>{item.route}</Text>
            </View>
          </Pressable>
        );
      })}

      <Animated.View
        style={[
          styles.slidingTabContainer,
          { width: TAB_WIDTH },
          translateAnimation
        ]}>
        <View style={styles.slidingTab} />
      </Animated.View>
    </View>
  );
};

export default Segment;

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: 50,
    borderBottomWidth: 0.5,
    borderColor: ColorsApp.grey33,
    borderRadius: 0,
    justifyContent: 'space-around'
  },
  slidingTab: {
    width: 12,
    height: 12,
    borderRadius: 100,
    backgroundColor: 'red',
    zIndex: 200,
    top: 42.5
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // gap: 4,
  },
  txtStyle: {
    ...Fonts.poppinsMedium13
  },
  slidingTabContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    top: 1,
    zIndex: 100
  }
});
