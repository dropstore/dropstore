import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TextInput,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Colors from '../../res/Colors';
import { updateUser, setPassword, updatePassword } from '../../redux/actions/userInfo';
import ImageBackground from '../../components/ImageBackground';
import Images from '../../res/Images';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';
import { getUserInfo } from '../../redux/reselect/userInfo';
import { showToast } from '../../utils/MutualUtil';
import { PADDING_TAB } from '../../common/Constant';
import KeyboardDismiss from '../../components/KeyboardDismiss';

function mapStateToProps() {
  return state => ({
    userInfo: getUserInfo(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUser, setPassword, updatePassword,
  }, dispatch);
}

class Password extends PureComponent {
  constructor(props) {
    super(props);
    this.password = '';
    this.enterPassword = '';
    this.oldPassword = '';
  }

  submit = () => {
    const {
      userInfo, setPassword, navigation, updatePassword,
    } = this.props;
    if (userInfo.password && this.oldPassword.length !== 6) {
      showToast('请输入6位原支付密码');
      return;
    } if (this.password.length !== 6) {
      showToast('请输入6位支付密码');
      return;
    } if (this.enterPassword.length !== 6) {
      showToast('请确认支付密码');
      return;
    } if (this.enterPassword !== this.password) {
      showToast('确认密码与新密码不相同');
      return;
    }
    if (userInfo.password) {
      updatePassword(this.oldPassword, this.password).then(() => {
        showToast('支付密码修改成功');
        navigation.goBack();
      });
    } else {
      setPassword(this.password).then(() => {
        showToast('支付密码设置成功');
        navigation.goBack();
      });
    }
  }

  render() {
    const { userInfo } = this.props;
    return (
      <KeyboardDismiss style={styles.container}>
        <View style={styles.main}>
          {
            userInfo.password ? (
              <ImageBackground source={Images.extractWhite} style={styles.extractWhite}>
                <Text>旧密码: </Text>
                <TextInput
                  style={styles.input}
                  placeholder="_"
                  maxLength={6}
                  keyboardType="number-pad"
                  placeholderTextColor="#d3d3d3"
                  underlineColorAndroid="transparent"
                  clearButtonMode="while-editing"
                  onChangeText={(text) => { this.oldPassword = text; }}
                />
              </ImageBackground>
            ) : null
          }
          <ImageBackground source={Images.extractWhite} style={styles.extractWhite}>
            <Text>{`${userInfo.password ? '新密码: ' : '设置密码: '}`}</Text>
            <TextInput
              style={styles.input}
              placeholder="_"
              maxLength={6}
              keyboardType="number-pad"
              placeholderTextColor="#d3d3d3"
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={(text) => { this.password = text; }}
            />
          </ImageBackground>
          <ImageBackground source={Images.extractWhite} style={styles.extractWhite}>
            <Text>确认密码: </Text>
            <TextInput
              style={styles.input}
              placeholder="_"
              maxLength={6}
              keyboardType="number-pad"
              placeholderTextColor="#d3d3d3"
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={(text) => { this.enterPassword = text; }}
            />
          </ImageBackground>
        </View>
        <ImageBackground onPress={this.submit} source={Images.extractRed} style={styles.extractRed}>
          <Text style={{ color: '#fff', fontSize: 18 }}>确认修改</Text>
        </ImageBackground>
      </KeyboardDismiss>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.MAIN_BACK,
    paddingBottom: hPx2P(35 + PADDING_TAB),
    paddingTop: hPx2P(30),
  },
  extractRed: {
    width: wPx2P(351),
    height: wPx2P(38),
    alignItems: 'center',
    justifyContent: 'center',
  },
  extractWhite: {
    width: wPx2P(351),
    height: wPx2P(38),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wPx2P(15),
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  main: {
    flex: 1,
    alignItems: 'center',
  },
  bg_right: {
    width: wPx2P(178),
    height: wPx2P(49),
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameAddres: {
    width: wPx2P(291),
    height: wPx2P(119),
    paddingVertical: wPx2P(10),
    marginBottom: hPx2P(100),
  },
  framePhoneInput: {
    width: wPx2P(291),
    height: wPx2P(52),
    marginBottom: hPx2P(10),
  },
  input: {
    flex: 1,
    marginRight: wPx2P(15),
    color: '#555',
    height: '100%',
    padding: 0,
    includeFontPadding: false,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Password);
