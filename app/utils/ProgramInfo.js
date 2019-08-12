/*
 * @Author: Lsfern
 * @Date: 2019-08-12 10:27:59
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 11:45:17
 * @Description: 程序基本信息管理器
 */

import * as pJson from '../../app.json';

/**
 * 当前版本号 -- 用于版本更新使用
 */
export const getVersionCode = () => {
    return pJson.versionCode;
};

/**
 * 当前版本名称
 */
export const getVersionName = () => {
    return pJson.versionName;
};



