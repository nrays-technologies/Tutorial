import React, { useState } from 'react';
import { View } from 'react-native';
import { ColorsApp } from '../../../utilities/colors';
import SearchBar from '../../components/searchBar';
import Segment from '../../../navigation/segment';
import Users from './users';
import Videos from './videos';
import CategoryList from './categoryList';
import Location from './loaction';


const Search = () => {

  const [index, setIndex] = useState(0)

  const onPressItem = (index: number) => {
    setIndex(index)
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ColorsApp.white,
      }}>
      <View style={{ paddingHorizontal: 18, paddingVertical: 9 }}>
        <SearchBar onSearchTyping={(searchText: string) => { }} />
      </View>

      <View style={{ height: 56 }}>
        <Segment onPressItem={onPressItem} />
      </View>
      {index == 1 &&
        <Users />
      }
      {index == 0 &&
        <Videos />
      }      
      {index == 2 &&
        <CategoryList />
      }
      {index == 3 &&
        <Location />
      }


    </View>
  );
};


export default Search;
