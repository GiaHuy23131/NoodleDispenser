import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigator/StackNavigator';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
//redux
import { listenToUserRealtime } from '../redux/slices/UserSlices';
//components
import { BackgroundComponent, LogoComponent, ButtonComponent } from '../components';
//constains
import { appInfo } from '../constains/appInfo';
import { appColor } from '../constains/appColor';
//styles
import { StyleGlobal } from '../styles/StyleGlobal';

const cupNoodles = [
    { id: 1, uri: 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2Fcups.png?alt=media&token=87b9c36a-c525-4608-a27b-17128d809e31', isAvailable: true },
    { id: 2, uri: 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2Fcups2.png?alt=media&token=9c68fecb-4083-4d80-8cf2-97321d8d48c8', isAvailable: true },
    { id: 3, uri: 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2Fcups3.png?alt=media&token=0584a348-7d8b-48af-989f-5e3a3e6a31fe', isAvailable: true },
]
const defaultImage =
    { id: 4, uri: 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2Funavaiable%20noodle.png?alt=media&token=c0f8e015-1ecb-4c8b-839e-46ef4caee726', isAvailable: false };
const backgroundUri = 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2FFrame%2026.png?alt=media&token=951cdb11-9568-41ef-9b99-93e1a6275844';
type Stack = StackNavigationProp<RootStackParamList, "InfomationScreen">
type DataRouteProp = RouteProp<RootStackParamList, 'InfomationScreen'>;
const InfomationScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<Stack>();
    //route
    const route = useRoute<DataRouteProp>();
    const userId = route.params;
    // console.log('userId', userId);

    useEffect(() => {
        if (userId) {
            const unsubscribe = listenToUserRealtime(userId)(dispatch);
            // Hủy bỏ listener khi component bị unmount
            return () => unsubscribe();
        }
    }, [userId]);

    //data
    const user = useSelector((state: any) => state.user.user);
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

    //log
    // console.log('parsedData', parsedData);

    console.log('user', user);
    console.log(selectedIndex, selectedIndex);

    return (
        <BackgroundComponent>
            <LogoComponent title='INFORMATION' />
            <View style={styles.frame}>
                <Image width={100} height={100} borderRadius={90}
                    source={{ uri: user?.image }} />
                <View style={{ marginLeft: '7%' }}>
                    <View style={{ marginBottom: '10%' }}>
                        <Text style={[StyleGlobal.textContent, { color:  appColor.radial}]}>Full Name: </Text>

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
                <ButtonComponent title={'Get your noodles'} onPress={() => navigation.navigate("NotificationScreen")} />
            }

        </BackgroundComponent>
    )
}
const styles = StyleSheet.create({
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