import React, { PureComponent } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';
import {
  PADDING_TAB, getScreenWidth, getScreenHeight,
} from '../../common/Constant';
import PhoneNumCom from './PhoneNumCom';
import Colors from '../../res/Colors';
import { mobileBind } from '../../redux/actions/userInfo';
import { Image, KeyboardDismiss } from '../../components';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    mobileBind,
  }, dispatch);
}

class PhoneNum extends PureComponent {
  constructor(props) {
    super(props);
    this.mobile = '';
    this.state = {
      disabled: true,
    };
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.pop();
  }

  goNext = () => {
    const { navigation, mobileBind } = this.props;
    mobileBind(this.mobile, this.code).then(() => {
      navigation.navigate('NameAge');
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

  render() {
    const { disabled } = this.state;
    return (
      <KeyboardDismiss style={styles.container}>
        <Image resizeMode="contain" source={require('../../res/image/logo.png')} style={styles.logo} />
        <PhoneNumCom bindPhone finished={this.finished} unfinished={this.unfinished} />
        <TouchableOpacity
          disabled={disabled}
          style={[styles.frameLogin, { backgroundColor: disabled ? Colors.DISABLE : Colors.YELLOW }]}
          onPress={this.goNext}
        >
          <Text style={styles.nextText}>绑定手机</Text>
        </TouchableOpacity>
      </KeyboardDismiss>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: getScreenHeight(),
    width: getScreenWidth(),
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    height: wPx2P(114),
    width: wPx2P(108),
    marginBottom: hPx2P(50),
    marginTop: hPx2P(55),
  },
  frameLogin: {
    height: wPx2P(43),
    width: wPx2P(304),
    alignItems: 'center',
    marginTop: hPx2P(34),
    justifyContent: 'center',
    borderRadius: 2,
    overflow: 'hidden',
  },
  phoneNum: {
    width: wPx2P(307),
    height: wPx2P(92),
  },
  frameBlack: {
    flexDirection: 'row',
    bottom: hPx2P(34 + PADDING_TAB),
    position: 'absolute',
    height: wPx2P(48),
    width: wPx2P(244),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    overflow: 'hidden',
  },
  bottom: {
    flexDirection: 'row',
    bottom: hPx2P(24 + PADDING_TAB),
    position: 'absolute',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default connect(null, mapDispatchToProps)(PhoneNum);
