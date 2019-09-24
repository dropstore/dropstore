import React, { PureComponent } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import FadeImage from './FadeImage';

export default class AvatarWithShadow extends PureComponent {
  render() {
    const { source, size } = this.props;
    const sizes = {
      height: size, width: size, borderRadius: size / 2,
    };
    return (
      <View style={[styles.imageWrapper, sizes]}>
        <FadeImage source={source} style={{ ...sizes, overflow: 'hidden' }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageWrapper: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(166, 166, 166)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
        position: 'relative',
      },
    }),
  },
});
