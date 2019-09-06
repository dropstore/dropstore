/* @flow */
import React, { PureComponent } from 'react';
import { Text } from 'react-native';

type Props = {
  finish: Function,
  time: number,
  style: Object
};

const maxTime = 24 * 3600;

export default class CountdownCom extends PureComponent<Props> {
  constructor(props) {
    super(props);
    const { time } = this.props;
    const timer = time - Date.now() / 1000;
    this.state = {
      text: timer > maxTime ? '即将开始' : timer < 1 ? '已结束' : this.formatTime(timer),
    };
  }

  componentDidMount() {
    const { time } = this.props;
    if (time - Date.now() / 1000 < maxTime) {
      this.timeInterval = setInterval(() => {
        const timer = time - Date.now() / 1000;
        if (timer < 1) {
          const { finish } = this.props;
          finish();
          return;
        }
        const text = this.formatTime(timer);
        this.setState({ text });
      }, 1000);
    }
  }

  componentWillUnmount() {
    this.timeInterval && clearInterval(this.timeInterval);
  }

  formatTime = timer => `${parseInt(timer / 36000).toString().padStart(2, 0)}:${
    parseInt((timer % 3600) / 60).toString().padStart(2, 0)}:${
    parseInt(timer % 60).toString().padStart(2, 0)}`

  render() {
    const { style } = this.props;
    const { text } = this.state;
    const noTimer = ['已结束', '即将开始'].includes(text);
    return (
      <Text style={{
        fontSize: noTimer ? style.fontSize * 0.86 : style.fontSize,
        color: noTimer ? '#666' : '#000',
        width: noTimer ? 57 : 70,
        textAlign: 'right',
        ...style,
      }}
      >
        {text}
      </Text>
    );
  }
}
