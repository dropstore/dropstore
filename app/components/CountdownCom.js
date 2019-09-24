/* @flow */
import React, { PureComponent } from 'react';
import { Text, View, Platform } from 'react-native';
import { Normal, Mario } from '../res/FontFamily';
import { MAX_TIME } from '../common/Constant';

type Props = {
  finish: Function,
  time: number,
  style: Object,
  prefixStyle: Object,
  prefix: String
};

export default class CountdownCom extends PureComponent<Props> {
  constructor(props) {
    super(props);
    const { time } = this.props;
    const timer = time - Date.now() / 1000;
    this.state = {
      text: timer > MAX_TIME ? '即将开始' : timer < 1 ? '已结束' : this.formatTime(timer || 0),
    };
    if (timer < MAX_TIME && timer > 1) {
      this.needTimer = true;
    }
    this.timeInterval = null;
  }

  componentDidMount() {
    const { time } = this.props;
    this.needTimer && this.start(time);
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
        const timer = time - Date.now() / 1000;
        if (timer < 1) {
          const {
            finish, isStart, startTime, endTime,
          } = this.props;
          finish && finish();
          this.clear();
          if (isStart || endTime === startTime) {
            this.setState({ text: '已结束' });
            return;
          }
        }
        const text = this.formatTime(timer);
        this.setState({ text });
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
    const { text } = this.state;
    const noTimer = ['已结束', '即将开始'].includes(text);
    const fontSize = style.fontSize || 14;
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
        {prefix && <Text style={{ ...(prefixStyle || style), padding: 0, includeFontPadding: false }}>{prefix}</Text>}
        <Text style={{
          color: noTimer ? '#666' : '#000',
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
