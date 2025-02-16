import React from 'react';
import { StyleSheet, View, FlatList, } from 'react-native';
import { bagsList } from './Constants';
import { ColorsApp } from '../../../utilities/colors';
import { spaceLeftRightList } from '../../../constants/constants';
import StylesG from '../../../utilities/stylesG';
import { ItemVideos } from '../../components';

const itemMargin = spaceLeftRightList;

const Videos = () => {

  const renderItem = ({ item, index }) => {
    return (
      <ItemVideos item={item} index={index} />
    );
  };
  const renderFooter = () => {
    return <View style={StylesG.footer} />;
  };


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ColorsApp.white,
      }}>

      <FlatList
        data={bagsList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.columnWrapper}
        ListFooterComponent={renderFooter}
        keyboardShouldPersistTaps='handled'
        keyboardDismissMode='on-drag'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    paddingHorizontal: itemMargin,
    paddingTop: 21,
    gap: itemMargin,
  },

  columnWrapper: {
    justifyContent: 'flex-start',
    gap: itemMargin,
  },

});

export default Videos;
