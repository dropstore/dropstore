import { NativeModules } from 'react-native';

const wxPayModule = NativeModules.Wxpay;
const alipayModule = NativeModules.Alipay;
const wxAppId = 'wx4def04c004d5c07d';
export {
  wxPayModule,
  wxAppId,
  alipayModule,
};
