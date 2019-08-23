const { NativeModules } = require('react-native');

/**
 * @param {Number} platform 平台id, 0:QQ, 1:SINA, 2:微信
 */
const Auth = platform => new Promise((resolve, reject) => {
  NativeModules.UMShareModule.auth(platform, (code, result, message) => {
    if (code === 200) {
      resolve(result);
    }
    reject(message);
  });
});

export default Auth;
