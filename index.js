/*
 * @Author: Lsfern
 * @Date: 2019-08-10 06:34:30
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-12 16:15:00
 * @Description: Index
 */
import {
  AppRegistry, YellowBox, Text, TextInput,
} from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Normal } from './app/res/FontFamily';

TextInput.defaultProps = { ...TextInput.defaultProps, allowFontScaling: false };

const TextRender = Text.render;
Text.render = function render(props) {
  /* eslint-disable */
  const oldProps = props;
  props = { ...props, allowFontScaling: false, style: [{ fontFamily: Normal, fontSize: 14, color: '#000' }, props.style] };
  try {
    return TextRender.apply(this, arguments);
  } finally {
    props = oldProps;
  }
};

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
AppRegistry.registerComponent(appName, () => App);
