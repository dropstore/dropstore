/**
 * @file 网络状态管理类
 * @date 2019/8/17 13:55
 * @author ZWW
 */

// https://github.com/react-native-community/react-native-netinfo
import NetInfo from '@react-native-community/netinfo';

/**
 * 获取网络类型
 * none - Android，iOS，Windows - 没有网络连接处于活动状态
 * unknown - Android，iOS，Windows - 网络状态无法或尚未确定
 * cellular - Android，iOS，Windows - 蜂窝网络
 * wifi - Android，iOS，Windows - 通过Wifi激活网络
 * @returns {Promise<*>}
 * @private
 */
const _getNetType = async () => {
  const state = await NetInfo.fetch();
  return state.type;
};

/**
 * 网络是否可以正常使用
 * @returns {Promise<false | true>}
 */
export const isConnected = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};

/**
 * 是否是移动网络
 * @returns {Promise<boolean>}
 */
export const isMobile = async () => await _getNetType() === 'cellular';

/**
 * 是否是wifi
 * @returns {Promise<boolean>}
 */
export const isWifi = async () => await _getNetType() === 'wifi';
