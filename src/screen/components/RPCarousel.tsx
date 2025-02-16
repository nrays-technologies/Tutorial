import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle
} from 'react-native';
import React, { PropsWithChildren, useState } from 'react';
// import RPImageExtention from './RPImageExtention';
import Carousel from 'react-native-reanimated-carousel';
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import { ColorsApp } from '../../utilities/colors';
import { spaceLeftRight } from '../../constants/constants';




const widthWindow = Dimensions.get('window').width;

type Props = {
  style?: ViewStyle;
  paddingCarousel?: number;
  data: any[];
  onPressItem?: (item) => void;
};

const RPCarousel: React.FC<PropsWithChildren<Props>> = ({
  children,
  style,
  paddingCarousel = 20,
  data,
  onPressItem
}) => {
  const [index, setIndex] = useState<number>(0);

  if (data.length == 0) {
    return <View />;
  }
  return (
    <View
      style={[styles.container, style ]}>
      <Carousel
        loop
        width={widthWindow - paddingCarousel}
        height={(widthWindow - paddingCarousel) / 2}
        autoPlay={data.length > 1}
        data={data}
        scrollAnimationDuration={500}
        autoPlayInterval={2000}
        onSnapToItem={(index) => setIndex(index)}
        renderItem={({ item, index }) => {
            return (
              <Pressable
                style={{
                  flex: 1,
                  borderWidth: 0,
                  borderColor:'red',
                  justifyContent: 'center',
                  paddingHorizontal: spaceLeftRight,
                  paddingBottom: spaceLeftRight,
                  
                }}>
                {/* <RPImageExtention styleContainer={{borderRadius: 10, overflow: 'hidden'}} url_image={item} resizeMode={'cover'} /> */}
                <Image source={item} style={{width: '100%', height: '100%'}} resizeMode='cover'/>
              </Pressable>
            );
        }}
      />

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          height: 9
        }}>
        <AnimatedDotsCarousel
          length={data.length}
          currentIndex={index}
          maxIndicators={4}
          interpolateOpacityAndColor={true}
          activeIndicatorConfig={{
            color: ColorsApp.theme,
            margin: 3,
            opacity: 1,
            size: 6,
          }}
          inactiveIndicatorConfig={{
            color: ColorsApp.grey99,
            margin: 3,
            opacity: 0.5,
            size: 6
          }}
          decreasingDots={[
            {
              config: {
                color: ColorsApp.grey99,
                margin: 10,
                opacity: 0.5,
                size: 6,
              },
              quantity: 1
            },
            {
              config: {
                color: ColorsApp.grey99,
                margin: 3,
                opacity: 0.5,
                size: 3
              },
              quantity: 1
            }
          ]}
        />
      </View>
    </View>
  );
};

export default RPCarousel;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 2,
    // backgroundColor: ColorsApp.sepratorList,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: 15,
    borderWidth: 0,
    borderColor: 'green'
  }
});
