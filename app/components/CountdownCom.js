/* @flow */
import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
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
    const {
      time, notStartTimerText, endTimerText, noMax,
    } = this.props;
    const diff = time - Date.now() / 1000;
    const noTimer = (diff > MAX_TIME || diff < 1) && !noMax;
    let text = '';
    if (diff > MAX_TIME && !noMax) {
      text = notStartTimerText;
    } else if (diff < 1) {
      text = endTimerText;
    } else {
      text = this.formatTime(diff || 0);
    }
    this.state = {
      text,
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
    const { noMax } = this.props;
    if (time - Date.now() / 1000 < MAX_TIME || noMax) {
      this.timeInterval = setInterval(() => {
        const diff = time - Date.now() / 1000;
        if (diff < 1) {
          const { finish, endTimerText, hasNextTimer } = this.props;
          finish && finish();
          this.clear();
          this.setState({ text: hasNextTimer ? this.formatTime(0) : endTimerText });
        } else {
          const text = this.formatTime(diff);
          this.setState({ text });
        }
      }, 1000);
    }
  }

  formatTime = (timer) => {
    const { format = 'hh : mm : ss' } = this.props;
    const dd = parseInt(timer / 3600 / 24).toString().padStart(2, 0);
    const hh = parseInt((timer % (3600 * 24)) / 3600).toString().padStart(2, 0);
    const mm = parseInt((timer % 3600) / 60).toString().padStart(2, 0);
    const ss = parseInt(timer % 60).toString().padStart(2, 0);
    return format.replace('dd', dd).replace('hh', hh).replace('mm', mm).replace('ss', ss);
  }

  render() {
    const {
      style, prefix, prefixStyle,
    } = this.props;
    const { text } = this.state;
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
        {prefix && <Text style={prefixStyle || style}>{prefix}</Text>}
        <Text style={{ textAlign: 'right', ...style }}>
          {text}
        </Text>
      </View>
    );
  }
}
