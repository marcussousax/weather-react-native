import React from 'react'
import getEnvVars from './env'
import { RESPONSE } from './__mocks__/API'

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

    const { hgWeatherAPIKey } = getEnvVars()

    const [loading, setLoading] = React.useState(false)

    // React.useEffect(() => {
    //     fetch(
    //         `https://api.hgbrasil.com/weather?key=${hgWeatherAPIKey}&city_name=Campinas,SP`
    //     )
    //         .then(res => res.json())
    //         .then(res => {
    //             setData(res)
    //         })
    //         .finally(() => setLoading(false))
    // }, [hgWeatherAPIKey])

    return (
        <WeatherContext.Provider value={{ data, loading }}>
            {children}
        </WeatherContext.Provider>
    )
}
