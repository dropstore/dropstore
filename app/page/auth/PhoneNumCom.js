import React, { PureComponent } from 'react';
import {
  Text, View, StyleSheet, TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toast } from 'teaset';
import ImageBackground from '../../components/ImageBackground';
import Images from '../../res/Images';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';
import { debounce } from '../../utils/commonUtils';
import { sendMessage } from '../../redux/actions/userInfo';
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
    this.mobile = '';
    this.code = '';
    this.state = {
      mobile: '',
      timer: null,
    };
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  onChange = (event) => {
    const mobile = event.nativeEvent.text;
    let str = '';
    if (mobile.length === 4 && this.mobile.length < mobile.length) {
      str = `${mobile.substring(0, 3)} ${mobile.substring(3, 7)}`;
    } else if (mobile.length === 8 && this.mobile.length < mobile.length) {
      str = `${mobile.substring(0, 8)} ${mobile.substring(8, 12)}`;
    } else {
      str = mobile;
    }
    this.mobile = str;
    if (this.valueInput) {
      this.valueInput.setNativeProps({ text: str });
    }
    if (mobile.length === 0) {
      this.setState({ mobile });
    } else {
      this.setState({ mobile });
      if (/^(0|86|17951)?1[0-9]{10}$/.test(mobile.replace(/\s/g, ''))) {
        this.toSendCode();
      }
    }
  }

  onChangeText = (code) => {
    const { finished, unfinished } = this.props;
    if (code.length === 6) {
      finished(this.mobile.replace(/\s/g, ''), code);
    } else if (this.code.length === 6 && code.length === 5) {
      unfinished();
    }
    this.code = code;
  }

  toSendCode =() => {
    const { userInfo, sendMessage } = this.props;
    const mobile = this.mobile.replace(/\s/g, '');
    if (!/^(0|86|17951)?1[0-9]{10}$/.test(mobile)) {
      Toast.show({ text: '手机号格式错误，请重新输入' });
      return;
    }
    if ((Date.now() - userInfo.sendTime > 60000) || userInfo.sendPhone !== mobile) {
      sendMessage(mobile, Date.now()).then(() => {
        Toast.show({ text: `验证码已发送至${mobile}` });
        this.startTimer();
      });
    }
  }

  clearInterval = () => {
    this.intervalTimer && clearInterval(this.intervalTimer);
  }

  startTimer = (samePhone) => {
    if (!samePhone) {
      this.clearInterval();
    }
    const { userInfo } = this.props;
    const time = Math.min(parseInt((5900 - Date.now() + userInfo.sendTime) / 1000), 59);
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
    const { mobile, timer } = this.state;
    const sendDisabled = mobile.length !== 13 || !!timer;
    return (
      <View>
        <ImageBackground source={Images.framePhoneInput} style={styles.framePhoneInput}>
          <TextInput
            maxLength={13}
            keyboardType="number-pad"
            placeholder="手机号码_"
            placeholderTextColor="#d3d3d3"
            underlineColorAndroid="transparent"
            style={styles.phoneInput}
            clearButtonMode="while-editing"
            ref={(v) => { this.valueInput = v; }}
            onChange={this.onChange}
          />
        </ImageBackground>
        <View style={styles.verifiCodeWrapper}>
          <ImageBackground source={Images.verifiCode} style={styles.verifiCode}>
            <TextInput
              maxLength={6}
              keyboardType="number-pad"
              placeholder="验证码_"
              placeholderTextColor="#d3d3d3"
              underlineColorAndroid="transparent"
              style={styles.phoneInput}
              clearButtonMode="while-editing"
              onChangeText={this.onChangeText}
            />
          </ImageBackground>
          <ImageBackground
            onPress={debounce(this.toSendCode)}
            source={sendDisabled ? Images.inSendVerifiCode : Images.sendVerifiCode}
            style={styles.sendVerifiCode}
            disabled={sendDisabled}
          >
            <Text style={styles.login}>
              {`${timer ? `${timer}s` : '发送验证码'}`}
            </Text>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  framePhoneInput: {
    height: wPx2P(51),
    width: wPx2P(240),
    marginTop: hPx2P(65),
  },
  phoneInput: {
    flex: 1,
    marginRight: 8,
    marginLeft: 16,
    color: '#666',
  },
  login: {
    color: '#fff',
    fontSize: 16,
  },
  verifiCodeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiCode: {
    height: wPx2P(39),
    width: wPx2P(116),
    marginRight: wPx2P(10),
  },
  sendVerifiCode: {
    height: wPx2P(34),
    width: wPx2P(113),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumCom);
