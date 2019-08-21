/**
 * @file ImageBackground 组件
 * @date 2019/8/18 18:07
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
const defaultHeight = 49;
type Props = {
  style: Object,
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center',
  source: any,
  children: any,
  onPress: Function,
};

export default class ImageBackgroundCom extends PureComponent<Props> {
  static defaultProps = {
    resizeMode: 'contain',
  };

  render() {
    const {style, resizeMode, source, children, onPress} = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={style}>
        <ImageBackground
          style={[_styles.defaultStyle, {width: style.width, height: style.height ? style.height : defaultHeight}]}
          resizeMode={resizeMode}
          source={source}
        >
          {children}
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}
const _styles = StyleSheet.create({
  defaultStyle: {
    height: defaultHeight,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
