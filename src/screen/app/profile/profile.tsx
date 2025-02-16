import {
  Button,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { ColorsApp } from '../../../utilities/colors';
import Images from '../../../assets/images';
import { Fonts } from '../../../utilities/fonts';
import { bagsList } from '../search/Constants';
import { MotiView } from 'moti';
import { WIDTH_SCREEN, spaceLeftRightList } from '../../../constants/constants';
import StylesG from '../../../utilities/stylesG';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackRoots } from '../../../navigation/AppNavigation';

const itemWidth = WIDTH_SCREEN / 3; //- spaceLeftRightList * 2;
const itemMargin = spaceLeftRightList;

const SocialNumber = ({
  title,
  value,
  onPress
}: {
  title: string;
  value: string;
  onPress: () => void;
}) => {
  return (
    <Pressable style={styles.itemSocialNumber} onPress={onPress}>
      <Text style={Fonts.poppinsMedium17}>{value}</Text>
      <Text style={styles.titleSocial}>{title}</Text>
    </Pressable>
  );
};

type Props = NativeStackScreenProps<AppStackRoots, 'AppTabNavigation'>;

const Profile = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({ title: '@alfredo_press' });
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '@alfredo_press',
      headerRight: () => (
        <View style={styles.headerRight}>
          <Pressable style={styles.btnHeaderRight} onPress={onPressBookmarks}>
            <Images.bookmark />
          </Pressable>
          <Pressable style={styles.btnHeaderRight} onPress={onPressSettings}>
            <Images.settings />
          </Pressable>
        </View>
      )
    });
  }, [navigation]);

  const onPressSettings = () => {
    navigation.navigate('Settings');
  };

  const onPressBookmarks = () => {
    navigation.navigate('MyBookmarks');
  };

  const onPressSocial = (type: string) => {
    switch (type) {
      case 'Followers':
        navigation.navigate('MyFollowers');
        break;
      case 'Following':
        navigation.navigate('MyFollowing');
        break;
      case 'Likes':
        break;
      default:
        break;
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <MotiView
        style={styles.listContainer}
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 1000 + index * 200 }}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.img }} style={styles.image} />
          <View style={styles.playContainer}>
            <Images.play height={10} width={10} />
            <Text style={styles.socialCount}>45.5k</Text>
          </View>
        </View>
      </MotiView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={Images.profile_dummy} style={styles.imgProfile} />
        <Text style={styles.name}>Alfredo Press</Text>
        <Text style={styles.desc}>
          Lorem ipsum dolor sit amet consectetur. Facilisis commodo.
        </Text>
        <View style={styles.containerSocialNumber}>
          <SocialNumber
            title={'Followers'}
            value={'34'}
            onPress={() => onPressSocial('Followers')}
          />
          <SocialNumber
            title={'Following'}
            value={'400'}
            onPress={() => onPressSocial('Following')}
          />
          <SocialNumber
            title={'Likes'}
            value={'12K'}
            onPress={() => onPressSocial('Likes')}
          />
        </View>
      </View>
      <FlatList
        data={bagsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
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

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsApp.white,
    paddingVertical: 21
  },
  topContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '70%'
  },
  imgProfile: {
    height: 75,
    width: 75
  },
  name: {
    marginTop: 6,
    ...Fonts.poppinsMedium15
  },
  desc: {
    ...Fonts.poppins12,
    color: ColorsApp.txtDescGrey,
    textAlign: 'center'
  },
  containerSocialNumber: {
    marginTop: 14,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemSocialNumber: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleSocial: {
    ...Fonts.poppins12,
    color: ColorsApp.txtDescGrey
  },

  flatListContent: {
    paddingHorizontal: itemMargin,
    paddingTop: 21,
    gap: itemMargin
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    gap: itemMargin
  },
  listContainer: {
    width: (WIDTH_SCREEN - itemMargin * 4) / 3
  },
  imageContainer: {
    borderRadius: 14,
    backgroundColor: ColorsApp.txtDescGrey
  },
  image: {
    width: '100%',
    height: 143,
    // aspectRatio: 1,
    borderRadius: 14
  },
  textContainer: {
    marginTop: 8
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15
  },
  playContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  socialCount: {
    ...Fonts.poppinsMedium10,
    color: ColorsApp.white
  },
  headerRight: {
    flexDirection: 'row'
  },
  btnHeaderRight: {
    padding: spaceLeftRightList
  }
});
