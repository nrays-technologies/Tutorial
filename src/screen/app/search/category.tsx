import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { bagsList } from './Constants';
import { ColorsApp } from '../../../utilities/colors';
import { spaceLeftRightList } from '../../../constants/constants';
import StylesG from '../../../utilities/stylesG';
import ItemVideos from '../../components/itemVideos';
import { AppStackRoots } from '../../../navigation/AppNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const itemMargin = spaceLeftRightList;

type Props = NativeStackScreenProps<AppStackRoots, 'Category'>;

const Category = ({ navigation, route }: Props) => {

  const { title, id } = route.params

  useLayoutEffect(() => {
    navigation.setOptions({ title: title });
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ColorsApp.white,
      }}>

      <FlatList
        data={bagsList}
        renderItem={({ item, index }) => {
          return <ItemVideos item={item} index={index} />
        }}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.columnWrapper}
        ListFooterComponent={() => {
          return <View style={StylesG.footer} />;
        }}
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

export default Category;
