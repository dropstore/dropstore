import React, { PureComponent } from 'react';
import {
  Text, View, StyleSheet, ActivityIndicator, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { Image, ImageBackground, KeyboardDismiss } from '../../components';
import Images from '../../res/Images';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';
import { PADDING_TAB, getScreenWidth, getScreenHeight } from '../../common/Constant';
import { messageAuth, weChatAuth, getUser } from '../../redux/actions/userInfo';
import PhoneNumCom from './PhoneNumCom';
import ModalTreaty from './ModalTreaty';
import { getUserInfo } from '../../redux/reselect/userInfo';
import Colors from '../../res/Colors';

function mapStateToProps() {
  return state => ({
    userInfo: getUserInfo(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    messageAuth,
    weChatAuth,
    getUser,
  }, dispatch);
}

class AuthLoading extends PureComponent {
  constructor(props) {
    super(props);
    this.mobile = '';
    this.state = {
      disabled: true,
      showTreaty: false,
      showLoading: false,
    };
  }

  componentDidMount() {
    const { navigation, getUser } = this.props;
    AsyncStorage.multiGet(['token', 'aggredTreaty']).then((res) => {
      if (res[0][1]) {
        getUser(res[0][1]);
        navigation.navigate('Main');
        SplashScreen.hide();
      } else {
        SplashScreen.hide();
      }
      if (!res[1][1]) {
        this.setState({ showTreaty: true });
      }
    }).catch(() => {
      SplashScreen.hide();
    });
  }

  toLogin = () => {
    const { messageAuth, navigation } = this.props;
    messageAuth(this.mobile, this.code).then((isLogin) => {
      if (isLogin) {
        navigation.navigate('Main');
      } else {
        navigation.navigate('NameAge');
      }
    });
  }

  auth = (i) => {
    const { navigation, weChatAuth, userInfo } = this.props;
    weChatAuth(i).then((isLogin) => {
      if (isLogin) {
        navigation.navigate('Main');
      } else if (userInfo.mobile) {
        navigation.navigate('NameAge');
      } else {
        navigation.navigate('PhoneNum');
      }
    });
  }

  finished = (mobile, code) => {
    this.mobile = mobile;
    this.code = code;
    this.setState({ disabled: false });
  }

  unfinished = () => {
    this.setState({ disabled: true });
  }

  closeTreaty = () => {
    this.setState({ showTreaty: false });
  }

  render() {
    const { showLoading, disabled, showTreaty } = this.state;
    const { navigation } = this.props;

    return (
      <KeyboardDismiss style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Image resizeMode="contain" source={Images.drop} style={styles.drop} />
          <PhoneNumCom finished={this.finished} unfinished={this.unfinished} />
          <TouchableOpacity
            onPress={this.toLogin}
            style={[styles.frameLogin, { backgroundColor: disabled ? '#C7C7C7' : Colors.OTHER_BACK }]}
            disabled={disabled}
          >
            <Text style={styles.login}>登陆</Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={{ alignItems: 'center', marginHorizontal: wPx2P(51), flexDirection: 'row' }}>
            <View style={styles.hengxian} />
            <Text style={{ fontSize: 11, color: '#707479', marginHorizontal: wPx2P(11) }}>其他方式登录</Text>
            <View style={styles.hengxian} />
          </View>
          <View style={styles.thirdWrapper}>
            <ImageBackground
              onPress={() => this.auth(2)}
              source={require('../../res/image/wxLogin.png')}
              style={styles.wechat}
            />
          </View>
        </View>

        { showLoading && <ActivityIndicator size="large" style={styles.centering} /> }
        { showTreaty && <ModalTreaty closeTreaty={this.closeTreaty} navigation={navigation} close={this.closeTreaty} /> }
      </KeyboardDismiss>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: getScreenHeight(),
    width: getScreenWidth(),
    alignItems: 'center',
    paddingTop: hPx2P(114),
    backgroundColor: '#fff',
    position: 'relative',
    justifyContent: 'space-between',
  },
  hengxian: {
    flex: 1,
    height: 0.5,
    backgroundColor: '#EEEEF4',
  },
  drop: {
    height: wPx2P(103),
    width: wPx2P(191),
    marginBottom: hPx2P(55),
  },
  frameLogin: {
    height: wPx2P(48),
    width: wPx2P(244),
    alignItems: 'center',
    marginTop: hPx2P(46),
    justifyContent: 'center',
    borderRadius: 2,
    overflow: 'hidden',
  },
  login: {
    color: '#fff',
    fontSize: 16,
  },
  thirdWrapper: {
    marginBottom: hPx2P(60 + PADDING_TAB),
    marginTop: 13,
  },
  wechat: {
    height: wPx2P(47),
    width: wPx2P(47),
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
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);
