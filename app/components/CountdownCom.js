/* @flow */
import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { Normal } from '../res/FontFamily';
import { MAX_TIME } from '../common/Constant';

type Props = {
  finish: Function,
  time: number,
  style: Object
};

export default class CountdownCom extends PureComponent<Props> {
  constructor(props) {
    super(props);
    const { time } = this.props;
    const timer = time - Date.now() / 1000;
    this.state = {
      text: timer > MAX_TIME ? '即将开始' : timer < 1 ? '已结束' : this.formatTime(timer),
    };
    this.timeInterval = null;
  }

  componentDidMount() {
    const { time } = this.props;
    this.start(time);
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
          const { finish, isStart } = this.props;
          finish();
          this.clear();
          if (isStart) {
            this.setState({ text: '已结束' });
            return;
          }
        }
        const text = this.formatTime(timer);
        this.setState({ text });
      }, 1000);
    }
  }

  formatTime = timer => `${parseInt(timer / 3600).toString().padStart(2, 0)}:${
    parseInt((timer % 3600) / 60).toString().padStart(2, 0)}:${
    parseInt(timer % 60).toString().padStart(2, 0)}`

  render() {
    const { style } = this.props;
    const { text } = this.state;
    const noTimer = ['已结束', '即将开始'].includes(text);
    return (
      <Text style={{
        color: noTimer ? '#666' : '#000',
        width: noTimer ? 'auto' : 70,
        marginLeft: noTimer ? 8 : 0,
        textAlign: 'right',
        ...style,
        fontSize: noTimer ? style.fontSize * 0.86 : style.fontSize,
        fontFamily: noTimer ? Normal : style.fontFamily,
      }}
      >
        {text}
      </Text>
    );
  }
}
