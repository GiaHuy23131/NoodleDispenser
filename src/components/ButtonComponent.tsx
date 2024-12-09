import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
//constains
import { appInfo } from '../constains/appInfo';
//styles
import { StyleGlobal } from '../styles/StyleGlobal';
//định dạng kiểu
type ButtonProps = {
    title: string;
    onPress?: () => void;
}
const ButtonComponent = ({ title, onPress }: ButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button} >
            <Text style={StyleGlobal.textTitleContent}>{title}</Text>
        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    button: {
        width: '70%',
        backgroundColor: '#FFB906', // Màu nền nút
        padding: 10,
        borderRadius: 90, // Bo góc nút
        alignItems: 'center', // Căn giữa nội dung nút
        justifyContent: 'center', // Căn giữa theo chiều dọc
        marginVertical: appInfo.heightWindows * 0.02, // Khoảng cách dọc
        // Hiệu ứng bóng cho iOS
        shadowColor: '#FFFFFF', // Màu bóng (trắng)
        shadowOffset: {
            width: 2, // Bóng lệch sang phải
            height: 5, // Bóng lệch xuống dưới
        },
        shadowOpacity: 10, // Độ trong suốt của bóng
        // Hiệu ứng bóng cho Android
        elevation: 5, // Độ nổi của bóng
    },
});
export default ButtonComponent;