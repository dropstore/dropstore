import React, { PureComponent } from 'react';
import {
  Animated, View, PanResponder, Text, StyleSheet, ActivityIndicator,
} from 'react-native';
import { SCREEN_HEIGHT } from '../common/Constant';
import Image from './Image';
import Colors from '../res/Colors';
import Images from '../res/Images';

const THRESHOLD = 75;

export default class PullToRefresh extends PureComponent {
  constructor(props) {
    super(props);
    this.containerTranslateY = new Animated.Value(0);
    this.refreshing = false;
    this.innerScrollTop = 0;
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (this.refreshing) {
          return false;
        }
        if (this.innerScrollTop <= THRESHOLD && gestureState.dy > 0) {
          return true;
        }
        return false;
      },
      onPanResponderMove: Animated.event([null, { dy: this.containerTranslateY }]),
      onPanResponderRelease: () => {
        if (this.containerTranslateY._value >= THRESHOLD) {
          this.startRefresh();
          const { onRefresh } = this.props;
          onRefresh();
        } else {
          this.resetContainerPosition();
        }
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderTerminate: () => {
        this.resetContainerPosition();
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    const { totalPages } = this.props;
    if (totalPages === -1 && nextProps.totalPages > -1) {
      this.resetContainerPosition();
    }
  }

  resetContainerPosition = () => {
    this.refreshing = false;
    Animated.timing(
      this.containerTranslateY,
      {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      },
    ).start();
  }

  startRefresh = () => {
    this.refreshing = true;
    Animated.timing(
      this.containerTranslateY,
      {
        toValue: THRESHOLD,
        duration: 250,
        useNativeDriver: true,
      },
    ).start();
  }

  innerScrollCallback = (event) => {
    this.innerScrollTop = event.nativeEvent.contentOffset.y;
  }

  renderHeader = (translateY) => {
    const style = {
      position: 'absolute',
      width: '100%',
      top: -THRESHOLD / 2,
      height: THRESHOLD / 2,
      transform: [{ translateY }],
      justifyContent: 'center',
    };
    return (
      <Animated.View style={style}>
        <ActivityIndicator color={Colors.OTHER_BACK} />
      </Animated.View>
    );
  }

  renderFooter = () => {
    const { totalPages, currentPage } = this.props;
    if (totalPages === currentPage && totalPages > 0) {
      return (
        <View style={styles.loadingFooter}>
          <Text style={styles.loadingText}>没有更多了</Text>
        </View>
      );
    }
    return (
      <View style={styles.loadingFooter}>
        <Text style={styles.loadingText}>加载中</Text>
        <Image source={Images.loading} style={styles.loadingGif} />
      </View>
    );
  }

  render() {
    const { children, renderFooter } = this.props;
    const child = React.cloneElement(children, {
      // bounces: false,
      // alwaysBounceVertical: false,
      onScroll: this.innerScrollCallback,
      scrollEventThrottle: 1,
      ListFooterComponent: renderFooter || this.renderFooter,
    });
    const translateY = this.containerTranslateY.interpolate({
      inputRange: [0, 75, SCREEN_HEIGHT],
      outputRange: [0, 37.5, SCREEN_HEIGHT / 5],
      extrapolate: 'clamp',
    });
    return (
      <View style={{ flex: 1 }} {...this._panResponder.panHandlers}>
        <Animated.View style={[{ flex: 1, transform: [{ translateY }] }]}>
          {child}
        </Animated.View>
        {this.renderHeader(translateY)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 60,
    paddingBottom: 20,
    // borderTopColor: Colors.NORMAL_TEXT_E5,
    // borderTopWidth: StyleSheet.hairlineWidth,
  },
  loadingText: {
    fontSize: 12,
    color: Colors.NORMAL_TEXT_6,
  },
  loadingGif: {
    width: 23,
    height: 5,
    marginLeft: 6,
  },
});
