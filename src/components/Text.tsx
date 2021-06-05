import React, { ReactNode } from 'react'
import {
    StyleProp,
    StyleSheet,
    Text as NativeText,
    TextStyle
} from 'react-native'

export const Text: React.FC<{
    children: ReactNode
    style?: StyleProp<TextStyle>
}> = ({ children, style }) => {
    return <NativeText style={[styles.text, style]}>{children}</NativeText>
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Lato-Regular'
    }
})
