import * as React from 'react';
import { useEvent } from 'expo';
import { StyleSheet, Text, View, Image, ImageBackground, Button } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import { useVideoPlayer, VideoView } from 'expo-video';
//constains
import { appInfo } from '../constains/appInfo';
//styles
import { StyleGlobal } from '../styles/StyleGlobal';
const videoSource =
    'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2FALTA%20MEDIA%20GENERAL%20PROFILE%20CORPORATE%20VIDEO.mp4?alt=media&token=57aa5302-2c31-47b8-b4dd-36e06b22bd70';
const WelcomeScreen = () => {
    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        // player.play();
    });
    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
    return (
        <ImageBackground
            source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2Fbg.png?alt=media&token=360d928c-97d3-4b40-8b2e-8bf57029dddb',
            }}
            style={styles.background}
        >
            {/* Logo */}
            <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2Flogo.png?alt=media&token=55ec0831-f7e5-4513-974a-6c0ce6e45e88' }}
                style={styles.logo}
            />
            <Text style={StyleGlobal.textTitle}>WELCOME</Text>
            {/* Video */}
            <View style={styles.frameYTB}>
                <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: appInfo.heightWindows * 0.05, justifyContent: 'space-between' }}>
                <Image style={{ width: appInfo.widthWindows * 0.1, height: appInfo.heightWindows * 0.05, marginRight: 15 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2FScan.png?alt=media&token=16831310-8e31-4af9-8cab-6528216c4c38' }} />
                <Text style={[StyleGlobal.textTitleContent, { color: '#AE0808' }]}>Follow the arrow to scan card</Text>
            </View>
            <View style={styles.rowContainer}>
                {/* Quet QR */}
                <View style={styles.centerContainer}>
                    <Image
                        source={{
                            uri: 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2FFrame%2016.png?alt=media&token=f25feb4b-36ed-4948-9f4b-8405f3297d4a'
                        }}
                        style={styles.imageCenter}
                    />
                </View>
                <Image
                    source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2FFrame.png?alt=media&token=fad80e6e-5975-4413-b49b-33427bbcb0c2'
                    }}
                    style={styles.imageLeft}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1, // Chiếm toàn bộ không gian màn hình
        alignItems: 'center',
    },
    logo: {
        width: appInfo.widthWindows * 0.252, // Kích thước logo
        height: appInfo.heightWindows * 0.202,
        marginTop: appInfo.heightWindows * 0.02,
        resizeMode: 'contain', // Đảm bảo ảnh không bị cắt
    },
    frameYTB: {
        width: appInfo.widthWindows * 0.85,
        height: appInfo.heightWindows * 0.23,
        borderWidth: 5,
        borderColor: '#FFFFFF',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#FFA500',
        padding: 5,
        alignItems: 'center',
        marginTop: appInfo.heightWindows * 0.03,
    },
    video: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: appInfo.heightWindows * 0.08,
    },
    imageLeft: {
        width: appInfo.widthWindows * 0.18,
        height: appInfo.heightWindows * 0.05,
        right: '5%', // Khoảng cách bên trái nếu cần
        position: 'absolute',
    },
    centerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between', // Giúp canh ảnh
    },
    imageCenter: {
        width: appInfo.widthWindows * 0.33,
        height: appInfo.heightWindows * 0.18,
    }
});
export default WelcomeScreen;