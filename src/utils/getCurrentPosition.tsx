import Geolocation from 'react-native-geolocation-service'
import requestLocationPermission from '../utils/requestPermission'

function getCurrentPosition(): Promise<{
    latitude: number
    longitude: number
    granted: boolean
}> {
    return new Promise((resolve, reject) => {
        requestLocationPermission()
            .then(() => {
                Geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords
                        resolve({ latitude, longitude, granted: true })
                    },
                    error => {
                        console.log('getCurrentPosition error : ', error)
                        reject(error.message)
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 10000
                    }
                )
            })
            .catch(err => {
                console.log('requestLocationPermission error : ', err)
                reject(err)
            })
    })
}

export default getCurrentPosition
