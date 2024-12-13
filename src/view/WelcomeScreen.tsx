import React, { useState, useEffect } from 'react';
import { useEvent } from 'expo';
import { SafeAreaView, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, Alert, Vibration } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import YoutubeIframe from 'react-native-youtube-iframe';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigator/StackNavigator';
import { useNavigation } from '@react-navigation/native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { BarcodeScanningResult, CameraView, useCameraPermissions, PermissionStatus } from 'expo-camera';
import { useAppDispatch } from '../redux/hooks/hooks';
//redux
import { addUser } from '../redux/slices/UserSlices';
import { listenToNoodleDispenserRealtime } from '../redux/slices/NoodleDispenserSlices';
//constains
import { appInfo} from '../constains/appInfo';
import { appColor } from '../constains/appColor';
//styles
import { StyleGlobal } from '../styles/StyleGlobal';
//components
import { LogoComponent, BackgroundComponent, OverlayComponent } from '../components';

//
type Stack = StackNavigationProp<RootStackParamList, "WelcomeScreen">

const videoSource =
    'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2FALTA%20MEDIA%20GENERAL%20PROFILE%20CORPORATE%20VIDEO.mp4?alt=media&token=57aa5302-2c31-47b8-b4dd-36e06b22bd70';
const QR = 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2FFrame%2016.png?alt=media&token=f25feb4b-36ed-4948-9f4b-8405f3297d4a';
const WelcomeScreen = () => {
    const navigation = useNavigation<Stack>();
    const dispatch = useAppDispatch();
    const [permission, requestPermission] = useCameraPermissions();
    const [cameraVisible, setCameraVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = listenToNoodleDispenserRealtime()(dispatch);
        // Hủy bỏ listener khi component bị unmount
        return () => unsubscribe();
    }, []);
    const noodleDispenser = useSelector((state: any) => state.noodleDispenser.noodleDispenser);
    // console.log('noodleDispenser', noodleDispenser[0]?.noodleQuatity);

    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        // player.play();
    });
    // const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

    const requestCameraPermission = async () => {
        const result = await requestPermission();
        if (result.granted) {
            setCameraVisible(true); // Hiển thị camera khi quyền được cấp
        } else {
            Alert.alert(
                "Yêu cầu quyền truy cập camera",
                "Bạn đã từ chối quyền truy cập camera. Vui lòng cấp quyền trong cài đặt để tiếp tục sử dụng tính năng này."
            );
        }
    };

    const handleOpenCamera = () => {
        if (permission?.status === PermissionStatus.UNDETERMINED || permission?.status === PermissionStatus.DENIED) {
            // Nếu quyền chưa được yêu cầu hoặc bị từ chối, yêu cầu quyền
            requestCameraPermission();
        } else if (permission?.granted) {
            setCameraVisible(true); // Hiển thị camera
        }
    };

    const onBarcodeScanned = ({ data }: BarcodeScanningResult) => {
        if (!cameraVisible) return;

        try {
            Vibration.vibrate(); // chế độ run
            setCameraVisible(false); // Quay lại màn hình chính
            console.log("Barcode scanned:", data);
            // Chuyển chuỗi thành object
            const jsonString = data.replace(/'/g, '"');
            const user = JSON.parse(jsonString);
            console.log('parsedData', user);
            if (noodleDispenser[0].noodleQuatity > 0) {
                dispatch(addUser(user))
                    .unwrap()
                    .then(() => navigation.navigate("InfomationScreen", user.id))
                    .catch((error) => console.error("Error dispatching addUser:", error));
            } else {
                navigation.navigate("OutofNoodlesScreen",noodleDispenser[0].noodleQuatity);
            }


        } catch (error) {
            console.error("Barcode scan error:", error);
        }
    };
    return (
        cameraVisible ? (
            <>
                <CameraView
                    style={{ flex: 1 }}
                    facing="back"
                    onBarcodeScanned={onBarcodeScanned}
                    barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                />
                <OverlayComponent />
            </>
        ) : (
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
                    <Text style={[StyleGlobal.textTitleContent, { color: appColor.text }]}>Follow the arrow to scan card</Text>
                </View>
                <View style={styles.rowContainer}>
                    {/* Quet QR */}
                    <TouchableOpacity style={styles.centerContainer} onPress={() => handleOpenCamera()}>
                        <Image
                            source={{
                                uri: QR,
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
        )
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