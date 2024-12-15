import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Button } from 'react-native';
//constains
import { appInfo } from '../constains/appInfo';
//styles
import { StyleGlobal } from '../styles/StyleGlobal';
//định dạng kiểu
type BackgroundProps = {
    children: React.ReactNode;
}
const BackgroundComponent = ({children}: BackgroundProps) => {
    return (
        <ImageBackground
            source={require('../../assets/bg.png')}
            style={styles.background}
        >
            {children}
        </ImageBackground>

    )
}
const styles = StyleSheet.create({
    background: {
        flex: 1, // Chiếm toàn bộ không gian màn hình
    },
});
export default BackgroundComponent;