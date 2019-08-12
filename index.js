/*
 * @Author: Lsfern
 * @Date: 2019-08-10 06:34:30
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 16:15:00
 * @Description: Index
 */
import {AppRegistry,YellowBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
AppRegistry.registerComponent(appName, () => App);
