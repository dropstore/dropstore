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

  constructor(props: Props) {
    super(props);
    const { source } = this.props;
    this.state = { source };
  }

  componentWillReceiveProps(nextProps: Object) {
    const { source } = this.props;
    if (source !== nextProps.source) {
      this.setState({ source: nextProps.source });
    }
  }

  onError = () => {
    const { source } = this.state;
    if (source.constructor === Object && source.uri) {
      this.setState({
        source: {
          uri: `${source.uri}?${Date.now()}`,
        },
      });
    }
  };

  render() {
    const { source } = this.state;
    if (!source) {
      return null;
    }
    const { style, resizeMode } = this.props;
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
