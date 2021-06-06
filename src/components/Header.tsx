import React from 'react'
import { StyleSheet, View } from 'react-native'
import { WeatherContext } from '../context'
import { Text } from './Text'

const Header: React.FC = () => {
    const { data } = React.useContext(WeatherContext)

    return (
        <View style={styles.header}>
            <Text style={styles.cityName}>{data.city_name}</Text>
            <Text style={styles.dateTime}>{data.date}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cityName: {
        fontFamily: 'Lato-Black',
        color: '#fff',
        fontSize: 16
    },
    dateTime: {
        fontFamily: 'Lato-Regular',
        color: '#fff',
        fontSize: 12
    }
})

export default Header
