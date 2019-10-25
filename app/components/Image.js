/* @flow */
import React, { PureComponent } from 'react';
import { Platform, Image, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

type Props = {
  style: Object,
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center',
  source: any,
  onPress: Function,
};

type State = {
  source: any,
};

export default class ImageOrFastImage extends PureComponent<Props, State> {
  static defaultProps = {
    resizeMode: 'cover',
  }

  render() {
    const {
      source, style, resizeMode, onPress, hitSlop,
    } = this.props;
    if (!source || (source.constructor === Object && typeof source.uri !== 'string')) { return null; }
    const Wrapper = Platform.OS === 'ios' && source.constructor !== Object ? FastImage : Image;
    if (onPress) {
      return (
        <TouchableOpacity
          onPress={onPress}
          hitSlop={hitSlop || {
            top: 20, right: 20, left: 20, bottom: 20,
          }}
        >
          <Wrapper
            resizeMode={resizeMode}
            style={style}
            source={source}
            onError={this.onError}
          />
        </TouchableOpacity>
      );
    }
    return (
      <Wrapper
        resizeMode={resizeMode}
        style={style}
        source={source}
        onError={this.onError}
      />
    );
  }
}
