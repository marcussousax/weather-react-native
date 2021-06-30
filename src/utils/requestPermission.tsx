import { Alert, PermissionsAndroid, Platform } from 'react-native'
import Geolocation from 'react-native-geolocation-service'

async function requestLocationPermission() {
    if (Platform.OS === 'ios') {
        await Geolocation.requestAuthorization('whenInUse')
    }
    if (Platform.OS === 'android') {
        try {
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
                console.log({ granted })
            } else {
                console.log({ granted })
            }
        } catch (err) {
            Alert.alert('Permission Error', err)
        }
    }
}

export default requestLocationPermission
