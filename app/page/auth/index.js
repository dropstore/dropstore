import React, { PureComponent } from 'react';
import {
  Text, View, StyleSheet, ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { Image, ImageBackground, KeyboardDismiss } from '../../components';
import Images from '../../res/Images';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';
import { PADDING_TAB, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../common/Constant';
import { messageAuth, weChatAuth, getUser } from '../../redux/actions/userInfo';
import PhoneNumCom from './PhoneNumCom';
import ModalTreaty from './ModalTreaty';
import { getUserInfo } from '../../redux/reselect/userInfo';

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
    if (require('../../../app.json').needLogin) {
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
    } else {
      navigation.navigate('Main');
      SplashScreen.hide();
    }
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
          <ImageBackground
            onPress={this.toLogin}
            source={disabled ? Images.frameInLogin : Images.frameLogin}
            style={styles.frameLogin}
            disabled={disabled}
          >
            <Text style={styles.login}>登陆</Text>
          </ImageBackground>
        </View>

        <View style={styles.thirdWrapper}>
          <ImageBackground
            onPress={() => this.auth(2)}
            source={Images.wxLogin}
            style={styles.wechat}
          />
        </View>
        { showLoading && <ActivityIndicator size="large" style={styles.centering} /> }

        { showTreaty && <ModalTreaty closeTreaty={this.closeTreaty} navigation={navigation} close={this.closeTreaty} /> }
      </KeyboardDismiss>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    paddingTop: hPx2P(114),
    backgroundColor: 'rgb(246,246,246)',
    position: 'relative',
    justifyContent: 'space-between',
  },
  drop: {
    height: wPx2P(103),
    width: wPx2P(191),
  },
  frameLogin: {
    height: wPx2P(51),
    width: wPx2P(229),
    alignItems: 'center',
    marginTop: hPx2P(51),
    justifyContent: 'center',
  },
  login: {
    color: '#fff',
    fontSize: 16,
  },
  thirdWrapper: {
    marginBottom: hPx2P(36 + PADDING_TAB),
  },
  wechat: {
    height: wPx2P(46),
    width: wPx2P(46),
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
