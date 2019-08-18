/**
 * @file 程序基本信息
 * @date 2019/8/17 10:56
 * @author ZWW
 */
import * as pJson from '../../app.json';

/**
 * 当前版本号 -- 用于版本更新使用
 */
export const getVersionCode = () => pJson.versionCode;

/**
 * 当前版本名称
 */
export const getVersionName = () => pJson.versionName;
