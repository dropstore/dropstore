/*
 * @Author: Lsfern
 * @Date: 2019-08-10 21:48:21
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 15:11:21
 * @Description: 网络状态管理
 */
import { useNetInfo } from "@react-native-community/netinfo";

/**
 * 网络是否正常
 */
export const isConnect=()=>{
    const netInfo = useNetInfo();
    return netInfo.isConnected;
};

/**
 * 获取网络类型
 */
export const getNetType=()=>{
    const netInfo = useNetInfo();
    return netInfo.type;
};
