import React, { useState, useEffect } from 'react';
import { useEvent } from 'expo';
import { SafeAreaView, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, Alert, Vibration, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import YoutubeIframe from 'react-native-youtube-iframe';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigator/StackNavigator';
import { useNavigation } from '@react-navigation/native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { BarcodeScanningResult, CameraView, useCameraPermissions, PermissionStatus } from 'expo-camera';
import { useAppDispatch } from '../redux/hooks/hooks';
import { Skeleton } from '@rneui/themed';
//redux
import { addUser } from '../redux/slices/UserSlices';
import { listenToNoodleDispenserRealtime } from '../redux/slices/NoodleDispenserSlices';
//constains
import { appInfo } from '../constains/appInfo';
import { appColor } from '../constains/appColor';
//styles
import { StyleGlobal } from '../styles/StyleGlobal';
//components
import { LogoComponent, BackgroundComponent, OverlayComponent, SkeletonComponent } from '../components';

//type
type Stack = StackNavigationProp<RootStackParamList, "WelcomeScreen">
const videoSource =
    'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2FALTA%20MEDIA%20GENERAL%20PROFILE%20CORPORATE%20VIDEO.mp4?alt=media&token=57aa5302-2c31-47b8-b4dd-36e06b22bd70';
const QR = 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2FFrame%2016.png?alt=media&token=f25feb4b-36ed-4948-9f4b-8405f3297d4a';
const imgArrow = 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2FFrame.png?alt=media&token=fad80e6e-5975-4413-b49b-33427bbcb0c2';
const scan = 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2FScan.png?alt=media&token=16831310-8e31-4af9-8cab-6528216c4c38';
const error = 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2Ferror.png?alt=media&token=149561ff-6a0e-467a-82bc-6654de3ffd12';
const WelcomeScreen = () => {
    const navigation = useNavigation<Stack>();
    const dispatch = useAppDispatch();
    const [permission, requestPermission] = useCameraPermissions();
    const [cameraVisible, setCameraVisible] = useState(false);
    const [loadingImages, setLoadingImages] = useState(true);
    const [idCheck, setIdCheck] = useState(false);

    useEffect(() => {
        const unsubscribe = listenToNoodleDispenserRealtime()(dispatch);
        // Hủy bỏ listener khi component bị unmount
        return () => unsubscribe();
    }, []);
    useEffect(() => {
        // Tải hình ảnh và theo dõi trạng thái
        const prefetchImages = async () => {
            try {
                // Tạo một mảng các promise để tải hình ảnh
                const images = [QR, imgArrow, scan];
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
    const noodleDispenser = useSelector((state: any) => state.noodleDispenser.noodleDispenser);
    // console.log('noodleDispenser', noodleDispenser?.noodleQuatity);

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
            console.log("Barcode scanned:", data);
            setCameraVisible(false);
            // Chuyển chuỗi thành object
            const jsonString = data.replace(/'/g, '"');
            const user = JSON.parse(jsonString);
            console.log('parsedData', user);
            if (user.id.length !== 12) {
                setCameraVisible(false);
                setIdCheck(true);
                return;
            }
            if (noodleDispenser?.noodleQuatity > 0) {
                setIdCheck(false);
                dispatch(addUser(user))
                    .unwrap()
                    .then(() => navigation.navigate("InfomationScreen", user.id))
                    .catch((error) => console.error("Error dispatching addUser:", error));
            } else {
                navigation.navigate("OutofNoodlesScreen");
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
                {
                    loadingImages ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    ) : (
                        <View style={styles.container}>
                            {/* Logo * Title*/}
                            <LogoComponent title={idCheck ? 'Error' : 'WELCOME'} />
                            {
                                idCheck ? (
                                    <>
                                        <Text style={[StyleGlobal.textTitleContent, { color: appColor.text }]}>Follow the arrow to scan card</Text>
                                        <View style={{ backgroundColor: '#D86643', padding: 10, borderRadius: 10, marginTop: appInfo.heightWindows * 0.05 }}>
                                            <Text style={{ color: appColor.white, fontSize: 16 }}>Please scan again.</Text>
                                        </View>
                                        <Image width={appInfo.widthWindows * 0.33} height={appInfo.heightWindows * 0.18}
                                            source={{ uri: error }}
                                            style={{ marginTop: appInfo.heightWindows * 0.04, marginBottom: appInfo.heightWindows * 0.02 }} />
                                    </>
                                ) : (
                                    //Video
                                    <View style={styles.frame}>
                                        <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
                                    </View>
                                )
                            }
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Image style={{ width: appInfo.widthWindows * 0.1, height: appInfo.heightWindows * 0.05, marginRight: 15 }} source={{ uri: scan }} />
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
                                        uri: imgArrow
                                    }}
                                    style={styles.imageLeft}
                                />
                            </View>
                        </View >
                    )
                }
            </BackgroundComponent >
        )
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: '5%',
        alignItems: 'center',
        marginBottom: '10%',
    },
    frame: {
        width: appInfo.widthWindows * 0.85,
        height: appInfo.heightWindows * 0.23,
        borderWidth: 5,
        borderColor: '#FFFFFF',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#FFC900',
        padding: 5,
        marginBottom: appInfo.heightWindows * 0.02,
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
        marginTop: 'auto',
    },
    imageLeft: {
        width: appInfo.widthWindows * 0.18,
        height: appInfo.heightWindows * 0.05,
        right: '0%', // Khoảng cách bên trái nếu cần
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