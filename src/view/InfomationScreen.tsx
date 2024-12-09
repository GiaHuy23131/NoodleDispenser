import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigator/StackNavigator';
import { useNavigation } from '@react-navigation/native';
//components
import { BackgroundComponent, LogoComponent, ButtonComponent } from '../components';
//constains
import { appInfo } from '../constains/appInfo';
//styles
import { StyleGlobal } from '../styles/StyleGlobal';
const cupNoodles = [
    'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2Fcups.png?alt=media&token=87b9c36a-c525-4608-a27b-17128d809e31',
    'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2Fcups2.png?alt=media&token=9c68fecb-4083-4d80-8cf2-97321d8d48c8',
    'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2Fcups3.png?alt=media&token=0584a348-7d8b-48af-989f-5e3a3e6a31fe',
]
const backgroundUri = 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2FFrame%2026.png?alt=media&token=951cdb11-9568-41ef-9b99-93e1a6275844';
type Stack = StackNavigationProp<RootStackParamList, "InfomationScreen">
const InfomationScreen = () => {
    const navigation = useNavigation<Stack>();
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
    console.log(selectedIndex, selectedIndex);

    return (
        <BackgroundComponent>
            <LogoComponent title='INFORMATION' />
            <View style={styles.frame}>
                <Image width={100} height={100} borderRadius={90}
                    source={{ uri: 'https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-cute-2.jpg' }} />
                <View style={{ marginLeft: '7%' }}>
                    <View style={{ marginBottom: '10%' }}>
                        <Text style={[StyleGlobal.textContent, { color: '#880B0B' }]}>Full Name: </Text>

                    </View>
                    <View style={{ marginBottom: '10%' }}>
                        <Text style={[StyleGlobal.textContent, { color: '#880B0B' }]}>Birthday: </Text>

                    </View>
                    <View style={{ marginBottom: '10%' }}>
                        <Text style={[StyleGlobal.textContent, { color: '#880B0B' }]}>Gender: </Text>

                    </View>
                    <View style={{ marginBottom: '10%' }}>
                        <Text style={[StyleGlobal.textContent, { color: '#880B0B' }]}>Department: </Text>

                    </View>
                </View>
                <View style={{ marginLeft: '5%' }}>
                    <View style={{ marginBottom: '10%' }}>
                        <Text style={[StyleGlobal.text, { color: '#880B0B' }]}>Alice Mie </Text>

                    </View>
                    <View style={{ marginBottom: '10%' }}>
                        <Text style={[StyleGlobal.text, { color: '#880B0B' }]}>12/10/1999 </Text>

                    </View>
                    <View style={{ marginBottom: '10%' }}>
                        <Text style={[StyleGlobal.text, { color: '#880B0B' }]}>Female </Text>

                    </View>
                    <View style={{ marginBottom: '10%' }}>
                        <Text style={[StyleGlobal.text, { color: '#880B0B' }]}>Design </Text>

                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                {
                    cupNoodles.map((uri, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handlePress(index)}
                            style={{
                                justifyContent: 'center', // Căn giữa hình ảnh
                                alignItems: 'center',
                                margin: '5%',
                            }}
                        >
                            <Image
                                width={130} height={130}
                                source={{ uri: selectedIndex.includes(index) ? backgroundUri : " " }}
                                style={[
                                    styles.imageBackground,
                                ]}
                            />
                            <Image width={100} height={175}
                                source={{ uri: uri }} />


                        </TouchableOpacity>
                    ))
                }
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: appInfo.heightWindows * 0.05 }}>
                <Text style={StyleGlobal.textTitleContent}>3 </Text>
                <Text style={{ color: '#260E06', fontWeight: 'bold' }}>cups of  noodles left this month</Text>
            </View>
            <ButtonComponent title='Get your noodles' onPress={() => navigation.navigate("NotificationScreen")} />
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
});
export default InfomationScreen;