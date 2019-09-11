import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Images from '../../res/Images';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';
import { PADDING_TAB, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../common/Constant';
import { showToast } from '../../utils/MutualUtil';
import PhoneNumCom from './PhoneNumCom';
import { mobileBind } from '../../redux/actions/userInfo';
import { Image, ImageBackground, KeyboardDismiss } from '../../components';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    mobileBind,
  }, dispatch);
}

class PhoneNum extends PureComponent {
  goBack = () => {
    const { navigation } = this.props;
    navigation.pop();
  }

  goNext = () => {
    const { navigation, mobileBind } = this.props;
    if (this.disabled) {
      showToast('请输入验证码');
    } else {
      mobileBind(this.mobile, this.code).then(() => {
        navigation.navigate('NameAge');
      });
    }
  }

  finished = (mobile, code) => {
    this.mobile = mobile;
    this.code = code;
    this.disabled = false;
  }

  unfinished = () => {
    this.disabled = true;
  }

  render() {
    return (
      <KeyboardDismiss style={styles.container}>
        <Image style={styles.phoneNum} source={Images.phoneNum} />
        <PhoneNumCom bindPhone finished={this.finished} unfinished={this.unfinished} />
        <View style={styles.bottom}>
          <ImageBackground source={Images.frameBlack} style={{ ...styles.frameBlack, marginRight: wPx2P(9) }} onPress={this.goBack}>
            <Text style={styles.nextText}>上一步</Text>
          </ImageBackground>
          <ImageBackground source={Images.frameRed} style={styles.frameBlack} onPress={this.goNext}>
            <Text style={styles.nextText}>下一步</Text>
          </ImageBackground>
        </View>
      </KeyboardDismiss>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    paddingTop: hPx2P(175),
  },
  phoneNum: {
    width: wPx2P(307),
    height: wPx2P(92),
  },
  frameBlack: {
    width: wPx2P(177),
    height: wPx2P(48),
    alignItems: 'center',
    justifyContent: 'center',
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
