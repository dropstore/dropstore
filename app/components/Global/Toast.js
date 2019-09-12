import React, { PureComponent } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { PADDING_TAB } from '../../common/Constant';

export default class Toast extends PureComponent {
  constructor(props) {
    super(props);
    this.opacity = new Animated.Value(0);
  }

  componentDidMount() {
    const { onClosed } = this.props;
    Animated.sequence([
      Animated.timing(
        this.opacity,
        {
          toValue: 0.98,
          duration: 250,
          useNativeDriver: true,
        },
      ),
      Animated.timing(
        this.opacity,
        {
          toValue: 0.95,
          duration: 1500,
          useNativeDriver: true,
        },
      ),
      Animated.timing(
        this.opacity,
        {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        },
      ),
    ]).start(() => {
      onClosed();
    });
  }

  render() {
    const { data } = this.props;
    return (
      <Animated.View style={[styles.style, { opacity: this.opacity }]}>
        <Text style={{ color: '#d3d3d3', fontSize: 12 }}>{data}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  style: {
    alignSelf: 'center',
    backgroundColor: '#606060',
    width: 243,
    height: 45,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100 + PADDING_TAB,
  },
});
