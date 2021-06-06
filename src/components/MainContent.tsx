import React from 'react'
import Header from './Header'
import Today from './Today'
import Footer from './Footer'
import { StyleSheet, View } from 'react-native'
import { WeatherContext } from '../context'

function getBackgroundColor(condition_slug: string) {
    const dayTime = ['clear_day', 'cloudly_day']
    const nightTime = ['clear_night', 'cloudly_night']
    if (nightTime.includes(condition_slug)) {
        return '#4F4F4F'
    }
    if (dayTime.includes(condition_slug)) {
        return '#60B4E2'
    }
    return '#ccc'
}

const MainContent = () => {
    const { data } = React.useContext(WeatherContext)

    const colorStyles = {
        backgroundColor: getBackgroundColor(data.condition_slug)
    }

    return (
        <View style={[colorStyles, styles.view]}>
            <Header />
            <Today />
            <Footer />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'space-between'
    }
})

export default MainContent
