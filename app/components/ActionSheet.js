/* @flow */
/* ActionSheet组件，解决第三方插件在安卓某些机型上显示位置不对 */
import React, { PureComponent } from 'react';
import {
  ActionSheetIOS, Platform, TouchableOpacity, Text, StyleSheet, View, TouchableWithoutFeedback,
} from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../common/Constant';

type Props = {
  options: Object,
  cancelButtonIndex: number,
  onPress: Function,
}

type State = {
  isShow: boolean,
}

class ActionSheet extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isShow: false,
    };
  }

  show = () => {
    if (Platform.OS === 'ios') {
      const { options, onPress, cancelButtonIndex } = this.props;
      ActionSheetIOS.showActionSheetWithOptions({
        options,
        cancelButtonIndex,
      }, onPress);
      return;
    }
    this.setState({ isShow: true });
  }

  cancel = () => {
    this.setState({ isShow: false });
  }

  onPress = (index: number) => {
    const { cancelButtonIndex, onPress } = this.props;
    if (index === cancelButtonIndex) {
      this.cancel();
    } else {
      onPress(index);
    }
  }

  render() {
    const { isShow } = this.state;
    if (Platform.OS === 'ios' || !isShow) {
      return null;
    }
    const { options, cancelButtonIndex } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.cancel}>
        <View style={[styles.wrapper, { height: SCREEN_HEIGHT, width: SCREEN_WIDTH }]}>
          <View style={{ backgroundColor: '#eee' }}>
            {
              options.map((v, i) => {
                const cancelButton = i === cancelButtonIndex;
                return (
                  <TouchableOpacity
                    onPress={() => this.onPress(i)}
                    key={v}
                    style={{ backgroundColor: '#eee', paddingTop: cancelButton ? 5 : StyleSheet.hairlineWidth }}
                  >
                    <Text style={styles.text} key={v}>{v}</Text>
                  </TouchableOpacity>
                );
              })
            }
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  text: {
    fontSize: 16,
    color: '#007aff',
    height: 48,
    lineHeight: 48,
    backgroundColor: '#fff',
    width: SCREEN_WIDTH,
    textAlign: 'center',
  },
});

export default ActionSheet;
