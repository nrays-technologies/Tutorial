import React from "react";
import { View,Image,Text,StyleSheet , Dimensions} from "react-native";
import { IProduct } from "../products";


const WIDTH_Screen = Dimensions.get('screen').width

type ItemProp = {
    item: IProduct
}
const ItemProduct = ({ item }: ItemProp) => {
    return (
        <View style={styles.itemContainer} >
            <Image style={styles.itemImage} source={item.img} />
            <Text style={styles.itemName} >{item.name}</Text>
            <Text style={styles.itemPrice} >{item.Price}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: "#F3F6F8",
        borderRadius: 32,
        alignItems: "center",
        // height: 209,
        width: (WIDTH_Screen - 85 ) /2,
        aspectRatio:0.693,
        padding: 10,
        marginVertical: 10
    },
    itemImage: {
        height: 113,
        width: '100%',
        margin: 10
    },
    itemName: {
        fontSize: 16,
        fontFamily: 'DMSans-Regular',
        fontWeight: '700'
    },
    itemPrice: {
        fontFamily: 'DMSans-Regular',
        fontSize: 12,
        fontWeight: '400',
        marginTop: 4
    }
})
export default ItemProduct