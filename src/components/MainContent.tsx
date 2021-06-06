import React from 'react'
import Header from './Header'
import Today from './Today'
import Footer from './Footer'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { WeatherContext } from '../context'
import { Text } from './Text'

function getBackgroundColor(currently: string) {
    if (currently === 'noite') {
        return '#4F4F4F'
    }
    return '#60B4E2'
}

const MainContent = () => {
    const { data, loading, grantedAccess } = React.useContext(WeatherContext)

    const colorStyles = {
        backgroundColor: getBackgroundColor(data.currently)
    }

    if (!grantedAccess) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                        textTransform: 'uppercase',
                        marginBottom: 16
                    }}
                >
                    Permissão negada
                </Text>
            </View>
        )
    }

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        fontSize: 16,
                        textTransform: 'uppercase',
                        marginBottom: 16
                    }}
                >
                    Buscando localização
                </Text>
                <ActivityIndicator size="large" color="#666" />
            </View>
        )
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
