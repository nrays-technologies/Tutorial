import { Pressable, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import { Fonts } from '../../../../utilities/fonts';
import StylesG from '../../../../utilities/stylesG';
import ItemFollowupRow from './itemFollowupRow';
import { getStringFrom } from '../../../../utilities';
import { Icon, Icons } from '../../../../assets/images';
import { IFollowup } from '../../../../modelTypeScript';
import { ColorsApp } from '../../../../utilities/colors';

type Props = {
  showEdit?: boolean
  index: number;
  item: IFollowup;
  onPressEdit: (remark: IFollowup) => void
}

const ItemFollowup = ({showEdit= true, index, item, onPressEdit }: Props) => {

  return (
    <View key={item.id.toString() + index.toString()} style={styles.containerFollowup}>
      <View style={styles.containerFollowupContent}>
        <View style={styles.rowStatusTags}>
          {item.followup_priorities && item.followup_priorities.length > 0 && <View style={[styles.priority, { backgroundColor: item.followup_priorities[0].color }]}><Text style={styles.txtPriority}>{item.followup_priorities[0].name}</Text></View>}
          {item.followup_modes.length > 0 && <ItemFollowupRow title='Mode' value={item.followup_modes[0].name} />}
          {item.followup_statuses && item.followup_statuses.length > 0 && <ItemFollowupRow title='Status' value={item.followup_statuses[0].name} />}

          {item.followup_results && item.followup_results.length > 0 && <ItemFollowupRow title='Result' value={item.followup_results[0].name} />}
        </View>
        {item.notes && item.notes.length > 0 && <View>
          {/* <Text style={Fonts.poppinsSemiBold13}>Notes</Text> */}
          <Text style={styles.txtRemark}>{item.notes}</Text>
        </View>}
        <View style={styles.containerDateTime}>
          <View style={styles.rowDateTime}>
            <Icon type={Icons.MaterialIcons} name='calendar-month' size={15} />
            <Text style={styles.txtDateTime}>{getStringFrom({ date: item.followup_datetime, format: "ddd DD MMM, yy" })}</Text>
          </View>
          <View style={styles.rowDateTime}>
            <Icon type={Icons.MaterialIcons} name='access-time-filled' size={15} />
            <Text style={styles.txtDateTime}>{getStringFrom({ date: item.followup_datetime, format: "hh:mm a" })}</Text>
          </View>
        </View>
        {index == 0 && showEdit == true && <TouchableHighlight underlayColor={ColorsApp.theme30} style={styles.btnEditTouchable} onPress={() => onPressEdit(item)}>
        <>
          <Icon type={Icons.MaterialIcons} name='edit' size={22} />
          {/* <Text style={styles.btnTitleEditTouchable}>Edit</Text> */}
        </>
      </TouchableHighlight>}
      </View>
      
    </View>
  )
}

export default ItemFollowup

const styles = StyleSheet.create({
  containerFollowup: {
    ...StylesG.shadow,
    borderRadius: 10,

  },
  rowStatusTags: {
    flexDirection: 'row',
    gap: 22
  },
  priority: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: ColorsApp.grey33,
    borderRadius: 8
  },
  txtPriority: {
    ...Fonts.poppins8
  },
  containerFollowupContent: {
    gap: 5,
    padding: 10,
  },
  rowRemark: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20
  },
  txtRemark: {
    flex: 1,
    ...Fonts.poppins15,
    paddingBottom: 5,
    paddingLeft: 5,
    color: ColorsApp.black60,
  },
  containerDateTime: {
    flexDirection: 'row',
    gap: 30
  },
  rowDateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  btnEdit: {},
  btnEditTouchable: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    width: 40,//'100%',
    height: 40,
    // backgroundColor: '#d8ebd5',//ColorsApp.cardBG,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // gap: 6,
    // borderBottomEndRadius: 10,
    // borderBottomStartRadius: 10
  },
  btnTitleEditTouchable: {
    ...Fonts.poppinsMedium15
  },
  txtDateTime: {
    ...Fonts.poppins8,
    color: ColorsApp.black60
  }
})