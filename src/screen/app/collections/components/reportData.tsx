import { Pressable, StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectCollectionOption } from '../../../../redux/reducers/collectionsSlice'
import { spaceHorizontal } from '../../../../constants/constants'
import { Fonts } from '../../../../utilities/fonts'
import { ColorsApp } from '../../../../utilities/colors'
import StylesG from '../../../../utilities/stylesG'
import { currencyFormatter } from '../../../../utilities'
import { IReportData } from '../../../../modelTypeScript'

type PropsRow = {
    onPress: () => void
    title: string
    value: string
    desc?: string
    styleValue?: TextStyle
}

export const ReportDataRow = ({ title, value, desc = '', styleValue, onPress }: PropsRow) => {
    return <Pressable style={styles.row} onPress={onPress}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={[styles.rowValue, styleValue]}>{`${value}`}</Text>
        {desc.length > 0 && <Text style={[styles.rowDesc]}>{`(${desc})`}</Text>}
    </Pressable>
}

type Props = {
    onPressAmount: (item: IReportData) => void
}

const ReportData = ({ onPressAmount }: Props) => {
    const { report_data } = useSelector(selectCollectionOption)
    if (report_data) {
        return (
            <View style={styles.header}>
                <View style={styles.container}>
                    <View style={styles.containerRight}>
                        <ReportDataRow title='Principle Amount' value={currencyFormatter(report_data.principle_amount.total)}

                            onPress={() => onPressAmount(report_data.principle_amount)} />
                        <ReportDataRow title='Interest Amount' value={currencyFormatter(report_data.interest_amount.total)} onPress={() => onPressAmount(report_data.interest_amount)} />
                        <ReportDataRow title='Total Amount' value={currencyFormatter(report_data.total_amount.total)} onPress={() => onPressAmount(report_data.total_amount)} styleValue={{ color: ColorsApp.link }} />
                    </View>
                    <View style={styles.containerRight}>
                        <ReportDataRow title='Received Amount' value={currencyFormatter(report_data.received_amount.total)} onPress={() => onPressAmount(report_data.received_amount)} styleValue={{ color: ColorsApp.green }} />
                        <ReportDataRow title='Pending Amount' value={currencyFormatter(report_data.pending_amount.total)} onPress={() => onPressAmount(report_data.pending_amount)} styleValue={{ color: ColorsApp.yellow }} />
                        <ReportDataRow title='Overdue Amount' value={currencyFormatter(report_data.overdue_amount.total)} onPress={() => onPressAmount(report_data.overdue_amount)} styleValue={{ color: ColorsApp.red }} />
                    </View>
                </View>
            </View>
        )
    }

}

export default ReportData

const styles = StyleSheet.create({
    header: {
        padding: spaceHorizontal,
    },
    container: {
        // paddingHorizontal: spaceHorizontal,
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...StylesG.card,
        padding: 10
    },
    containerRight: {
        gap: 7
    },
    row: {
        alignItems: 'center'
    },
    rowTitle: {
        ...Fonts.poppinsMedium13,
        color: ColorsApp.grey6464
    },
    rowValue: {
        ...Fonts.poppinsMedium15,
    },
    rowDesc: {
        ...Fonts.poppins8
    }
})