import * as React from 'react';
import { useEvent } from 'expo';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigator/StackNavigator';
import { useNavigation } from '@react-navigation/native';
import { useVideoPlayer, VideoView } from 'expo-video';
//constains
import { appInfo } from '../constains/appInfo';
//styles
import { StyleGlobal } from '../styles/StyleGlobal';
//components
import { LogoComponent, BackgroundComponent } from '../components';

//
type Stack = StackNavigationProp<RootStackParamList, "WelcomeScreen">
const videoSource =
    'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2FALTA%20MEDIA%20GENERAL%20PROFILE%20CORPORATE%20VIDEO.mp4?alt=media&token=57aa5302-2c31-47b8-b4dd-36e06b22bd70';
const WelcomeScreen = () => {
    const navigation = useNavigation<Stack>();

    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        // player.play();
    });
    // const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
    return (
        //Background
        <BackgroundComponent>
            {/* Logo * Title*/}
            <LogoComponent title='WELCOME' />
            {/* Video */}
            <View style={styles.frame}>
                <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: appInfo.heightWindows * 0.08, justifyContent: 'space-between' }}>
                <Image style={{ width: appInfo.widthWindows * 0.1, height: appInfo.heightWindows * 0.05, marginRight: 15 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2FScan.png?alt=media&token=16831310-8e31-4af9-8cab-6528216c4c38' }} />
                <Text style={StyleGlobal.textTitleContent}>Follow the arrow to scan card</Text>
            </View>
            <View style={styles.rowContainer}>
                {/* Quet QR */}
                <TouchableOpacity style={styles.centerContainer} onPress={() => navigation.navigate("InfomationScreen")}>
                    <Image
                        source={{
                            uri: 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2FFrame%2016.png?alt=media&token=f25feb4b-36ed-4948-9f4b-8405f3297d4a'
                        }}
                        style={styles.imageCenter}
                    />
                </TouchableOpacity>
                <Image
                    source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2FFrame.png?alt=media&token=fad80e6e-5975-4413-b49b-33427bbcb0c2'
                    }}
                    style={styles.imageLeft}
                />
            </View>
        </BackgroundComponent>
    );
};

const styles = StyleSheet.create({
    frame: {
        width: appInfo.widthWindows * 0.85,
        height: appInfo.heightWindows * 0.23,
        borderWidth: 5,
        borderColor: '#FFFFFF',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#FFC900',
        padding: 5,
        alignItems: 'center',
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