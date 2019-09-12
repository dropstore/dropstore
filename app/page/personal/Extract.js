import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Images from '../../res/Images';
import {
  Image, ModalNormal, ImageBackground, KeyboardDismiss,
} from '../../components';
import Colors from '../../res/Colors';
import { updateUser } from '../../redux/actions/userInfo';
import { getUserInfo } from '../../redux/reselect/userInfo';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';
import {
  PADDING_TAB, SCREEN_WIDTH, SCREEN_HEIGHT, STATUSBAR_AND_NAV_HEIGHT,
} from '../../common/Constant';
import { request } from '../../http/Axios';
import { showToast, showModalbox, closeModalbox } from '../../utils/MutualUtil';

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

class Extract extends PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    navigation.setParams({
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('Detaile', { title: '明细' })} style={styles.rightWrapper}>
          <Text style={{ color: '#fff', fontSize: 14 }}>明细</Text>
        </TouchableOpacity>
      ),
    });
  }

  submit = () => {
    if (!this.name) {
      showToast('请输入收款人姓名');
      return;
    } if (!this.account) {
      showToast('请输入收款人账户');
      return;
    } if (!this.price) {
      showToast('请输入提现金额');
      return;
    }
    showModalbox({
      element: (<ModalNormal
        sure={() => {
          request('/user/user_cash', {
            params: {
              price: this.price,
              name: this.name,
              account: this.account,
            },
          }).then(() => {
            showToast('提现申请成功');
            closeModalbox();
          });
        }}
        closeModalbox={closeModalbox}
        customText={
          (
            <View>
              <Text>{`收款人姓名：${this.name}`}</Text>
              <Text>{`收款人账户：${this.account}`}</Text>
              <Text>{`提现金额：${this.price}`}</Text>
            </View>
          )
        }
        title="确认提现账户及金额"
      />),
      options: {
        style: {
          height: 197,
          width: 265,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        },
      },
    });
  }

  instructions = () => {
    const { navigation } = this.props;
    navigation.navigate('Web', {
      url: 'https://www.baidu.com/',
      title: '提现说明',
    });
  }

  render() {
    return (
      <KeyboardDismiss style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <View>
          <ImageBackground source={Images.extractWhite} style={styles.extractWhite}>
            <Text style={{ color: '#000', fontSize: 14 }}>可提现余额: </Text>
            <Text style={{ color: '#666', fontSize: 14 }}>15300</Text>
          </ImageBackground>
          <ImageBackground source={Images.extractWhite} style={styles.extractWhite}>
            <Text>姓名: </Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              placeholderTextColor="#d3d3d3"
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={(text) => { this.name = text; }}
            />
          </ImageBackground>
          <ImageBackground source={Images.extractWhite} style={styles.extractWhite}>
            <Text>支付宝账号: </Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              placeholderTextColor="#d3d3d3"
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={(text) => { this.account = text; }}
            />
          </ImageBackground>
          <ImageBackground source={Images.extractWhite} style={styles.extractWhite}>
            <Text>提现金额: </Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              placeholderTextColor="#d3d3d3"
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={(text) => { this.price = text; }}
            />
          </ImageBackground>
          <TouchableOpacity style={styles.btn} onPress={this.instructions}>
            <Text style={{ color: '#000', fontSize: 14 }}>提现说明</Text>
            <Image source={Images.arrowRed} style={{ width: 7, height: 10, marginLeft: 5 }} />
          </TouchableOpacity>
        </View>

        <View style={{ marginBottom: hPx2P(35) + PADDING_TAB }}>
          <Text style={styles.date}>1-3个工作日到账</Text>
          <ImageBackground onPress={this.submit} source={Images.extractRed} style={styles.extractRed}>
            <Text style={{ color: '#fff', fontSize: 18 }}>提交申请</Text>
          </ImageBackground>
        </View>
      </KeyboardDismiss>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT - STATUSBAR_AND_NAV_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: Colors.MAIN_BACK,
    alignItems: 'center',
    paddingTop: hPx2P(26),
    justifyContent: 'space-between',
  },
  rightWrapper: {
    paddingRight: 12,
    height: '100%',
    paddingLeft: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
  date: {
    color: '#CCCCCC',
    fontSize: 14,
    marginBottom: hPx2P(27),
    marginTop: hPx2P(10),
    textAlign: 'center',
  },
  input: {
    flex: 1,
    padding: 0,
    color: '#666',
    height: '100%',
    textAlign: 'right',
    includeFontPadding: false,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Extract);
