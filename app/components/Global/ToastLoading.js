import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, ActivityIndicator,
} from 'react-native';
import { SCREEN_HEIGHT } from '../../common/Constant';

const height = 80;

export default class ToastLoading extends PureComponent {
  componentDidMount() {
    const { data, close } = this.props;
    this.timeout = setTimeout(() => {
      close();
    }, data.duration);
  }

  componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout);
  }

  render() {
    const { data } = this.props;
    return (
      <View style={styles.wrapper}>
        <ActivityIndicator />
        <Text style={styles.text}>{data.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: (SCREEN_HEIGHT - height) / 2,
    alignSelf: 'center',
    zIndex: 100,
    height,
    width: height,
    backgroundColor: '#606060',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '20%',
  },
  text: {
    color: '#d3d3d3',
    fontSize: 12,
  },
});
