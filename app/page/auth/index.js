import React, { PureComponent } from 'react';
import {
  Text, View, StyleSheet, TextInput, ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import Image from '../../components/Image';
import ImageBackground from '../../components/ImageBackground';
import Images from '../../res/Images';
import { wPx2p, hPx2P } from '../../utils/ScreenUtil';
import { debounce } from '../../utils/commonUtils';
import { PADDING_TAB } from '../../common/Constant';
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

class AuthLoading extends PureComponent {
  constructor(props) {
    super(props);
    this.phone = '';
    this.state = {
      phone: '',
      message: null,
      showLoading: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    AsyncStorage.getItem('token').then((res) => {
      if (res) {
        // navigation.navigate('Main');
        SplashScreen.hide();
      } else {
        SplashScreen.hide();
      }
    }).catch(() => {
      navigation.navigate('Main');
      SplashScreen.hide();
    });
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
      this.setState({ phone, message: null });
    } else {
      this.setState({ phone });
    }
  }

  toInputNum =() => {
    const { userInfo, sendMessage, navigation } = this.props;
    const { message } = this.state;
    const phone = this.phone.replace(/\s/g, '');
    // if (!/^(0|86|17951)?1[0-9]{10}$/.test(phone)) {
    //   this.setState({ message: '手机号格式错误，请重新输入' });
    //   return;
    // }
    let sendTime = Date.now();
    const newPhone = userInfo.sendPhone !== phone;
    if (newPhone) {
      sendTime = 0;
    }
    if (((Date.now() - userInfo.sendTime > 60000 || userInfo.sendTime === 0) && !newPhone) || newPhone) {
      sendMessage();
      // sendMessage(phone, sendTime).then(() => {
      //   navigation.push('InputNum', {
      //     vendorId: this.vendorId,
      //     params: { phone, allPhone: this.phone, newPhone },
      //   });
      // }).catch(() => {});
    } else if (!message && !userInfo.errorMessage) {
      navigation.push('InputNum', {
        vendorId: this.vendorId,
        params: { phone, allPhone: this.phone, newPhone },
      });
    }
  }

  render() {
    const { message, phone, showLoading } = this.state;
    return (
      <View style={styles.container}>
        <Image resizeMode="contain" source={Images.drop} style={styles.drop} />
        <ImageBackground source={Images.framePhoneInput} style={styles.framePhoneInput}>
          <TextInput
            maxLength={13}
            keyboardType="number-pad"
            placeholder="请输入手机号码"
            placeholderTextColor="#d3d3d3"
            underlineColorAndroid="transparent"
            style={styles.phoneInput}
            clearButtonMode="while-editing"
            ref={(v) => { this.valueInput = v; }}
            onChange={this.onChange}
            onSubmitEditing={debounce(this.toInputNum)}
          />
        </ImageBackground>
        {
          message
            ? (
              <View style={styles.errorMessage}>
                <Text style={styles.errorIcon}>!</Text>
                <Text style={{ color: '#ff6200', fontSize: 12, marginLeft: 5 }}>{message}</Text>
              </View>
            ) : <View style={{ height: hPx2P(16.5), marginTop: hPx2P(8) }} />
        }
        <ImageBackground
          onPress={debounce(this.toInputNum)}
          source={Images.frameLogin}
          style={styles.frameLogin}
          disabled={phone.length === 0}
        >
          <Text style={styles.login}>获取验证码</Text>
        </ImageBackground>
        { showLoading && <ActivityIndicator size="large" style={styles.centering} /> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hPx2P(16.5),
    marginTop: hPx2P(8),
  },
  errorIcon: {
    fontSize: 10,
    backgroundColor: '#ff6200',
    borderRadius: 5.5,
    height: 11,
    width: 11,
    textAlign: 'center',
    lineHeight: 11,
    color: '#fff',
    overflow: 'hidden',
  },
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
    paddingBottom: hPx2P(36) + PADDING_TAB,
    backgroundColor: 'rgb(246,246,246)',
  },
  drop: {
    height: wPx2p(103),
    width: wPx2p(191),
  },
  framePhoneInput: {
    height: wPx2p(51),
    width: wPx2p(229),
    marginTop: hPx2P(93),
  },
  frameLogin: {
    height: wPx2p(51),
    width: wPx2p(229),
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneInput: {
    flex: 1,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  login: {
    color: '#fff',
    fontSize: 16,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);
