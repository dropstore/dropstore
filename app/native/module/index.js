import {NativeModules} from 'react-native';

const wxPayModule = NativeModules.Wxpay;
const alipayModule = NativeModules.Alipay;
const wxAppId = "wx3b91a5e24549cb96";
export {
  wxPayModule,
  wxAppId,
  alipayModule
}
