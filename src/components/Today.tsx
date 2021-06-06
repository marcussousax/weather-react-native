import React from 'react'
import { StyleSheet, View } from 'react-native'
import { WeatherContext } from '../context'
import WeatherIcon from './WeatherIcon'
import { Text } from './Text'

const Today = () => {
    const { data } = React.useContext(WeatherContext)
    return (
        <View style={styles.today}>
            <Text style={styles.description}>{data.description}</Text>
            <WeatherIcon
                condition={data.condition_slug}
                width={190}
                height={190}
            />
            <Text style={styles.temp}>{data.temp}&#176;</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    today: {
        alignItems: 'center'
    },
    header: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    description: {
        fontFamily: 'Lato-Black',
        color: '#fff',
        fontSize: 30,
        textTransform: 'uppercase'
    },
    condition_slug: {
        fontFamily: 'Lato-Regular',
        color: '#fff',
        fontSize: 12
    },
    temp: {
        fontFamily: 'Lato-Light',
        color: '#fff',
        fontSize: 80
    }
})

export default Today
