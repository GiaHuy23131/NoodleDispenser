import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, Alert, Vibration } from 'react-native';
import { RootStackParamList } from '../navigator/StackNavigator';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSelector } from "react-redux";
//constains
import { appInfo } from '../constains/appInfo';
import { appColor } from '../constains/appColor';
//styles
import { StyleGlobal } from '../styles/StyleGlobal';
//components
import { LogoComponent, BackgroundComponent } from '../components';

const outOfNoodles = 'https://firebasestorage.googleapis.com/v0/b/terrianfirefly.appspot.com/o/NoodleDispenser%2Fout%20of%20noodles.png?alt=media&token=bf2e37d2-01e4-4810-a24e-a307b2a9ab9e';
const OutofNoodlesScreen = () => {
    //route
    const noodleDispenser = useSelector((state: any) => state.noodleDispenser.noodleDispenser);
    console.log('noodleQuatity', noodleDispenser[0].noodleQuatity);

    return (
        <BackgroundComponent>
            <View style={styles.container}>
                <LogoComponent title='OUT OF NOODLES' />
                <Text style={[StyleGlobal.textTitleContent, { textAlign: 'left', flexWrap: 'wrap', marginBottom: appInfo.heightWindows * 0.05, color: appColor.unavailable }]}>
                    There is <Text style={{ color: appColor.white }}>{noodleDispenser[0].noodleQuatity}</Text> cup of noodles left in the machine. Please fill in to continue.
                </Text>
                <Image width={appInfo.widthWindows * 0.65} height={appInfo.heightWindows * 0.2} source={{ uri: outOfNoodles }} />
            </View>


        </BackgroundComponent>
    )
}
const styles = StyleSheet.create({
    container: {
        margin: '5%',
        alignItems: 'center',
    },
});
export default OutofNoodlesScreen;