/*
 * @Author: Lsfern
 * @Date: 2019-08-12 10:28:12
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 11:33:25
 * @Description: 本地缓存
 */


'use strict';
import AsyncStorage from '@react-native-community/async-storage';

/**
 * 保存数据
 * @param key
 * @param value
 */
export const setStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        return error;
    }
};

/**
 * 获取数据
 * @param key
 */
export const getStorage = async (key) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (error) {
        return error;
    }
};

/**
 * 清除数据
 */
export const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        return error;
    }
};


