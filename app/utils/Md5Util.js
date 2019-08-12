/*
 * @Author: Lsfern
 * @Date: 2019-08-12 14:02:09
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 14:59:07
 * @Description: 加密工具类
 */

import Forge from 'node-forge';

/**
 * MD5加密
 * @param {String} str
 */
export const md5 = (str) => {
    // 注意创建与更新需要写在一起
    let md5 = Forge.md.md5.create();
    md5.update(str);
    return md5.digest().toHex();
};
