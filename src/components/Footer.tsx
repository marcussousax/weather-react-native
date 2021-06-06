import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { WeatherContext } from '../context'
import WeatherIcon from './WeatherIcon'

import { Text } from './Text'

const Footer = () => {
    const { data } = React.useContext(WeatherContext)
    const renderItem = ({ item }) => {
        return (
            <View style={styles.nextDays}>
                <Text style={styles.weekDay}>{item.weekday}</Text>
                <Text style={styles.date}>{item.date}</Text>
                <WeatherIcon
                    condition={item.condition}
                    style={styles.icon}
                    width={60}
                    height={60}
                />
                <Text style={styles.temp}>mín.{item.min}&#176;</Text>
                <Text style={styles.temp}>máx.{item.max}&#176;</Text>
            </View>
        )
    }
    return (
        <View style={styles.footer}>
            <FlatList
                scrollEnabled={true}
                data={data.forecast.slice(1, 5)}
                numColumns={2}
                contentContainerStyle={styles.flatList}
                keyExtractor={item => item.date}
                renderItem={renderItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        justifyContent: 'flex-start',
        flexShrink: 0,
        flexBasis: '40%',
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },
    flatList: {
        flex: 1,
        justifyContent: 'center'
    },
    nextDays: {
        alignItems: 'center',
        flexGrow: 1,
        margin: 4,
        marginVertical: 30,
        marginHorizontal: 30,
        flexBasis: 0,
        borderRadius: 5
    },
    weekDay: {
        color: 'rgba(255, 255, 255, .8)',
        fontSize: 12,
        textTransform: 'lowercase',
        fontFamily: 'Lato-Bold'
    },
    date: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Lato-Bold'
    },
    icon: {
        marginVertical: 5
    },
    temp: {
        color: '#fff',
        fontSize: 13,
        fontFamily: 'Lato-Bold'
    }
})

export default Footer
