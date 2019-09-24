import React, { PureComponent } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Images from '../../res/Images';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';
import { PADDING_TAB } from '../../common/Constant';
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
        <Image style={styles.phoneNum} source={Images.phoneNum} />
        <PhoneNumCom bindPhone finished={this.finished} unfinished={this.unfinished} />
        <TouchableOpacity
          disabled={disabled}
          style={[styles.frameBlack, { backgroundColor: disabled ? '#C7C7C7' : Colors.OTHER_BACK }]}
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
    flex: 1,
    alignItems: 'center',
    paddingTop: hPx2P(115),
    backgroundColor: Colors.MAIN_BACK,
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
