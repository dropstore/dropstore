import React, { PureComponent } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Image from './Image';

type Props = {
  style: Object,
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center',
  source: any,
  children: any,
  onPress?: Function,
  disabled?: boolean,
  hitSlop?: Object,
};

export default class ImageBackgroundCom extends PureComponent<Props> {
  static defaultProps = {
    resizeMode: 'contain',
    onPress: null,
    disabled: false,
    hitSlop: {},
  };

  render() {
    const {
      style, resizeMode, source, children, onPress, disabled, hitSlop,
    } = this.props;
    const Wrapper = onPress ? TouchableOpacity : View;
    return (
      <Wrapper hitSlop={hitSlop} style={style} onPress={onPress} disabled={disabled}>
        <Image resizeMode={resizeMode} source={source} style={{ position: 'absolute', width: style.width, height: style.height }} />
        {children}
      </Wrapper>
    );
  }
}
