import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigator/StackNavigator';
import { useNavigation } from '@react-navigation/native';
//constains
import { appInfo } from '../constains/appInfo';
//styles
import { StyleGlobal } from '../styles/StyleGlobal';
//components
import { LogoComponent, BackgroundComponent, ButtonComponent } from '../components';
type Stack = StackNavigationProp<RootStackParamList, "NotificationScreen">
const imgDone = 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2FDone.png?alt=media&token=0ee9392b-f913-425f-bc1a-440d8746707f';
const favourite = 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2Ffavourite%20(1)%201.png?alt=media&token=938f56b8-6a3a-42be-b2bd-102838848276';
const imgArrow = 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2FFrame%20(1).png?alt=media&token=78418227-1425-4f97-a704-54eb457a8b89';
const NotificationScreen = () => {
    const navigation = useNavigation<Stack>();
    const [loadingImages, setLoadingImages] = useState(true);
    useEffect(() => {
        // Tải hình ảnh và theo dõi trạng thái
        const prefetchImages = async () => {
            try {
                // Tạo một mảng các promise để tải hình ảnh
                const images = [imgDone, imgArrow, favourite];
                await Promise.all(
                    images.map((image) =>
                        Image.prefetch(image).catch((error) => {
                            console.error(`Error prefetching image ${image}:`, error);
                            return null; // Không dừng cả quá trình nếu có lỗi với một ảnh
                        })
                    )
                );
                setLoadingImages(false); // Hình ảnh tải xong
            } catch (error) {
                console.error('Error prefetching images:', error);
            }
        };

        prefetchImages();
    }, []);
    return (
        <BackgroundComponent >
            {
                loadingImages ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) : (
                    <View style={styles.container}>
                        <LogoComponent title='DONE' />
                        <Image width={appInfo.widthWindows * 0.61} height={appInfo.widthWindows * 0.7} source={{ uri: imgDone }} />
                        <View style={{ flexDirection: 'row', marginBottom: appInfo.heightWindows * 0.07 }}>
                            <Text style={{ color: '#C71A1A', fontSize: 30, fontWeight: 'bold' }}>Enjoy your noodles </Text>
                            <Image source={{ uri: favourite }} width={40} height={40} />
                        </View>
                        <ButtonComponent title='Back to home' onPress={() => navigation.navigate('WelcomeScreen')} />
                        <Text style={{ fontSize: 24, color: '#F8C135', fontWeight: 'bold', marginTop: appInfo.heightWindows * 0.02, marginBottom: appInfo.heightWindows * 0.005 }}>Get them below</Text>
                        <Image width={appInfo.widthWindows * 0.07} height={appInfo.heightWindows * 0.06} source={{ uri: imgArrow }} />
                    </View>
                )
            }
        </BackgroundComponent>
    )
}
const styles = StyleSheet.create({
    container: {
        margin: '5%',
        alignItems: 'center',
    },
});
export default NotificationScreen;