import React from 'react'
import getEnvVars from './env'
import getCurrentPosition from './utils/getCurrentPosition'

export interface WeatherContextData {
    data: {
        temp: string
        city_name: string
        date: string
        description: string
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

    const fetchWeather = React.useCallback(
        (latitude, longitude, granted) => {
            setGrantedAccess(granted)
            try {
                fetch(
                    `https://api.hgbrasil.com/weather?array_limit=5&fields=only_results,temp,city_name,currently,forecast,max,min,date,condition,condition_slug,temp,description,weekday&key=${hgWeatherAPIKey}&lat=${latitude}&lon=${longitude}`
                )
                    .then(res => res.json())
                    .then(res => {
                        setData(res)
                    })
                    .finally(() =>
                        setCoords({ latitude, longitude, isLoading: false })
                    )
            } catch (err) {
                console.log(err)
            }
        },
        [hgWeatherAPIKey]
    )

    React.useEffect(() => {
        getCurrentPosition()
            .then(res => {
                const { latitude, longitude, granted } = res
                fetchWeather(latitude, longitude, granted)
            })
            .catch(err => {
                console.log(err)
            })
    }, [fetchWeather])

    return (
        <WeatherContext.Provider
            value={{ data, grantedAccess, loading: coords.isLoading }}
        >
            {children}
        </WeatherContext.Provider>
    )
}
