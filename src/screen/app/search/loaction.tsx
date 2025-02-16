import React from 'react';
import { View, FlatList } from 'react-native';
import { bagsList } from './Constants';
import StylesG from '../../../utilities/stylesG';
import ItemLocation from '../../components/itemLocation';
import { spaceLeftList } from '../../../constants/constants';
import { useNavigation } from '@react-navigation/native';

const Location = () => {
    const navigation = useNavigation();

    const onPressItem = (item: any) => {
        navigation.navigate('Category', { title: item.address, id: item.id });
    };

    const renderItem = ({ item, index }) => {
        return <ItemLocation item={item} index={index} onPress={onPressItem} />;
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
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderFooter}
            ItemSeparatorComponent={renderSeparator}
            keyboardShouldPersistTaps='handled'
            keyboardDismissMode='on-drag'
            />
    );
};

export default Location;
