import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useAppDispatch } from '../../../redux/store'
import { getLeads, getOptionsCrm, selectCrmOptions } from '../../../redux/reducers/crmSlice'
import { useSelector } from 'react-redux'
import { ColorsApp } from '../../../utilities/colors'
import { FlatList } from 'react-native-gesture-handler'
import ItemLead from './components/itemLead'
import ButtonFloating from './components/buttonFloating'
import { useIsFocused } from '@react-navigation/native'
import StylesG from '../../../utilities/stylesG'
import { Fonts } from '../../../utilities/fonts'
import { alertShow } from '../../../utilities/alerts'
import { TranslationKeys } from '../../../i18n/language'
import { useTranslation } from 'react-i18next'
import { Loader } from '../../components'
import SearchBar from '../../components/searchBar'
import Images from '../../../assets/images'
import LinearGradient from 'react-native-linear-gradient'
import { ILead } from '../../../modelTypeScript'
import { HEIGHT_SCREEN, WIDTH_SCREEN } from '../../../constants/constants'
import ModalFilterLeads, { IFilterOptions } from '../menu/modalFilterLeads'
import ActionSheet from 'react-native-actionsheet';
import { getDateFrom, getTodayDate } from '../../../utilities'
import moment from 'moment'

const HomeCRM = ({ navigation }: any) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const isFocused = useIsFocused()
  const { isLoading, leads } = useSelector(selectCrmOptions)
  const [loader, setLoader] = useState(true)
  const countFollowUp = useMemo(() => leads.reduce((previousValue, value) => { return previousValue + value.followups.length }, 0), [leads])
  const actionSheetRef = useRef<ActionSheet>(null);
  const [txtSearch, setSearch] = useState<string>('')
  const customerId = useRef<string>('')
  const leadId = useRef<string>('')
  const [filterOptions, setFilterOptions] = useState<IFilterOptions>({
    duration: '',
    sort_by: '',
    sort_order: 'asc',
    tags: '',
    lead_source: '',
  })

  useEffect(() => {
    if (isFocused === true) {
      customerId.current = ""
      leadId.current = ""
      dispatch(getLeads(''))
    }
  }, [isFocused])


  useEffect(() => {
    dispatch(getOptionsCrm())
    dispatch(getLeads(''))
    setTimeout(() => {
      setLoader(false)
    }, 2000);
  }, [])

  useEffect(() => {
    let qryString = ''
    if (txtSearch.length > 0) {
      qryString = `search=${txtSearch}`
    }
    if (filterOptions) {

      for (const key in filterOptions) {

        if (key == "duration") {
          continue;
        }
        let element = filterOptions[key];

        if (element.length > 0) {
          if (element == 'date') {
            element = 'created_at'
          }
          if (element == 'name') {
            element = 'first_name'
          }
          if (qryString.length > 0) {
            qryString = `${qryString}&${key}=${element}`
          }
          else {
            qryString = `${key}=${element}`
          }
        }
      }
    }

    if (filterOptions.duration && filterOptions.duration.length > 0) {
      let todayDate = getTodayDate("yyyy-MM-DD")
      let startDate = getTodayDate("yyyy-MM-DD")
      switch (filterOptions.duration) {
        
        case "this weak":
          startDate = moment().subtract(1, 'weeks').format("yyyy-MM-DD")
          break;
        case "last weak":
          todayDate = moment().subtract(1, 'weeks').format("yyyy-MM-DD")
          startDate = moment().subtract(2, 'weeks').format("yyyy-MM-DD")
          
          break;
        case "this month":
          startDate = moment().subtract(1, 'months').format("yyyy-MM-DD")
          break;
        case "last month":
          todayDate = moment().subtract(1,'months').endOf('month').format('YYYY-MM-DD')
          startDate = moment().subtract(2,'months').endOf('month').format('YYYY-MM-DD')
          break;

        default:
          break;
      }

      if (qryString.length > 0) {
        qryString = `${qryString}&start_date=${startDate}&end_date=${todayDate}`
      }
      else {
        qryString = `start_date=${startDate}&end_date=${todayDate}`
      }
    }

    dispatch(getLeads(qryString))
    setTimeout(() => {
      setLoader(false)
    }, 2000);
  }, [txtSearch, filterOptions, setFilterOptions])


  const onPressAdd = () => {
    navigation.navigate('NewLead')
  }

  const onPressItem = (item: ILead) => {
    navigation.navigate('LeadDetails', { id: item.id })
  }

  const onPressItemOptions = (item: ILead) => {
    if (item.followups.length > 0) {
      customerId.current = item.followups[0].customer_id.toString()
    }
    else {
      customerId.current = ''
    }

    if (item.remarks.length > 0) {
      leadId.current = item.id.toString()
    }
    else {
      leadId.current = ''
    }
    
    onPressShowActionSheet()
  }

  const onPressFollowupHeader = () => {
    if (countFollowUp === 0) {
      alertShow({ msg: `You don't have any follow-up of leads, create atleast one followup under any lead.`, buttonTitle: t(TranslationKeys.OK) })
      return
    }
    navigation.navigate('FollowupsList', {showDateList: true})
  }
  const onPressFilter = () => {
    setShowFilter(!showFilter)
  }

  const onPressApplyFilter = (options: IFilterOptions) => {
    setFilterOptions(options)
    setShowFilter(false)
  }

  const onPressShowActionSheet = async () => {
    console.log(' onPressEditImage ');
    actionSheetRef.current.show();
    
    return;
  };

  const onPressActionSheetResp = async (index: number) => {
    console.log('result', index);
    if (index == 0) {
      console.log('result', index);
      if (customerId.current.length > 0) {
        navigation.navigate('FollowupsList', {showDateList: false, leadId: leadId.current, customer_id: customerId.current  })
      }
      else {
        alertShow({msg: "You don't have follow-ups, you can create from the details."})
      }

    } else if (index == 1) {

      console.log("result");
      if (leadId.current.length > 0) {
        navigation.navigate('RemarkList', {showDateList: false, leadId: leadId.current  })
      }
      else {
        alertShow({msg: "You don't have remarks, you can create from the details."})
      }
    }
  };

  const onSearch = (searchText: string) => {
    console.log('====================================');
    console.log(searchText);
    console.log('====================================');
    setSearch(searchText)
  }


  const ListHeaderComponent = () => {
    return <View style={styles.header}>
      <View style={styles.containerSearchFilter}>
        <View style={{ flex: 1 }}>
          <SearchBar onSearchTyping={onSearch} />
        </View>
        <Pressable style={styles.btnFilter} onPress={onPressFilter}>
          <Images.filter height={20} width={25} fill={ColorsApp.theme30} />
        </Pressable>
      </View>
      <View style={styles.headerCardsContainer}>
        <Pressable style={styles.headerHalf}>
          <LinearGradient
            start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 1.0 }}
            // locations={[0,0.5,0.6]}
            colors={['#A1F3ED', '#E8D6FF']}
            style={styles.gradient}>
            <Text style={styles.titleHeader}>Leads</Text>
            <Text style={styles.valueHeader}>{leads.length}</Text>
          </LinearGradient>
        </Pressable>
        <Pressable style={styles.headerHalf} onPress={onPressFollowupHeader}>
          <LinearGradient
            start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 1.0 }}
            // locations={[0,0.5,0.6]}
            colors={['#CCECA7', '#6CBABE']}
            style={styles.gradient}>
            <Text style={styles.titleHeader}>Followups</Text>
            <Text style={styles.valueHeader}>{countFollowUp}</Text>
          </LinearGradient>
        </Pressable>
      </View>
      <Text style={styles.titleList}>Lead</Text>
    </View>
  }

  return (
    <View style={styles.container}>
      {ListHeaderComponent()}
      <FlatList
        // stickyHeaderIndices={[0]}
        // ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        data={leads}
        ListFooterComponent={() => <View style={{ height: 70 }} />}
        renderItem={({ item, index }) => {
          return <ItemLead item={item} onPress={onPressItem} onPressOptions={onPressItemOptions} />
        }}
        ListEmptyComponent={() => {
          return <View style={styles.containerEmpty}>
            <Images.empty height={HEIGHT_SCREEN / 3} width={WIDTH_SCREEN / 3} />
            <Text style={styles.txtNoData}>No Data Found</Text>
          </View>
        } }
        keyExtractor={(item, index) => item.id.toString()}
      />
      <ActionSheet
        ref={actionSheetRef}
        title={'Options'}
        options={['Follow-ups', 'Remarks', 'Cancel']}
        cancelButtonIndex={2}
        onPress={onPressActionSheetResp}
      />
      <ButtonFloating style={styles.btnFloating} onPress={onPressAdd} />
      <ModalFilterLeads showMenu={showFilter} onPressClose={onPressFilter} filterOptions={filterOptions} onPressApply={onPressApplyFilter} />
      <Loader animating={isLoading || loader} />
    </View>
  )
}

export default HomeCRM

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsApp.white
  },
  containerEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50
  },
  txtNoData: {
    ...Fonts.poppinsMedium20
  },
  header: {
    paddingTop: 5,
    paddingHorizontal: 10,
    gap: 10,
    width: '100%',

  },
  containerSearchFilter: {
    flexDirection: 'row',
    gap: 10
  },
  btnFilter: {
    height: 50,
    width: 50,
    borderRadius: 14,
    backgroundColor: ColorsApp.grey33,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerCardsContainer: {
    flexDirection: 'row',
    height: 90,
    gap: 10
  },
  headerHalf: {
    flex: 0.5,
    height: '100%',
    borderRadius: 10,
    ...StylesG.shadow,
    backgroundColor: ColorsApp.cardBG,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gradient: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleHeader: {
    ...Fonts.poppinsMedium17
  },
  valueHeader: {
    ...Fonts.poppinsSemiBold24
  },
  titleList: {
    ...Fonts.poppinsMedium15
  },
  contentContainerStyle: {
    gap: 10,
    padding: 10
  },
  btnFloating: {
    position: 'absolute',
    bottom: 20,
    right: 15
  }
})

