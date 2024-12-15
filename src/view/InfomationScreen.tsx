import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigator/StackNavigator';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { useAppDispatch } from '../redux/hooks/hooks';
//redux
import { listenToUserRealtime, setLoading, updateUser } from '../redux/slices/UserSlices';
import { updateNoodleDispenser } from '../redux/slices/NoodleDispenserSlices';
//components
import { BackgroundComponent, LogoComponent, ButtonComponent, SkeletonComponent } from '../components';
//constains
import { appInfo } from '../constains/appInfo';
import { appColor } from '../constains/appColor';
//styles
import { StyleGlobal } from '../styles/StyleGlobal';

const cups1 = 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2Fcups.png?alt=media&token=87b9c36a-c525-4608-a27b-17128d809e31';
const cups2 = 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2Fcups2.png?alt=media&token=9c68fecb-4083-4d80-8cf2-97321d8d48c8';
const cups3 = 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2Fcups3.png?alt=media&token=0584a348-7d8b-48af-989f-5e3a3e6a31fe';
const cups4 = 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2Funavaiable%20noodle.png?alt=media&token=c0f8e015-1ecb-4c8b-839e-46ef4caee726';
const backgroundUri = 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2FFrame%2026.png?alt=media&token=951cdb11-9568-41ef-9b99-93e1a6275844';

const cupNoodles = [
    { id: 1, uri: cups1, isAvailable: true },
    { id: 2, uri: cups2, isAvailable: true },
    { id: 3, uri: cups3, isAvailable: true },
];
const defaultImage =
    { id: 4, uri: cups4, isAvailable: false };
type Stack = StackNavigationProp<RootStackParamList, "InfomationScreen">
type DataRouteProp = RouteProp<RootStackParamList, 'InfomationScreen'>;
const InfomationScreen = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<Stack>();
    //route
    const route = useRoute<DataRouteProp>();
    const userId = route.params;
    // console.log('userId', userId);

    //data
    const user = useSelector((state: any) => state.user.user);
    const loading = useSelector((state: any) => state.user.loading);
    const noodleDispenser = useSelector((state: any) => state.noodleDispenser.noodleDispenser);
    const [loadingImages, setLoadingImages] = useState(true);
    // console.log('loading', loading);
    useEffect(() => {
        if (userId) {
            // dispatch(setLoading(true));
            const unsubscribe = listenToUserRealtime(userId)(dispatch);
            // Hủy bỏ listener khi component bị unmount
            return () => unsubscribe();
        }
    }, [userId]);
    useEffect(() => {
        // Tải hình ảnh và theo dõi trạng thái
        const prefetchImages = async () => {
            try {
                // Tạo một mảng các promise để tải hình ảnh
                const images = [cups1, cups2, cups3, cups4, backgroundUri];
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
    // Lấy ảnh từ cupNoodles
    // const fixedImages = cupNoodles.slice(0, user?.cupNoodles);
    // console.log('fixedImages', fixedImages);
    const numberOfImages = Math.min(user?.cupNoodles || 0, 3);  // Giới hạn số lượng hình ảnh không vượt quá 3
    const cupNoodlesWithDefault = [
        ...cupNoodles.slice(0, numberOfImages),
        ...Array(Math.max(3 - numberOfImages, 0)).fill(defaultImage)
    ];

    // Trạng thái lưu danh sách các chỉ mục đã chọn
    const [selectedIndex, setSelectedIndex] = useState<number[]>([]);

    const handlePress = (index: number) => {
        setSelectedIndex((prevSelected) => {
            // Nếu đã chọn, bỏ chọn
            if (prevSelected.includes(index)) {
                return prevSelected.filter((item) => item !== index);
            }
            // Nếu chưa chọn, thêm vào danh sách
            return [...prevSelected, index];
        });
    }

    const handleCupNoodle = (id: string, totalNoodles: number) => {
        if (noodleDispenser[0].noodleQuatity < selectedIndex.length) {
            navigation.navigate("OutofNoodlesScreen");
            return;
        }
        const cupNoodles = totalNoodles - selectedIndex.length;
        console.log('totalCupsNoodles', cupNoodles);
        //cập nhật mì
        dispatch(updateUser({ id: id, cupNoodles: cupNoodles }));
        dispatch(updateNoodleDispenser({id : noodleDispenser[0].id, noodleQuatity: noodleDispenser[0].noodleQuatity - selectedIndex.length}))
        setSelectedIndex([]);
        navigation.navigate("NotificationScreen");

    }

    //log
    // console.log('parsedData', parsedData);

    // console.log('user', user);
    console.log('selectedIndex', selectedIndex);


    return (
        <BackgroundComponent>
            {
                loadingImages ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) : (
                    <View style={styles.container}>
                        <LogoComponent title='INFORMATION' />
                        <View style={styles.frame}>
                            <Image width={100} height={100} borderRadius={90}
                                source={{ uri: user?.image }} />
                            <View style={{ marginLeft: '7%' }}>
                                <View style={{ marginBottom: '10%' }}>
                                    <Text style={[StyleGlobal.textContent, { color: appColor.radial }]}>Full Name: </Text>
                                </View>
                                <View style={{ marginBottom: '10%' }}>
                                    <Text style={[StyleGlobal.textContent, { color: appColor.radial }]}>Birthday: </Text>

                                </View>
                                <View style={{ marginBottom: '10%' }}>
                                    <Text style={[StyleGlobal.textContent, { color: appColor.radial }]}>Gender: </Text>

                                </View>
                                <View style={{ marginBottom: '10%' }}>
                                    <Text style={[StyleGlobal.textContent, { color: appColor.radial }]}>Department: </Text>

                                </View>
                            </View>
                            <View style={{ marginLeft: '5%' }}>
                                <View style={{ marginBottom: '10%' }}>
                                    <Text style={[StyleGlobal.text, { color: '#880B0B' }]}>{user?.full_name} </Text>

                                </View>
                                <View style={{ marginBottom: '10%' }}>
                                    <Text style={[StyleGlobal.text, { color: '#880B0B' }]}>{user?.birthday} </Text>

                                </View>
                                <View style={{ marginBottom: '10%' }}>
                                    <Text style={[StyleGlobal.text, { color: '#880B0B' }]}>{user?.gender} </Text>

                                </View>
                                <View style={{ marginBottom: '10%' }}>
                                    <Text style={[StyleGlobal.text, { color: '#880B0B' }]}>{user?.department} </Text>

                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                cupNoodlesWithDefault.map((data, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => handlePress(index)}
                                        disabled={!data.isAvailable ? true : false}
                                        style={{
                                            alignItems: 'center',
                                            marginTop: '5%',
                                        }}
                                    >
                                        <View style={{
                                            justifyContent: 'center', // Căn giữa hình ảnh
                                            alignItems: 'center',
                                            marginRight: '5%',
                                            marginLeft: '5%',
                                        }}>
                                            <Image
                                                width={130} height={130}
                                                source={{ uri: selectedIndex.includes(index) ? backgroundUri : " " }}
                                                style={[
                                                    styles.imageBackground,
                                                ]}
                                            />
                                            <Image width={100} height={175}
                                                source={{ uri: data.uri }} />
                                        </View>
                                        {
                                            !data.isAvailable &&
                                            <Text style={styles.unavailable}>Unavailable</Text>
                                        }
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: appInfo.heightWindows * 0.05 }}>
                            <Text style={[StyleGlobal.textTitleContent, { color: appColor.text }]}>{user?.cupNoodles} </Text>
                            <Text style={{ color: '#260E06', fontWeight: 'bold' }}>cups of  noodles left this month</Text>
                        </View>
                        {user?.cupNoodles === 0 ?
                            <ButtonComponent title={'Come back next month'} onPress={() => navigation.navigate("WelcomeScreen")} />
                            :
                            <ButtonComponent title={'Get your noodles'} onPress={() => handleCupNoodle(user.id, user.cupNoodles)} />
                        }
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
    frame: {
        flexDirection: 'row',
        width: appInfo.widthWindows * 0.85,
        borderWidth: 5,
        borderColor: '#FFFFFF',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#FFC900',
        padding: 15,
        alignItems: 'center',
    },
    imageBackground: {
        position: 'absolute',
    },
    selectedBackground: {
        backgroundColor: '#d3d3d3', // Màu nền nếu được chọn
        opacity: 0.8, // Độ mờ để nổi bật lựa chọn
    },
    unavailable: {
        fontSize: 16,
        color: '#A09A9A',
        fontWeight: 'bold',
    },
});
export default InfomationScreen;