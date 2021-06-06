/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react'
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    useColorScheme
} from 'react-native'

import { WeatherProvider } from './context'
import MainContent from './components/MainContent'
const App = () => {
    const isDarkMode = useColorScheme() === 'dark'

    return (
        <WeatherProvider>
            <SafeAreaView style={styles.view}>
                <StatusBar
                    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                />
                <MainContent />
            </SafeAreaView>
        </WeatherProvider>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1
    }
})

export default App
