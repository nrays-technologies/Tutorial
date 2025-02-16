import React from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { bagsList } from './Constants';
import StylesG from '../../../utilities/stylesG';
import ItemCategory from '../../components/itemCategory';
import { spaceLeftList } from '../../../constants/constants';
import { useNavigation } from '@react-navigation/native';

const CategoryList = () => {
    const navigation = useNavigation();

    const onPressItem = (item: any) => {
        navigation.navigate('Category', { title: item.category, id: item.id });
    };

    const renderItem = ({ item, index }) => {
        return (
            <ItemCategory
                item={item}
                index={index}
                onPress={onPressItem}
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
            contentContainerStyle={{ paddingLeft: spaceLeftList }}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderFooter}
            ItemSeparatorComponent={renderSeparator}
            keyboardShouldPersistTaps='handled'
            keyboardDismissMode='on-drag'
        />
    );
};

export default CategoryList;
