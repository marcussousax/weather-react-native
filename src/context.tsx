import React from 'react'

import getEnvVars from './env'
import { RESPONSE } from './__mocks__/API'
import { PermissionsAndroid, Platform, ToastAndroid } from 'react-native'
import Geolocation from '@react-native-community/geolocation'

interface WeatherContextData {
    data: {
        city_name: string
        date: string
        condition_slug: string
    }
    loading: boolean
}

export const WeatherContext = React.createContext<WeatherContextData>(
    {} as WeatherContextData
)

export const WeatherProvider: React.FC = ({ children }) => {
    const [data, setData] = React.useState(RESPONSE.results)
    const [currentLatitude, setCurrentLatitude] = React.useState('')
    const [currentLongitude, setCurrentLongitude] = React.useState('')
    const [watchID, setWatchID] = React.useState(0)
    const [grantedAccess, setGrantedAccess] = React.useState(false)

    const { hgWeatherAPIKey } = getEnvVars()

    const [loading, setLoading] = React.useState(false)

    function callLocation() {
        if (Platform.OS === 'ios') {
            getLocation()
        } else {
            const requestLocationPermission = async () => {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Permissão de Localização',
                        message:
                            'Para usar o App é necessário conceder permissão para usar a localização do aparelho',
                        buttonNegative: 'Não.',
                        buttonNeutral: 'pergunte-me depois',
                        buttonPositive: 'Ok!'
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setGrantedAccess(true)
                    getLocation()
                } else {
                    setGrantedAccess(false)
                    ToastAndroid.showWithGravity(
                        'Pemissão negada pelo usuário',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    )
                }
            }
            requestLocationPermission()
        }
    }

    function getLocation() {
        Geolocation.getCurrentPosition(
            position => {
                const latitude = JSON.stringify(position.coords.latitude)
                const longitude = JSON.stringify(position.coords.longitude)
                setCurrentLatitude(latitude)
                setCurrentLongitude(longitude)
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
        // watchPosition keep observing for any position change, unless the user send an action to stop it
        const locationWatchID = Geolocation.watchPosition(position => {
            const latitude = JSON.stringify(position.coords.latitude)
            const longitude = JSON.stringify(position.coords.longitude)
            setCurrentLatitude(latitude)
            setCurrentLongitude(longitude)
        })
        setWatchID(locationWatchID)
    }

    function clearLocation() {
        Geolocation.clearWatch(watchID)
    }

    React.useEffect(() => {
        callLocation()
        return () => {
            clearLocation()
        }
    }, [])

    React.useEffect(() => {
        if (grantedAccess) {
            fetch(
                `https://api.hgbrasil.com/weather?key=${hgWeatherAPIKey}&lat=${currentLatitude}&lon=${currentLongitude}&user_ip=remote`
            )
                .then(res => res.json())
                .then(res => {
                    setData(res.results)
                })
                .finally(() => setLoading(false))
        }
        return ToastAndroid.showWithGravity(
            'Você precisa dar permissão de localização',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        )
    }, [currentLatitude, currentLongitude])

    return (
        <WeatherContext.Provider value={{ data, loading }}>
            {children}
        </WeatherContext.Provider>
    )
}
