import * as React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Button } from 'react-native';
//constains
import { appInfo } from '../constains/appInfo';
//styles
import { StyleGlobal } from '../styles/StyleGlobal';
//định dạng kiểu
type LogoProps = {
    title: string;
}
const LogoComponent = ({title}: LogoProps) => {
    return (
        <View style={{alignItems: 'center', marginBottom: appInfo.heightWindows * 0.03, marginTop: appInfo.heightWindows * 0.05}} >
            <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2Flogo.png?alt=media&token=55ec0831-f7e5-4513-974a-6c0ce6e45e88' }}
                style={styles.logo}
            />
            <Text style={StyleGlobal.textTitle}>{title}</Text>
        </View>

    )
}
const styles = StyleSheet.create({
    logo: {
        width: appInfo.widthWindows * 0.252, // Kích thước logo
        height: appInfo.widthWindows * 0.202,
        resizeMode: 'contain', // Đảm bảo ảnh không bị cắt
        marginBottom: appInfo.heightWindows * 0.03,
    },
});
export default LogoComponent;