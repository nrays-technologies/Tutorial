import { FlatList, Linking, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';


import { HEIGHT_SCREEN, spaceLeftRight } from '../../../constants/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TranslationKeys } from '../../../i18n/language';
import { useTranslation } from 'react-i18next';
import { CardView, RPCarousel, SegmentedControl } from '../../components';
import Images, { Icons } from '../../../assets/images';
import { MotiView } from 'moti';
import { Fonts } from '../../../utilities/fonts';
import { ColorsApp } from '../../../utilities/colors';
import { useAppDispatch } from '../../../redux/store';
import { getHome, selectAppOptions } from '../../../redux/reducers/appOptionsSlice';
import { useSelector } from 'react-redux';
import ItemHomeCollection from '../../components/itemHomeCollection';

const ItemHome = ({ index, icon, title, value, backgroundColor }) => {
  return (
    <MotiView
      style={[styles.containerItem, { backgroundColor }]}
      from={{
        opacity: 0,
        scale: 0.9
      }}
      animate={{
        opacity: 1,
        scale: 1
      }}
      transition={{ delay: 1000 + index * 200 }}>
      {/* {icon} */}
      <Text adjustsFontSizeToFit style={{ ...Fonts.poppins12 }}>{title}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        {icon}
        <Text style={{ ...Fonts.poppinsSemiBold18, marginLeft: 10 }}>{value}</Text>
      </View>
    </MotiView>
  );
};
const Home = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const { isLoading, notificationsCount, todayCollections, overdueCollections, overdueCollectionsCount, recentCollectionsCount, upcomingPaymentsCount, agentSummary } = useSelector(selectAppOptions)

  useEffect(() => {
    dispatch(getHome())
  }, [])


  const onPressSliderItem = () => {

  }
  const onPressDiaMobile = (number: string) => {

    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: 20 }} />
        {/* <RPCarousel
          paddingCarousel={0}
          style={styles.headerCarasoal}
          data={[Images.slider1, Images.slider2, Images.slider3]}
          onPressItem={onPressSliderItem}
        // onPressItem={(value) => tapOnItem(value, navigation)}
        /> */}
        <View style={{ paddingHorizontal: spaceLeftRight }}>
          <Text style={styles.txtSectionTitle}>Today Collection</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={todayCollections}
            renderItem={({ item, index }) => {
              return <ItemHomeCollection item={item} />
            }}
            keyExtractor={(item, index) => item.contact + index.toString()}
          />
        </View>

        {overdueCollections.length > 0 && <View style={styles.containerOverDue}>
          <Text style={styles.txtSectionTitle}>Over Due Collection</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={overdueCollections}
            renderItem={({ item, index }) => {
              return <ItemHomeCollection item={item} />
            }}
            keyExtractor={(item, index) => item.contact + index.toString()}
          />
        </View>}
        <Text style={{ ...styles.txtSectionTitle, paddingLeft: spaceLeftRight, marginTop: 15 }}>Collection</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spaceLeftRight }}>
          <ItemHome
            backgroundColor={'#f6f2ee'}
            index={1}
            icon={
              <Icons.MaterialCommunityIcons name='file-delimited-outline'
                size={30}
                color={ColorsApp.theme} />}
            title='Recent Collection'
            value={recentCollectionsCount} />
          <ItemHome
            backgroundColor={'#154c7920'}
            index={1}
            icon={<Icons.MaterialCommunityIcons name='file-delimited-outline'
              size={30}
              color={ColorsApp.theme} />}
            title='Over Due Collection'
            value={overdueCollectionsCount} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spaceLeftRight, marginTop: 12 }}>
          <ItemHome
            backgroundColor={'#c8eded70'}
            index={1}
            icon={
              <Icons.MaterialCommunityIcons name='file-delimited-outline'
                size={30}
                color={ColorsApp.theme} />}
            title='Upcoming '
            value={upcomingPaymentsCount} />
          <ItemHome
            backgroundColor={'#fce7b6'}
            index={1}
            icon={<Icons.MaterialCommunityIcons name='file-delimited-outline'
              size={30}
              color={ColorsApp.theme} />}
            title='Notification'
            value={notificationsCount} />
        </View>

        <View style={{ paddingHorizontal: spaceLeftRight, marginTop: 12, paddingBottom: 20 }}>
          <Text style={{ ...styles.txtSectionTitle, marginTop: 15 }}>Achievements</Text>
          <CardView style={{ width: '100%' }} styleCard={{ padding: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={styles.titleSummery}>Today Collections</Text>
                <Text style={styles.valueSummery}>{agentSummary?.totalCollectionsToday}</Text>
              </View>
              <View>
                <Text style={styles.titleSummery}>Outstandings</Text>
                <Text style={styles.valueSummery}>{agentSummary?.totalOutstanding}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <View>
                <Text style={styles.titleSummery}>Weekly Collections</Text>
                <Text style={styles.valueSummery}>{agentSummary?.totalCollectionsThisWeek}</Text>
              </View>
              <View>

                <Text style={styles.titleSummery}>Performance</Text>
                <Text style={styles.valueSummery}>{agentSummary?.collectionRate}</Text>
              </View>
            </View>


          </CardView>
        </View>

        {/* <View style={{ flex: 1, paddingHorizontal: spaceLeftRight, marginVertical: 20 }}>
        <ItemHome backgroundColor={'#f6f2ee'} index={1} icon={<Icons.MaterialCommunityIcons name='file-delimited-outline' size={40} color={ColorsApp.theme} />} title='Income Tax Return(ITR)' />
        <ItemHome backgroundColor={'#fce7b6'} index={1} icon={<Icons.MaterialCommunityIcons name='registered-trademark' size={40} color={ColorsApp.theme} />} title='Tradmark' />
        <ItemHome backgroundColor={'#c8eded70'} index={1} icon={<Icons.MaterialCommunityIcons name='file-table-box-multiple-outline' size={40} color={ColorsApp.theme} />} title='Goods and Service Tax(GST)' />
          <ItemHome backgroundColor={'#154c7920'} index={1} icon={<Icons.MaterialCommunityIcons name='file-compare' size={40} color={ColorsApp.theme} />} title='Data Management' />
          
        </View> */}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  containerOverDue: {
    paddingHorizontal: spaceLeftRight,
    marginTop: 20
  },
  txtSectionTitle: {
    ...Fonts.poppinsSemiBold15,
    marginBottom: 10
  },
  viewHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 50,
  },
  headerCarasoal: { marginTop: 15, padding: 0, borderRadius: 20, },
  containerItem: {
    justifyContent: 'center',
    // alignItems: 'center',
    width: '48%',
    height: 90,
    padding: 8,
    borderRadius: 5
  },
  titleSummery: {
    ...Fonts.poppinsMedium15
  },
  valueSummery: {
    ...Fonts.poppins15
  }
});
