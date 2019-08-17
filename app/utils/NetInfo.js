/**
 * @file 网络状态管理类
 * @date 2019/8/17 10:55
 * @author ZWW
 */
import { useNetInfo } from '@react-native-community/netinfo';

/**
 * 网络是否正常
 */
export const isConnect = () => {
  const netInfo = useNetInfo();
  return netInfo.isConnected;
};

/**
 * 获取网络类型
 */
export const getNetType = () => {
  const netInfo = useNetInfo();
  return netInfo.type;
};
