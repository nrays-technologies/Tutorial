import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

type Props = {
  code: string;
};

const PinCode = ({code}: Props) => {
  const animationScale1 = useRef(new Animated.Value(0)).current;
  const animationScale2 = useRef(new Animated.Value(0)).current;
  const animationScale3 = useRef(new Animated.Value(0)).current;
  const animationScale4 = useRef(new Animated.Value(0)).current;

  //   const scaleInterpolate = animationScale1.interpolate({
  //     inputRange: [0, 1],
  //     outputRange: [1, 2],
  //   });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animationScale1, {
        toValue: code.length > 0 ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animationScale2, {
        toValue: code.length > 1 ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animationScale3, {
        toValue: code.length > 2 ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animationScale4, {
        toValue: code.length > 3 ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [
    animationScale1,
    animationScale2,
    animationScale3,
    animationScale4,
    code,
  ]);

  return (
    <View style={styles.container}>
      {['1', '2', '3', '4'].map(item => {
        let scaleInterpolate = animationScale1.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 2],
        });
        switch (item) {
          case '1':
            scaleInterpolate = animationScale1.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 2],
            });
            break;
          case '2':
            scaleInterpolate = animationScale2.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 2],
            });
            break;
          case '3':
            scaleInterpolate = animationScale3.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 2],
            });
            break;
          case '4':
            scaleInterpolate = animationScale4.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 2],
            });
            break;

          default:
            break;
        }

        return (
          <Animated.View
            style={{
              ...styles.itemPin,
              transform: [
                {
                  scale: scaleInterpolate,
                },
              ],
            }}
          />
        );
      })}
    </View>
  );
};

export default PinCode;

const styles = StyleSheet.create({
  container: {
    marginTop: '15%',
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemPin: {
    height: 16,
    width: 16,
    backgroundColor: '#8A865D',
    borderRadius: 8,
  },
});
