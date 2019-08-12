/*
 * @Author: Lsfern
 * @Date: 2019-08-12 14:02:52
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 14:34:46
 * @Description: 排序工具类
 */

/**
 * 对象排序,并将key-value值以key=value&的格式拼接成字符串
 * @param {Object} obj
 */
export const sortObj = (obj) => {
    let objKey = Object.keys(obj);
    let _objKeyArray = objKey.sort().reverse();
    let sToken = '';
    for (let i = 0; i < _objKeyArray.length; i++) {
        sToken += `${_objKeyArray[i]} = ${obj[_objKeyArray[i]]}&`;
    }
    return sToken.substr(0, sToken.length - 2);
};
