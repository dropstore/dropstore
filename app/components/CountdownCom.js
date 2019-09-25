/* @flow */
import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { Normal, Mario } from '../res/FontFamily';
import { MAX_TIME } from '../common/Constant';

type Props = {
  finish: Function,
  time: number,
  style: Object,
  prefixStyle: Object,
  prefix: String,
  notStartTimerText?: String,
  endTimerText?: String,
  hasNextTimer?: Boolean,
};

export default class CountdownCom extends PureComponent<Props> {
  static defaultProps = {
    notStartTimerText: '',
    endTimerText: '',
    hasNextTimer: false,
  }

  constructor(props) {
    super(props);
    const { time, notStartTimerText, endTimerText } = this.props;
    const diff = time - Date.now() / 1000;
    const noTimer = diff > MAX_TIME || diff < 1;
    this.state = {
      text: diff > MAX_TIME ? notStartTimerText : diff < 1 ? endTimerText : this.formatTime(diff || 0),
      noTimer,
    };
    this.timeInterval = null;
    noTimer || this.start(time);
  }

  componentWillReceiveProps(nextProps) {
    const { time } = this.props;
    if (time !== nextProps.time) {
      setTimeout(() => this.start(nextProps.time));
    }
  }

  componentWillUnmount() {
    this.clear();
  }

  clear = () => {
    this.timeInterval && clearInterval(this.timeInterval);
  }

  start = (time) => {
    this.clear();
    if (time - Date.now() / 1000 < MAX_TIME) {
      this.timeInterval = setInterval(() => {
        const diff = time - Date.now() / 1000;
        if (diff < 1) {
          const { finish, endTimerText, hasNextTimer } = this.props;
          finish && finish();
          this.clear();
          this.setState({ text: hasNextTimer ? this.formatTime(0) : endTimerText, noTimer: !hasNextTimer });
        } else {
          const text = this.formatTime(diff);
          this.setState({ text, noTimer: false });
        }
      }, 1000);
    }
  }

  formatTime = timer => `${parseInt(timer / 3600).toString().padStart(2, 0)}：${
    parseInt((timer % 3600) / 60).toString().padStart(2, 0)}：${
    parseInt(timer % 60).toString().padStart(2, 0)}`

  render() {
    const {
      style, prefix, prefixStyle, offset,
    } = this.props;
    const { text, noTimer } = this.state;
    const fontSize = style.fontSize || 14;
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
        {prefix && !noTimer && <Text style={{ ...(prefixStyle || style), padding: 0, includeFontPadding: false }}>{prefix}</Text>}
        <Text style={{
          color: noTimer ? '#333' : '#000',
          width: noTimer ? 'auto' : fontSize * 6.44,
          marginLeft: noTimer ? 8 : 0,
          textAlign: 'right',
          padding: 0,
          top: offset || (noTimer || style.fontFamily !== Mario) ? 0 : fontSize * 0.09,
          includeFontPadding: false,
          ...style,
          fontSize: noTimer ? fontSize * 0.86 : fontSize,
          fontFamily: noTimer ? Normal : (style.fontFamily || Normal),
        }}
        >
          {text}
        </Text>
      </View>
    );
  }
}
