import React from 'react'
import { StyleProp, TextStyle } from 'react-native'
import IcnClear from '../assets/images/icn-clear.svg'
import IconFog from '../assets/images/icn-fog.svg'
import IconMostlyCloudy from '../assets/images/icn-mostlycloudy.svg'
import IconNtClear from '../assets/images/icn-nt_clear.svg'
import IconNtCloudy from '../assets/images/icn-nt_cloudy.svg'
import IconNtMostlyCloudy from '../assets/images/icn-nt_mostlycloudy.svg'
import IconRain from '../assets/images/icn-rain.svg'
import IconSnow from '../assets/images/icn-snow.svg'
import IconTStorms from '../assets/images/icn-tstorms.svg'

const WeatherIcon = ({
    condition,
    style,
    width,
    height
}: {
    condition: string
    style?: StyleProp<TextStyle>
    width?: number
    height?: number
}) => {
    switch (condition) {
        case 'storm':
            return <IconTStorms style={style} width={width} height={height} />
        case 'snow':
            return <IconSnow style={style} width={width} height={height} />
        case 'rain':
            return <IconRain style={style} width={width} height={height} />
        case 'fog':
            return <IconFog style={style} width={width} height={height} />
        case 'clear_day':
            return <IcnClear style={style} width={width} height={height} />
        case 'clear_night':
            return <IconNtClear style={style} width={width} height={height} />
        case 'cloud':
            return (
                <IconMostlyCloudy style={style} width={width} height={height} />
            )
        case 'cloudly_day':
            return <IconNtCloudy style={style} width={width} height={height} />
        case 'cloudly_night':
            return (
                <IconNtMostlyCloudy
                    style={style}
                    width={width}
                    height={height}
                />
            )
        default:
            return <IcnClear style={style} width={width} height={height} />
    }
}
export default WeatherIcon
