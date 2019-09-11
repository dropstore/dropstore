/* @flow */
import React, { PureComponent } from 'react';
import { Platform, Image } from 'react-native';
import FastImage from 'react-native-fast-image';

type Props = {
  style: Object,
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center',
  source: any,
};

type State = {
  source: any,
};

export default class ImageOrFastImage extends PureComponent<Props, State> {
  static defaultProps = {
    resizeMode: 'cover',
  }

  render() {
    const { source, style, resizeMode } = this.props;
    if (!source) { return null; }
    const Wrapper = Platform.OS === 'ios' && source.constructor !== Object ? FastImage : Image;
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
