import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import React, { useState } from 'react';
import { Fonts } from '../../../utilities/fonts';
import { ColorsApp } from '../../../utilities/colors';
import { MotiView } from 'moti';
import { bagsList } from '../search/Constants';
import StylesG from '../../../utilities/stylesG';

const MyFollowers = () => {
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleItemSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds((prevIds) => prevIds.filter((itemId) => itemId !== id));
    } else {
      setSelectedIds((prevIds) => [...prevIds, id]);
    }
  };
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
        <View style={styles.containerInfo}>
          <Image source={{ uri: item.profile }} style={styles.imgProfile} />
          <View style={styles.containerColumnInfo}>
            <Text
              numberOfLines={1}
              style={[styles.name, { color: ColorsApp.black }]}>
              {item.title}
            </Text>
            <Text numberOfLines={1} style={[styles.socialCount]}>
              200k Followers
            </Text>
          </View>
        </View>
        <Pressable
          onPress={() => toggleItemSelect(item.id)}
          style={[
            styles.btn,
            {
              backgroundColor: selectedIds.includes(item.id)
                ? ColorsApp.black
                : ColorsApp.theme
            }
          ]}>
          <Text style={styles.btnTitle}>
            {selectedIds.includes(item.id) ? 'Following' : 'Follow'}
          </Text>
        </Pressable>
      </MotiView>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={bagsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => {
          return <View style={StylesG.footer} />;
        }}
        ItemSeparatorComponent={() => {
          return <View style={StylesG.separatorFlatList}></View>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsApp.white
  },
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 64
  },

  containerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  imgProfile: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  containerColumnInfo: {
    paddingHorizontal: 11
  },
  name: {
    ...Fonts.poppinsSemiBold15
  },
  btn: {
    height: 34,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorsApp.theme,
    borderRadius: 18
  },
  btnTitle: {
    ...Fonts.poppinsMedium13,
    color: ColorsApp.white
  },
  socialCount: {
    ...Fonts.poppins13,
    color: ColorsApp.txtDescGrey
  }
});

export default MyFollowers;
