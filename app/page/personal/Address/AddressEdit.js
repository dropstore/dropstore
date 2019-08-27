import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TextInput,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImageBackground from '../../../components/ImageBackground';
import Images from '../../../res/Images';
import Colors from '../../../res/Colors';
import { wPx2P, hPx2P } from '../../../utils/ScreenUtil';
import { updateUser } from '../../../redux/actions/userInfo';
import { getUserInfo } from '../../../redux/reselect/userInfo';
import { showToast } from '../../../utils/MutualUtil';
import KeyboardDismiss from '../../../components/KeyboardDismiss';

function mapStateToProps() {
  return state => ({
    userInfo: getUserInfo(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUser,
  }, dispatch);
}

class AddressEdit extends PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const { mobile, name, address } = navigation.getParam('address') || {};
    this.mobile = mobile;
    this.name = name;
    this.address = address;
  }

  submit = () => {
    if (!this.name) {
      showToast('请输入收件人姓名');
      return;
    } if (!this.mobile) {
      showToast('请输入手机号码');
      return;
    } if (!this.address) {
      showToast('请输入详细地址');
      return;
    }
    console.log(this.mobile, this.name, this.address);
  }

  render() {
    const { navigation } = this.props;
    const address = navigation.getParam('address') || {};
    return (
      <KeyboardDismiss style={styles.container}>
        <View style={styles.main}>
          <ImageBackground source={Images.framePhoneInput} style={styles.framePhoneInput}>
            <TextInput
              style={styles.input}
              placeholder="收件人_"
              defaultValue={address.name}
              placeholderTextColor="#d3d3d3"
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={(text) => { this.name = text; }}
            />
          </ImageBackground>
          <ImageBackground source={Images.framePhoneInput} style={styles.framePhoneInput}>
            <TextInput
              style={styles.input}
              placeholder="手机号码_"
              defaultValue={address.mobile}
              placeholderTextColor="#d3d3d3"
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={(text) => { this.mobile = text; }}
            />
          </ImageBackground>
          <ImageBackground source={Images.frameAddres} style={styles.frameAddres}>
            <TextInput
              style={styles.input}
              multiline
              placeholder="详细地址_"
              defaultValue={address.address}
              placeholderTextColor="#d3d3d3"
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={(text) => { this.address = text; }}
            />
          </ImageBackground>
        </View>
        <ImageBackground onPress={this.submit} source={Images.bg_right} style={styles.bg_right}>
          <Text style={{ color: '#fff' }}>确认提交</Text>
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
    paddingVertical: hPx2P(80),
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    padding: 0,
    marginHorizontal: wPx2P(15),
    color: '#333',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressEdit);
