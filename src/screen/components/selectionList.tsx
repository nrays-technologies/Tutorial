import { Alert, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import { Fonts } from '../../utilities/fonts';
import { ColorsApp } from '../../utilities/colors';


interface IData {
    key: string;
    value: string
}
interface Props {
    isMultiSelection: boolean
    value: string;
    placeholder: string;
    inputStyle?: ViewStyle;
    title?: string
    data: IData[]
    selectedValue: IData
    onSelectValue: (values: String[]) => void
}

const SelectionList = ({
    isMultiSelection = false,
    inputStyle = {},
    title,
    data,
    selectedValue,
    onSelectValue
}: Props) => {

    const [selected, setSelected] = React.useState([]);

    const onPressMultiSelectValue = (() => {
        console.log(selected);
        onSelectValue(selected)

    })
    const onPressSelectValue = (val => {
        console.log(val);
        onSelectValue(val)
    })
    return (
        <View>
            {title && <Text style={styles.title}>{title}</Text>}
            <View
                style={{
                    ...inputStyle,
                }}>
                {isMultiSelection ?
                    <MultipleSelectList
                    boxStyles={styles.boxStyle}
                    
                        search={false}
                        // setSelected={onPressMultiSelectValue}
                        data={data}
                        setSelected={(val) => setSelected(val)}
                        save="key"
                        onSelect={onPressMultiSelectValue}
                        labelStyles={{height: 0, backgroundColor: 'red'}}
                    
                    />
                    :
                    <SelectList
                    // defaultOption={}
                    boxStyles={styles.boxStyle}
                        search={false}
                        defaultOption={selectedValue}
                        setSelected={onPressSelectValue}
                        data={data}
                        save="key"
                    />}
            </View>
        </View>
    )
}

export default SelectionList

const styles = StyleSheet.create({
    title: {
        marginTop: 19,
        marginBottom: 8,
        ...Fonts.poppins13,
    },
    boxStyle: {
        borderColor: ColorsApp.grey99
    }
})