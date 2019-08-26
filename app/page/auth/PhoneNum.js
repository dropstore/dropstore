import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Image from '../../components/Image';
import KeyboardDismiss from '../../components/KeyboardDismiss';
import Images from '../../res/Images';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';
import ImageBackground from '../../components/ImageBackground';
import { PADDING_TAB } from '../../common/Constant';
import { showToast } from '../../utils/MutualUtil';
import PhoneNumCom from './PhoneNumCom';
import { messageAuth } from '../../redux/actions/userInfo';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    messageAuth,
  }, dispatch);
}

class PhoneNum extends PureComponent {
  goBack = () => {
    const { navigation } = this.props;
    navigation.pop();
  }

  goNext = () => {
    const { navigation, messageAuth } = this.props;
    if (this.disabled) {
      showToast('请输入验证码');
    } else {
      messageAuth(this.mobile, this.code).then(() => {
        navigation.push('NameAge');
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
        <PhoneNumCom finished={this.finished} unfinished={this.unfinished} />
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
    flex: 1,
    alignItems: 'center',
    paddingTop: hPx2P(125),
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
