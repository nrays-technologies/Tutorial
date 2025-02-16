import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ILead } from '../../../../modelTypeScript'
import StylesG from '../../../../utilities/stylesG'
import { getAddress, getFirstCharOfWord, getTagColor } from '../../../../utilities'
import { Fonts } from '../../../../utilities/fonts'
import { ColorsApp } from '../../../../utilities/colors'
import { Icon, Icons } from '../../../../assets/images'

interface IItemRow {
  title: string,
  value: string
}

type Props = {
  item: ILead
  onPress?: (item: ILead) => void
  onPressOptions?: (item: ILead) => void
}

// const ItemRow = ({ title, value }: IItemRow) => {
//   return <View style={styles.rowItem}>
//     <Text style={styles.title}>{title}</Text>
//     <Text style={styles.value}>{value}</Text>
//   </View>
// }

// const ItemRowIcon = ({ title, value }: IItemRow) => {
//   return <View style={styles.rowItemIcon}>
//     <Icon type={Icons.FontAwesome5} name={title} size={25} />
//     <Text style={styles.value}>{value}</Text>
//   </View>
// }
const ItemLead = ({ item, onPress, onPressOptions }: Props) => {

  return (
    <Pressable style={styles.container} onPress={() => onPress(item)}>
      <View style={styles.containerContent}>
        <View style={styles.imgContainer}>
          <Text style={styles.imgLetter}>{getFirstCharOfWord(item.first_name)}</Text>
        </View>
        <View style={styles.containerInfo}>
          <Text style={styles.name}>{`${item.first_name} ${item.last_name}`}</Text>
          <Text style={styles.phone}>{item.mobile}</Text>
        </View>
      </View>
      <View style={styles.containerRight}>
        <Pressable hitSlop={5} onPress={() => onPressOptions(item)}>
        <Icon type={Icons.Ionicons} name='ellipsis-horizontal' size={25} />
        </Pressable>
        {item.lead_sources && item.lead_sources.length > 0 && <Text style={styles.txtSource}>{item.lead_sources[0].name}</Text>}
      </View>

      {/* <View style={styles.rowTop}>
        <View style={styles.containerNameContact}>
        <ItemRowIcon title='user-tie' value={`${item.first_name} ${item.last_name}`} />
        <ItemRowIcon title='phone-alt' value={item.mobile} />
        {item.address_1 && item.address_1.length > 0 && <ItemRowIcon title='map-signs' value={getAddress(item)} />}

        </View>
        {item.lead_sources && item.lead_sources.length > 0 &&
          <View style={[styles.containerPriorty, {backgroundColor: item.lead_sources[0].color_code}]}>
            <Text style={styles.titlePriority}>{item.lead_sources[0].name}</Text>
          </View>}
      </View>


      {item.lead_statuses.length > 0 &&<View style={styles.containerTags}>
        {item.lead_statuses.map(item => <View style={[styles.tag, { backgroundColor: item.color_code }]} >
          <Text style={styles.txtStatus}>{item.name}</Text>
          </View>)}
      </View>} */}
    </Pressable>
  )
}

export default ItemLead

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 5,
    borderRadius: 10,
    ...StylesG.shadow,
  },
  containerContent: {
    flex: 1,
    flexDirection: 'row',
    gap: 8
  },
  imgContainer: {
    height: 35,
    aspectRatio: 1,
    borderRadius: 5,
    backgroundColor: ColorsApp.grey33,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgLetter: {
    ...Fonts.poppinsSemiBold18,
    color: ColorsApp.grey6464
  },
  containerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    ...Fonts.poppinsMedium15
  },
  phone: {
    ...Fonts.poppins12,
    color: ColorsApp.black60
  },
  containerRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  txtSource: {
    ...Fonts.poppinsSemiBold10
  },

  rowTop: {
    flexDirection: 'row',
  },
  containerNameContact: {
    flex: 1,
    gap: 8,
  },
  containerPriorty: {
    height: 25,
    paddingHorizontal: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderEndStartRadius: 10,
    borderTopLeftRadius: 10

  },
  titlePriority: {
    ...Fonts.poppins13,
    color: ColorsApp.white
  },
  rowItemIcon: {
    flexDirection: 'row',
    flex: 1,
    gap: 7
  },
  rowItem: {
    flexDirection: 'row',
    flex: 1,
  },
  title: {
    ...Fonts.poppinsMedium13
  },
  value: {
    ...Fonts.poppins15,
    flex: 1,
    textTransform: 'capitalize'
  },
  containerTags: {
    marginTop: 5,
    flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'row',
    gap: 5
  },
  tag: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 15
  },
  txtStatus: {
    ...Fonts.poppins12,
    color: ColorsApp.white
  }
})