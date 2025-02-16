import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ColorsApp } from '../../../utilities/colors';
import { Fonts } from '../../../utilities/fonts';
import { WIDTH_SCREEN, spaceLeftRightList } from '../../../constants/constants';
import StylesG from '../../../utilities/stylesG';
import { bagsList } from '../search/Constants';
import { MotiView } from 'moti';
import Images from '../../../assets/images';

const WIDTH_ITEM = (WIDTH_SCREEN - spaceLeftRightList * 3) / 2;

const MyBookmarks = () => {
  const renderItem = ({ item, index }) => {
    return (
      <MotiView
        style={styles.containerItem}
        from={{
          opacity: 0,
          scale: 0.9
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{ delay: 1000 + index * 200 }}>
        <View style={styles.imgContainer}>
          <Image
            resizeMode="cover"
            source={{ uri: item.img }}
            style={styles.imgItem}
          />
          <View style={styles.playContainer}>
            <Images.play height={14} width={14} />
            <Text style={styles.socialCount}>45.5k</Text>
          </View>
        </View>
        <View style={styles.containerBottomRow}>
          <Image source={{ uri: item.profile }} style={styles.imgProfile} />
          <Text numberOfLines={1} style={styles.name}>
            {item.title}
          </Text>
        </View>
      </MotiView>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={bagsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.columnWrapper}
        ListFooterComponent={() => {
          return <View style={StylesG.footer} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsApp.white,
    paddingHorizontal: spaceLeftRightList
  },
  flatListContent: {
    paddingTop: 21,
    gap: spaceLeftRightList
  },

  columnWrapper: {
    justifyContent: 'flex-start',
    gap: spaceLeftRightList
  },
  containerItem: {
    width: WIDTH_ITEM,
    height: WIDTH_ITEM * 1.5,
    borderColor: 'red',
    borderWidth: 0
  },
  imgContainer: {
    flex: 1,
    backgroundColor: ColorsApp.white,
    borderRadius: 14
  },
  imgItem: {
    width: '100%',
    height: '100%',
    // aspectRatio: 1,
    borderRadius: 14
  },
  containerBottomRow: {
    marginTop: 10,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    height: 30
  },
  imgProfile: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  name: {
    ...Fonts.poppinsMedium13,
    paddingHorizontal: 7,
    flex: 1
  },
  playContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  socialCount: {
    ...Fonts.poppinsMedium13,
    color: ColorsApp.white,
    paddingHorizontal: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  }
});

export default MyBookmarks;
