import * as React from 'react';
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
            source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2Fbg.png?alt=media&token=360d928c-97d3-4b40-8b2e-8bf57029dddb',
            }}
            style={styles.background}
        >
            {children}
        </ImageBackground>

    )
}
const styles = StyleSheet.create({
    background: {
        flex: 1, // Chiếm toàn bộ không gian màn hình
        alignItems: 'center',
    },
});
export default BackgroundComponent;