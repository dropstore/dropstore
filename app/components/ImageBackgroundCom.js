/**
 * @file ImageBackground 组件
 * @date 2019/8/18 18:07
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {TouchableOpacity, ImageBackground, StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from '../common/Constant';

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
      <TouchableOpacity onPress={onPress}>
        <ImageBackground
          style={[style, _styles.defaultStyle]}
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
    height: 49,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5
  }
});
