import React from 'react'

import getEnvVars from './env'
import { PermissionsAndroid, Platform } from 'react-native'
import Geolocation from '@react-native-community/geolocation'

export interface WeatherContextData {
    data: {
        temp: string
        city_name: string
        date: string
        condition_slug: string
        currently: string
        forecast: [
            {
                date: Date
                weekday: string
                max: number
                min: number
                description: string
                condition: string
            }
        ][]
    }
    loading: boolean
    grantedAccess: boolean
}

export const WeatherContext = React.createContext<WeatherContextData>(
    {} as WeatherContextData
)

export const WeatherProvider: React.FC = ({ children }) => {
    const { hgWeatherAPIKey } = getEnvVars()
    const [data, setData] = React.useState({} as WeatherContextData['data'])
    const [watchID, setWatchID] = React.useState(0)
    const [grantedAccess, setGrantedAccess] = React.useState(false)

    const [coords, setCoords] = React.useState<{
        latitude: string | null
        longitude: string | null
        isLoading: boolean
    }>({
        latitude: null,
        longitude: null,
        isLoading: true
    })

    function callLocation() {
        if (Platform.OS === 'ios') {
            getLocation()
        } else {
            const requestLocationPermission = async () => {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Permitir uso da Localização?',
                        message:
                            'Para usar o App é necessário conceder permissão para usar o serviço de localização do aparelho.',
                        buttonNegative: 'Não',
                        buttonNeutral: undefined,
                        buttonPositive: 'Sim'
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setGrantedAccess(true)
                    getLocation()
                } else {
                    setGrantedAccess(false)
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
                setCoords({
                    ...coords,
                    longitude: longitude,
                    latitude: latitude
                })
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
        // watchPosition keep observing for any position change, unless the user send an action to stop it
        const locationWatchID = Geolocation.watchPosition(position => {
            const latitude = JSON.stringify(position.coords.latitude)
            const longitude = JSON.stringify(position.coords.longitude)
            setCoords({
                ...coords,
                longitude: longitude,
                latitude: latitude
            })
        })
        setWatchID(locationWatchID)
    }

    function clearLocation() {
        Geolocation.clearWatch(watchID)
    }

    function fetchWeather() {
        try {
            fetch(
                `https://api.hgbrasil.com/weather?array_limit=5&fields=only_results,temp,city_name,currently,forecast,max,min,date,condition,condition_slug,temp,description,weekday&key=${hgWeatherAPIKey}&lat=${coords.latitude}&lon=${coords.longitude}`
            )
                .then(res => res.json())
                .then(res => {
                    setData(res)
                })
                .finally(() => setCoords({ ...coords, isLoading: false }))
        } catch {
            (err: any) => console.log(err)
        }
    }

    React.useEffect(() => {
        if (coords.latitude || coords.longitude) {
            fetchWeather()
        }
    }, [coords.latitude, coords.longitude])

    React.useEffect(() => {
        callLocation()
        return () => {
            clearLocation()
        }
    }, [])

    return (
        <WeatherContext.Provider
            value={{ data, loading: coords.isLoading, grantedAccess }}
        >
            {children}
        </WeatherContext.Provider>
    )
}
