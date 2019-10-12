import React, { PureComponent } from 'react';
import {
  Text, View, StyleSheet, TextInput, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextInputMask from 'react-native-text-input-mask';
import { wPx2P } from '../../utils/ScreenUtil';
import { debounce } from '../../utils/commonUtils';
import { showToast } from '../../utils/MutualUtil';
import { sendMessage } from '../../redux/actions/userInfo';
import { getUserInfo } from '../../redux/reselect/userInfo';
import { getScreenWidth } from '../../common/Constant';

function mapStateToProps() {
  return state => ({
    userInfo: getUserInfo(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    sendMessage,
  }, dispatch);
}

class PhoneNumCom extends PureComponent {
  constructor(props) {
    super(props);
    this.code = '';
    this.state = {
      mobile: '',
      timer: null,
    };
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  onChange = (formatted, mobile) => {
    if (mobile.length === 11) {
      const { userInfo: { sendPhone, sendTime } } = this.props;
      if (sendPhone === mobile && Date.now() - sendTime < 60000) {
        this.startTimer(true);
      } else {
        this.clearInterval();
        this.setState({ timer: null });
      }
    }
    this.setState({ mobile });
  }

  onChangeText = (code) => {
    const { finished, unfinished } = this.props;
    const { mobile } = this.state;
    if (code.length === 6) {
      finished(mobile.replace(/\s/g, ''), code);
    } else if (this.code.length > code.length) {
      unfinished();
    }
    this.code = code;
  }

  toSendCode =() => {
    const { userInfo, sendMessage, bindPhone } = this.props;
    const { mobile } = this.state;
    if (mobile.length < 11) {
      showToast('请输入正确的手机号码');
      return;
    }
    if ((Date.now() - userInfo.sendTime > 60000) || userInfo.sendPhone !== mobile) {
      sendMessage(bindPhone ? '/user/send_change_message' : '/user/send_message', mobile, Date.now()).then(() => {
        showToast(`验证码已发送至${mobile}`);
        this.startTimer();
        this.codeInput.focus();
      }).catch(() => this.clearInterval());
    }
  }

  clearInterval = () => {
    this.intervalTimer && clearInterval(this.intervalTimer);
  }

  startTimer = (samePhone) => {
    const { userInfo } = this.props;
    const time = Math.min(parseInt((59000 - Date.now() + userInfo.sendTime) / 1000), 59);
    this.setState({
      timer: samePhone ? time : 59,
    });
    this.intervalTimer = setInterval(() => {
      const { timer } = this.state;
      if (timer > 1) {
        this.setState({ timer: timer - 1 });
      } else {
        this.clearInterval();
        this.setState({ timer: null });
      }
    }, 1000);
  }

  render() {
    const { timer } = this.state;
    return (
      <View>
        <View style={styles.wrapper}>
          <Text style={styles.text}>手机号</Text>
          <TextInputMask
            style={styles.phoneInput}
            placeholder="输入手机号"
            clearButtonMode="while-editing"
            onChangeText={this.onChange}
            mask="[000] [0000] [0000]"
            keyboardType="number-pad"
            selectionColor="#3FCF77"
            placeholderTextColor="#d3d3d3"
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={[styles.wrapper, { marginTop: 50 }]}>
          <Text style={styles.text}>验证码</Text>
          <TextInput
            maxLength={6}
            keyboardType="number-pad"
            placeholder="输入验证码"
            placeholderTextColor="#d3d3d3"
            underlineColorAndroid="transparent"
            style={styles.phoneInput}
            selectionColor="#3FCF77"
            ref={(v) => { this.codeInput = v; }}
            clearButtonMode="while-editing"
            onChangeText={this.onChangeText}
          />
          <TouchableOpacity onPress={debounce(this.toSendCode)}>
            <Text style={styles.login}>
              {`${timer ? `${timer}s` : '获取验证码'}`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  phoneInput: {
    flex: 1,
    marginLeft: 25,
    color: '#666',
    padding: 0,
    fontSize: 12,
    includeFontPadding: false,
  },
  text: {
    fontSize: 12,
  },
  login: {
    fontSize: 12,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wPx2P(getScreenWidth() - 80),
    borderBottomColor: '#E4E4EE',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  verifiCode: {
    height: wPx2P(40),
    width: wPx2P(150),
    marginRight: wPx2P(10),
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  sendVerifiCode: {
    height: wPx2P(40),
    width: wPx2P(84),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    overflow: 'hidden',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumCom);
