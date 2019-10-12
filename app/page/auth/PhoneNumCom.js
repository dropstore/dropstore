import React, { PureComponent } from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextInputMask from 'react-native-text-input-mask';
import { wPx2P } from '../../utils/ScreenUtil';
import { debounce } from '../../utils/commonUtils';
import { showToast } from '../../utils/MutualUtil';
import { sendMessage } from '../../redux/actions/userInfo';
import { YaHei } from '../../res/FontFamily';
import { getUserInfo } from '../../redux/reselect/userInfo';

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
    this.state = {
      mobile: '',
      timer: null,
      code: '',
    };
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  onChange = (formatted, mobile) => {
    const { code, mobile: lastMobile } = this.state;
    const { finished, unfinished } = this.props;
    if (mobile.length === 11) {
      const { userInfo: { sendPhone, sendTime } } = this.props;
      if (sendPhone === mobile && Date.now() - sendTime < 60000) {
        this.startTimer(true);
      } else {
        this.clearInterval();
        this.setState({ timer: null });
      }
    }
    if (code.length === 6) {
      if (mobile.length === 11) {
        finished(mobile, code);
      } else if (lastMobile.length > mobile.length) {
        unfinished();
      }
    }
    this.setState({ mobile });
  }

  onChangeText = (formatted, code) => {
    const { finished, unfinished } = this.props;
    const { mobile, code: lastCode } = this.state;
    if (code.length === 6 && mobile.length === 11) {
      finished(mobile, code);
    } else if (lastCode.length > code.length) {
      unfinished();
    }
    this.setState({ code });
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
    const { timer, code, mobile } = this.state;
    return (
      <View>
        <View style={styles.wrapper}>
          <Text style={styles.text}>手机号</Text>
          <View style={styles.inputWrapper}>
            {mobile.length === 0 && <Text style={styles.placeholder}>输入手机号</Text>}
            <TextInputMask
              style={styles.phoneInput}
              clearButtonMode="while-editing"
              onChangeText={this.onChange}
              mask="[000] [0000] [0000]"
              keyboardType="number-pad"
              selectionColor="#00AEFF"
              underlineColorAndroid="transparent"
            />
          </View>
        </View>
        <View style={[styles.wrapper, { marginTop: 50 }]}>
          <Text style={styles.text}>验证码</Text>

          <View style={styles.inputWrapper}>
            {code.length === 0 && <Text style={styles.placeholder}>输入验证码</Text>}
            <TextInputMask
              style={styles.phoneInput}
              clearButtonMode="while-editing"
              onChangeText={this.onChangeText}
              mask="[000000]"
              keyboardType="number-pad"
              selectionColor="#3FCF77"
              underlineColorAndroid="transparent"
              ref={(v) => { this.codeInput = v; }}
            />
          </View>

          <TouchableOpacity onPress={debounce(this.toSendCode)}>
            <Text style={styles.login}>
              {`${timer ? `重发${timer}` : '获取验证码'}`}
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
    padding: 0,
    includeFontPadding: false,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: YaHei,
    marginBottom: 5,
  },
  inputWrapper: {
    flex: 1,
    marginLeft: 25,
    height: 25,
  },
  placeholder: {
    color: '#E4E4EE',
    fontSize: 12,
    position: 'absolute',
    top: 4,
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
    width: wPx2P(304),
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
