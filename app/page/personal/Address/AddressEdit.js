import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Images from '../../../res/Images';
import Colors from '../../../res/Colors';
import { wPx2P, hPx2P } from '../../../utils/ScreenUtil';
import { PADDING_TAB } from '../../../common/Constant';
import { addAddress, editAddress } from '../../../redux/actions/address';
import { showToast } from '../../../utils/MutualUtil';
import { KeyboardDismiss, Image } from '../../../components';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addAddress, editAddress,
  }, dispatch);
}

class AddressEdit extends PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const {
      mobile, link_name, address, is_default,
    } = navigation.getParam('address') || {};
    this.mobile = mobile;
    this.link_name = link_name;
    this.address = address;
    this.state = {
      isDefault: is_default,
    };
  }

  submit = () => {
    if (!this.link_name) {
      showToast('请输入收件人姓名');
      return;
    } if (!this.mobile) {
      showToast('请输入手机号码');
      return;
    } if (!this.address) {
      showToast('请输入详细地址');
      return;
    }
    const { navigation, addAddress, editAddress } = this.props;
    const { isDefault } = this.state;
    const address = navigation.getParam('address') || {};
    if (address.link_name) {
      editAddress(this.address, this.link_name, this.mobile, isDefault, address.id).then(() => {
        navigation.pop();
      });
    } else {
      const needTurn = navigation.getParam('needTurn');
      addAddress(this.address, this.link_name, this.mobile, needTurn || isDefault === '1' ? '1' : '0').then(() => {
        if (needTurn) {
          navigation.navigate('PickUp', {
            title: '支付运费',
            address: {
              link_name: this.link_name,
              address: this.address,
              mobile: this.mobile,
            },
          });
        } else {
          navigation.pop();
        }
      });
    }
  }

  render() {
    const { navigation } = this.props;
    const { isDefault } = this.state;
    const address = navigation.getParam('address') || {};
    return (
      <KeyboardDismiss style={styles.container}>
        <View style={styles.main}>
          <View style={styles.framePhoneInput}>
            <TextInput
              style={styles.input}
              placeholder="输入收件人"
              defaultValue={address.link_name}
              placeholderTextColor="#D6D6D6"
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={(text) => { this.link_name = text; }}
            />
          </View>
          <View style={styles.framePhoneInput}>
            <TextInput
              style={styles.input}
              placeholder="输入手机号"
              keyboardType="number-pad"
              defaultValue={address.mobile}
              placeholderTextColor="#D6D6D6"
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={(text) => { this.mobile = text; }}
            />
          </View>
          <View style={styles.frameAddres}>
            <TextInput
              style={styles.input}
              multiline
              placeholder="输入详细地址"
              defaultValue={address.address}
              placeholderTextColor="#D6D6D6"
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={(text) => { this.address = text; }}
            />
          </View>
          <TouchableOpacity onPress={() => this.setState({ isDefault: { 0: '1', 1: '0' }[isDefault] })} style={styles.switchWrapper}>
            <Text style={{ fontSize: 12 }}>设为默认地址</Text>
            <Image source={isDefault === '1' ? Images.choose : Images.unchoose} style={styles.choose} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.submit} style={styles.bg_right}>
          <Text style={{ color: '#fff' }}>确认提交</Text>
        </TouchableOpacity>
      </KeyboardDismiss>
    );
  }
}

const styles = StyleSheet.create({
  switchWrapper: {
    marginBottom: hPx2P(100),
    marginTop: hPx2P(19),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 2,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#8F8F8F',
    height: 30,
    width: wPx2P(254),
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  switch: {
    height: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.MAIN_BACK,
    paddingTop: hPx2P(60),
    paddingBottom: hPx2P(40 + PADDING_TAB),
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg_right: {
    height: 46,
    width: wPx2P(254),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.OTHER_BACK,
    borderRadius: 2,
    overflow: 'hidden',
  },
  frameAddres: {
    width: wPx2P(254),
    height: hPx2P(150),
    paddingVertical: wPx2P(10),
    backgroundColor: '#fff',
    borderRadius: 2,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#8F8F8F',
  },
  framePhoneInput: {
    width: wPx2P(254),
    height: 36,
    marginBottom: hPx2P(9),
    backgroundColor: '#fff',
    borderRadius: 2,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#8F8F8F',
  },
  input: {
    flex: 1,
    padding: 0,
    marginLeft: wPx2P(12),
    marginRight: wPx2P(5),
    color: '#333',
    fontSize: 12,
  },
  choose: {
    width: 19,
    height: 19,
  },
});

export default connect(null, mapDispatchToProps)(AddressEdit);
