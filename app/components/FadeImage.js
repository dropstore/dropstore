/* @flow */
import React, { PureComponent } from 'react';
import {
  Animated, View, Platform, Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';

type Props = {
  onLoadEnd?: Function,
  style: Object,
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center',
  source: any,
  children?: any,
};

type State = {
  source: any,
};

export default class FadeImage extends PureComponent<Props, State> {
  static defaultProps = {
    onLoadEnd: null,
    children: null,
    resizeMode: 'cover',
  }

  opacity: any
  constructor(props: Props) {
    super(props);
    this.opacity = new Animated.Value(0.1);
    const { source } = this.props;
    this.state = { source };
  }

  componentWillReceiveProps(nextProps: Object) {
    const { source } = this.props;
    if (source !== nextProps.source) {
      this.setState({ source: nextProps.source });
    }
  }

  changeOpacity = () => {
    const { onLoadEnd } = this.props;
    Animated.timing(
      this.opacity,
      {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      },
    ).start();

    if (onLoadEnd) {
      onLoadEnd();
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
  }

  render() {
    const { source } = this.state;
    if (!source) {
      return null;
    }
    const { style, resizeMode, children } = this.props;
    if (Platform.OS === 'ios') {
      const Wrapper = source.constructor !== Object ? FastImage : Image;
      return (
        <Animated.View style={[style, { opacity: this.opacity, borderWidth: 0 }]}>
          <Wrapper
            onLoad={this.changeOpacity}
            resizeMode={resizeMode}
            onError={this.onError}
            style={{
              width: style.width,
              height: style.height,
              borderWidth: style.borderWidth,
              borderColor: style.borderColor,
              borderRadius: style.borderRadius,
              backgroundColor: style.backgroundColor || '#FFFFFF',
              position: 'absolute',
            }}
            source={source}
          />
          {children}
        </Animated.View>
      );
    }
    return (
      <View style={[style, { borderWidth: 0 }]}>
        <Image
          resizeMode={resizeMode}
          onError={this.onError}
          style={{
            width: style.width,
            height: style.height,
            borderWidth: style.borderWidth,
            borderColor: style.borderColor,
            borderRadius: style.borderRadius,
            backgroundColor: style.backgroundColor || '#FFFFFF',
            position: 'absolute',
          }}
          fadeDuration={300}
          source={source}
        />
        {children}
      </View>
    );
  }
}
