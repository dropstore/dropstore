/* @flow */
import React, { PureComponent } from 'react';
import { Image } from 'react-native';

type Props = {
  style: Object,
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center',
  source: any,
};

type State = {
  source: any,
};

export default class ImageNetUnkoneSize extends PureComponent<Props, State> {
  static defaultProps = {
    resizeMode: 'contain',
  }

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { source, style } = this.props;
    Image.getSize(source.uri, (width, height) => {
      this.setState({
        height: style.width / width * height,
      });
    });
  }

  render() {
    const { style, resizeMode, source } = this.props;
    const { height } = this.state;
    if (!source) {
      return null;
    }
    return (
      <Image
        resizeMode={resizeMode}
        style={{
          ...style,
          height,
          width: style.width,
        }}
        source={source}
      />
    );
  }
}
