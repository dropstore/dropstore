/*
 * @Author: Lsfern
 * @Date: 2019-08-12 15:26:40
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 17:49:13
 * @Description: 网络状态管理,待完善
 */

import {
    action,
    observable,
} from 'mobx';

class NetInfoStore {
    @observable isConnect; // 网络状态
    @observable netType; // 网络类型
    constructor() {
        this.isConnect = false; // 初始化变量
        this.netType = "";
    }
    @action checkIsConnect = (isConnect) => {
        this.isConnect = isConnect;
    };

    @action setNetType = (netType) => {
        this.netType = netType;
    }
}

const netInfoStore = new NetInfoStore();
export {
    netInfoStore
}
