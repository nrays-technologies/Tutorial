import React, { useState } from 'react';

import { StyleSheet, View, FlatList } from 'react-native';
import { bagsList } from './Constants';
import { WIDTH_SCREEN, spaceLeftList } from '../../../constants/constants';
import StylesG from '../../../utilities/stylesG';
import { ItemUsers } from '../../components';
import { Fonts } from '../../../utilities/fonts';
import { ColorsApp } from '../../../utilities/colors';

const Users = () => {
  // const toggleItemSelect = (id) => {
  //   if (selectedIds.includes(id)) {
  //     setSelectedIds((prevIds) => prevIds.filter((itemId) => itemId !== id));
  //   } else {
  //     setSelectedIds((prevIds) => [...prevIds, id]);
  //   }
  // };

  const [selectedIds, setSelectedIds] = useState([]);

  const onPress = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds((prevIds) => prevIds.filter((itemId) => itemId !== id));
    } else {
      setSelectedIds((prevIds) => [...prevIds, id]);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <ItemUsers
        item={item}
        index={index}
        selectedIds={selectedIds}
        onPressFlwBtn={onPress}
      />
    );
  };

  const renderFooter = () => {
    return <View style={StylesG.footer} />;
  };

  const renderSeparator = () => {
    return <View style={StylesG.separatorFlatList} />;
  };

  return (
    <FlatList
      data={bagsList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingLeft: spaceLeftList }}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={renderFooter}
      ItemSeparatorComponent={renderSeparator}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    padding: 16
  },
  flwBtn: {
    ...Fonts.poppinsMedium13,
    color: ColorsApp.white
  },
  btn: {
    height: 34,
    width: WIDTH_SCREEN - 280,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorsApp.theme,
    borderRadius: 18
  },

  count: {
    ...Fonts.poppinsMedium10
  },
  profileContainer: {
    width: 30
  },
  profile: {
    width: '100%',
    height: 30,
    borderRadius: 15
  },
  image: {
    width: '100%',
    height: 218,
    // aspectRatio: 1,
    borderRadius: 14
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
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
    ...Fonts.poppinsMedium17,
    color: ColorsApp.white
  }
});

export default Users;
