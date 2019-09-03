/* @flow */
import React, { PureComponent } from 'react';
import { Text } from 'react-native';

type Props = {
  finish: Function,
  time: number,
  style: Object
};

const maxTime = 24 * 360000;

export default class CountdownCom extends PureComponent<Props> {
  constructor(props) {
    super(props);
    const { time } = this.props;
    const timer = time - Date.now() / 1000;
    this.state = {
      text: timer < maxTime ? this.formatTime(timer) : '即将开始',
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
    return (
      <Text style={{
        ...style,
        fontSize: text === '即将开始' ? style.fontSize * 0.86 : style.fontSize,
        color: text === '即将开始' ? '#666' : '#000',
        width: text === '即将开始' ? 57 : 70,
      }}
      >
        {text}
      </Text>
    );
  }
}
