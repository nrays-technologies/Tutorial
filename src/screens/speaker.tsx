import React, { useState } from "react";
import { Image, StyleSheet, View, Text, FlatList, Dimensions, TouchableOpacity, Modal, Pressable } from "react-native";
import Images from "../assets/images";

interface IProduct {
    name: string;
    rank: number;
    Price: string;
    img: any;
}

const data: IProduct[] = [{ "name": "beoPlay", "rank": 4.5, "Price": "$1600", "img": Images.beoPlay },
{ "name": "headPhone1", "rank": 4.5, "Price": "$500", "img": Images.headphone1 },
{ "name": "beoLit", "rank": 4.0, "Price": "$1200", "img": Images.beoLit },
{ "name": "beoSound", "rank": 3.5, "Price": "$1100", "img": Images.beoSound },
{ "name": "beoPlay1", "rank": 4.5, "Price": "$1500", "img": Images.beoplay1 },
{ "name": "headPhone", "rank": 5.0, "Price": "$900", "img": Images.headPhone },
]

type ProductList = {
    img: IProduct;
};

const ProductList = ({ img }: ProductList) => (
    <View style={styles.containerItem}>
        <View style={styles.containerItemImg}>
            <Image source={img.img} style={styles.imageStyle} />
        </View>
        <View style={styles.containerItemRow}>
            <Text style={styles.imgName}>{img.name}</Text>
            <Text style={styles.imgRank}>{img.rank}</Text>
            <Text style={styles.imgPrice}>{img.Price}</Text>
        </View></View>
);

const arrColors = ['red', 'green', 'yellow', 'pink']

const Speaker = () => {
    const [selected, setSelected] = useState("")
    const menuItems = ["View all", "Portable", "Multiroom", "Architecture", "Design"]
    const [colorSelected, setColorSelected] = useState(arrColors[0])

    const [modal, setModal] = useState(false)
    const onPressModal = () => {
        console.log("onPressModal");
        setModal(true)
    }
    const closeModal = () => {
        setModal(false);
    };

    const renderItem = ({ item }: any) => (
        <TouchableOpacity onPress={() => setSelected(item)} style={styles.menuItem}>
            <Text style={[styles.menuText, selected === item && styles.selectedText]}>{item}</Text>
            {selected === item && <View style={styles.underline} />}
        </TouchableOpacity>
    );
    const renderProduct = ({ item }: any) => <ProductList img={item} />;


    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Image style={styles.logoArrow} source={Images.arrow}></Image>
                <Text style={styles.txtTop}>SPEAKERS</Text>
                <TouchableOpacity onPress={onPressModal}>
                    <Image style={styles.logoCombined} source={Images.Combined}>
                    </Image></TouchableOpacity>
                <Modal
                    animationType="slide"
                    visible={modal}
                    transparent>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTxtTop} >Gender</Text>
                            <View style={styles.genderOptions}>
                                <Image style={styles.img1} source={Images.men}></Image>
                                <Image style={styles.img2} source={Images.women}></Image>
                                <Image style={styles.img3} source={Images.both}></Image>
                            </View>
                            <View style={styles.lineHorizontal1} />
                            <Text style={styles.modalTxtMiddle}>Price Rate</Text>
                            <View style={styles.imgPriceContainer}>
                                <Image style={styles.imgBar} source={Images.bar}></Image>
                            </View>
                            <View style={styles.lineHorizontal} />
                            <View style={styles.sizeContainer}>
                                <Image style={styles.imgsize} source={Images.min}></Image>
                                <Image style={styles.imgsize} source={Images.max}></Image>
                            </View>
                            <View style={styles.lineHorizontal1} />
                            <Pressable onPress={closeModal}>
                                <Text>X</Text>
                            </Pressable>

                            <FlatList 
                            horizontal
                            contentContainerStyle={{gap: 10}}
                            data={arrColors}
                            renderItem={({item, index}) => {
                            return <Pressable 
                            onPress={() => setColorSelected(item)} 
                            style={{height: 40, aspectRatio: 1, borderRadius: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:item}}>
                                    {colorSelected === item && <Text>✔️</Text>}
                                </Pressable>
                            }
                            }/>
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={styles.middle}>
                <View style={styles.base}></View>
                <Image style={styles.imgBeo} source={Images.beo}></Image>
                <Text style={styles.txtMid1}>Beosound Balance</Text>
                <Text style={styles.txtMid2}>innovative, wireless home speaker</Text>
                <Image style={styles.imgIndicator} source={Images.indicator}></Image>
            </View>
            <View style={styles.menuFlatlist}>
                <FlatList
                    data={menuItems}
                    horizontal
                    keyExtractor={(item) => item}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View style={styles.lineHorizontal1} />
            <View style={styles.productFlatlist}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={renderProduct}
                    ListEmptyComponent={() => (
                        <View >
                            <Text >No Product Available</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    top: {
        borderWidth: 1,
        borderColor: 'green',
        flexDirection: 'row',
        height: 44,
        marginHorizontal: 35,
        marginTop: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtTop: {
        flex: 1,
        marginHorizontal: 100,
        height: 20,
        fontSize: 12,
        fontWeight: '700',
        fontFamily: 'DM Sans'
    },
    logoArrow: {
        height: 24,
        width: 24
    },
    logoCombined: {
        height: 19,
        width: 19,
        marginRight: 16
    },
    middle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'green',
        width: "100%",
        height: 237,
    },
    base: {
        height: 150,
        backgroundColor: '#f3f6f8',
        borderRadius: 32,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginHorizontal: 20
    },
    imgBeo: {
        height: "60%",
        width: "50%",
        marginHorizontal: 20,
    },

    txtMid1: {
        height: 32,
        fontSize: 24,
        fontWeight: '700',
        fontFamily: 'DM Sans',
        marginBottom: 4,
        marginHorizontal: 39
    },
    txtMid2: {
        height: 20,
        fontWeight: '400',
        fontFamily: 'DM Sans'
    },
    imgIndicator: {
        height: 5,
        width: 48,
        marginTop: 24,
    },
    menuFlatlist: {
        marginTop: 32,
        marginHorizontal: 20,
        height: 30
    },
    menuItem: {
        alignItems: "center",
        marginHorizontal: 15,
    },
    menuText: {
        fontSize: 14,
        color: '#171717',
        fontFamily: "DM Sans"
    },
    selectedText: {
        fontWeight: "bold",
        color: "#000",
    },
    underline: {
        marginTop: 5,
        height: 2,
        backgroundColor: "#000",
        width: "80%",
    },
    lineHorizontal1: {
        height: 1,
        marginTop: 24,
        backgroundColor: '#F3F6F8'
    },
    columnWrapperStyle: {
        gap: 15
    },
    itemList: {
        paddingHorizontal: 35,
        gap: 24,
        flex: 1
    },
    imageStyle: {
        height: 88,
        width: 88
    },
    imgName: {
        fontWeight: '700',
        fontSize: 16,
        fontFamily: 'DM Sans'
    },
    imgRank: {
        fontWeight: '700',
        fontSize: 12,
        fontFamily: 'DM Sans'
    },
    imgPrice: {
        fontWeight: '400',
        fontSize: 12
    },
    containerItem: {
        height: 112,
        borderRadius: 24,
        backgroundColor: '#F3F6F8',
        flexDirection: 'row',
        gap: 10,
        margin: 16
    },
    containerItemImg: {
        margin: 12
    },
    containerItemRow: {
        marginVertical: 20
    },
    productFlatlist: {
        flex: 1,
        borderColor: 'red',
        borderWidth: 5
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        paddingTop: 20,
        height: 605,
    },
    modalTxtTop: {
        paddingHorizontal: 35,
        marginTop: 50,
        fontWeight: '700',
        fontSize: 16,
        fontFamily: 'DM Sans'
    },
    genderOptions: {
        flexDirection: 'row',
        paddingHorizontal: 35,
        marginTop: 16,
        gap: 10
    },
    img1: {
        height: 44,
        width: 95
    },
    img2: {
        height: 44,
        width: 95
    },
    img3: {
        height: 44,
        width: 95
    },
    modalTxtMiddle: {
        paddingHorizontal: 35,
        fontWeight: '700',
        marginTop: 24,
        fontSize: 16,
        fontFamily: 'DM Sans'
    },
    imgPriceContainer: {
        paddingHorizontal: 35,
        marginTop: 16
    },
    imgBar: {
        height: 45,
        width: 305
    },
    lineHorizontal: {
        width: 123,
        height: 2,
        backgroundColor: '#C6AB59',
        marginLeft: 108
    },
    sizeContainer: {
        paddingHorizontal: 35,
        marginTop: 19,
        flexDirection: 'row',
        gap: 15
    },
    imgsize: {
        height: 44,
        width: 145
    }
});

export default Speaker
