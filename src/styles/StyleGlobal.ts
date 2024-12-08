import { StyleSheet } from "react-native";
import { appInfo } from "../constains/appInfo";
export const StyleGlobal = StyleSheet.create({
    textTitle:{
        color: '#C71A1A',
        fontWeight: 'bold',
        fontSize: Math.min(appInfo.widthWindows, appInfo.heightWindows) * 0.1,
    },
    textTitleContent: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});