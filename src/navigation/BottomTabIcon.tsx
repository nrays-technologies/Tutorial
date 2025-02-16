import React from 'react';
import {StyleSheet, View} from 'react-native';
import Images from '../assets/images';

interface Props {
  route: string;
  isFocused: boolean;
}

const BottomTabIcon = ({route, isFocused}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const renderIcon = (route: string, isFocused: boolean) => {
    let height: number = 22;
    let width: number = 22;

    switch (route) {
      case 'Home':
        return (
          <Images.tabHome
            width={width}
            height={height}
            // fill={isFocused ? '#0067FF' : '#ffffff'}
          />
        );
      case 'Search':
        return (
          <Images.tabSearch
            width={width}
            height={height}
            // fill={isFocused ? '#0067FF' : '#ffffff'}
          />
        );
      case 'Post':
        return (
          <Images.tabPost
            width={width}
            height={height}
            // fill={isFocused ? '#0067FF' : '#ffffff'}
          />
        );
      case 'Profile':
        return (
          <Images.tabProfile
            width={width}
            height={height}
            // fill={isFocused ? '#0067FF' : '#ffffff'}
          />
        );
      default:
        break;
    }
  };

  return <View style={styles.container}>{renderIcon(route, isFocused)}</View>;
};

export default BottomTabIcon;

const styles = StyleSheet.create({
  container: {
    marginBottom: 7,
  },
});
