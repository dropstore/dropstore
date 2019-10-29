/* eslint-disable react/no-array-index-key */
/* @flow */
import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import FadeImage from './FadeImage';
import { wPx2P } from '../utils/ScreenUtil';

export default class ActivityImage extends PureComponent {
  render() {
    const { source } = this.props;
    return <FadeImage resizeMode="contain" style={styles.goodImage} source={source} />;
  }
}

const styles = StyleSheet.create({
  goodImage: {
    width: wPx2P(375),
    height: wPx2P(250),
  },
});
