import React, { PureComponent } from 'react';
import {
  Text, View, StyleSheet, TextInput, ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toast } from 'teaset';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import Image from '../../components/Image';
import ImageBackground from '../../components/ImageBackground';
import Images from '../../res/Images';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';
import { debounce } from '../../utils/commonUtils';
import { PADDING_TAB } from '../../common/Constant';
import { sendMessage, messageAuth } from '../../redux/actions/userInfo';
import { getUserInfo } from '../../redux/reselect/userInfo';

function mapStateToProps() {
  return state => ({
    userInfo: getUserInfo(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    sendMessage,
    messageAuth,
  }, dispatch);
}

class AuthLoading extends PureComponent {
  constructor(props) {
    super(props);
    this.phone = '';
    this.state = {
      code: '',
      phone: '',
      showLoading: false,
      timer: null,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    AsyncStorage.getItem('token').then((res) => {
      if (res) {
        navigation.navigate('Main');
        SplashScreen.hide();
      } else {
        SplashScreen.hide();
      }
    }).catch(() => {
      navigation.navigate('Main');
      SplashScreen.hide();
    });
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  onChange = (event) => {
    const phone = event.nativeEvent.text;
    let str = '';
    if (phone.length === 4 && this.phone.length < phone.length) {
      str = `${phone.substring(0, 3)} ${phone.substring(3, 7)}`;
    } else if (phone.length === 8 && this.phone.length < phone.length) {
      str = `${phone.substring(0, 8)} ${phone.substring(8, 12)}`;
    } else {
      str = phone;
    }
    this.phone = str;
    if (this.valueInput) {
      this.valueInput.setNativeProps({ text: str });
    }
    if (phone.length === 0) {
      this.setState({ phone });
    } else {
      this.setState({ phone });
      if (/^(0|86|17951)?1[0-9]{10}$/.test(phone.replace(/\s/g, ''))) {
        this.toSendCode();
      }
    }
  }

  onChangeText = (code) => {
    this.setState({ code });
  }

  toSendCode =() => {
    const { userInfo, sendMessage } = this.props;
    const phone = this.phone.replace(/\s/g, '');
    if (!/^(0|86|17951)?1[0-9]{10}$/.test(phone)) {
      Toast.show({ text: '手机号格式错误，请重新输入' });
      return;
    }
    if ((Date.now() - userInfo.sendTime > 60000) || userInfo.sendPhone !== phone) {
      sendMessage(phone, Date.now()).then(() => {
        Toast.show({ text: `验证码已发送至${phone}` });
        this.startTimer();
      });
    }
  }

  toLogin = () => {
    const { messageAuth, navigation } = this.props;
    const { code } = this.state;
    const phone = this.phone.replace(/\s/g, '');
    messageAuth(phone, code).then((token) => {
      AsyncStorage.setItem('token', token);
      navigation.push('NameAge');
    });
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
    const {
      phone, showLoading, code, timer,
    } = this.state;
    const sendDisabled = phone.length === 0 || !!timer;
    const loginDisabled = code.length !== 6 || this.phone.replace(/\s/g, '').length !== 11;
    return (
      <View style={styles.container}>
        <Image resizeMode="contain" source={Images.drop} style={styles.drop} />
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
            onSubmitEditing={debounce(this.toSendCode)}
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

        <ImageBackground
          onPress={this.toLogin}
          source={loginDisabled ? Images.frameInLogin : Images.frameLogin}
          style={styles.frameLogin}
          disabled={loginDisabled}
        >
          <Text style={styles.login}>登陆</Text>
        </ImageBackground>
        <View style={styles.thirdWrapper}>
          <ImageBackground
            onPress={() => {}}
            source={Images.wxLogin}
            style={styles.wechat}
          />
        </View>
        { showLoading && <ActivityIndicator size="large" style={styles.centering} /> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000AA',
    zIndex: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: hPx2P(114),
    backgroundColor: 'rgb(246,246,246)',
    position: 'relative',
  },
  drop: {
    height: wPx2P(103),
    width: wPx2P(191),
  },
  framePhoneInput: {
    height: wPx2P(51),
    width: wPx2P(240),
    marginTop: hPx2P(80),
  },
  frameLogin: {
    height: wPx2P(51),
    width: wPx2P(229),
    alignItems: 'center',
    marginTop: hPx2P(51),
    justifyContent: 'center',
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
  thirdWrapper: {
    position: 'absolute',
    bottom: hPx2P(36 + PADDING_TAB),
  },
  wechat: {
    height: wPx2P(46),
    width: wPx2P(46),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);
