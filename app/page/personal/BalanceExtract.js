/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ModalNormal, KeyboardDismiss } from '../../components';
import Colors from '../../res/Colors';
import { updateUser } from '../../redux/actions/userInfo';
import { getUserInfo } from '../../redux/reselect/userInfo';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';
import {
  PADDING_TAB, getScreenWidth, getScreenHeight, STATUSBAR_AND_NAV_HEIGHT,
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

class BalanceExtract extends PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    navigation.setParams({
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('BalanceDetail', { title: '明细' })} style={styles.rightWrapper}>
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
    const { userInfo } = this.props;
    const canExtract = Math.min(15300, userInfo.balance / 100);
    const data = [
      { title: canExtract > 15300 ? '当日可提现金额' : '可提现金额', onChangeText: (text) => { this.name = text; } },
      { title: '姓名', onChangeText: (text) => { this.name = text; } },
      { title: '支付宝账号', keyboardType: 'number-pad', onChangeText: (text) => { this.account = text; } },
      { title: '提现金额', keyboardType: 'number-pad', onChangeText: (text) => { this.price = text; } },
    ];
    return (
      <KeyboardDismiss style={styles.container}>
        <View>
          {
            data.map((v, i) => (
              <View style={styles.extractWhite} key={`${v.title}-${i}`}>
                <Text style={{ fontSize: 12 }}>{`${v.title}: `}</Text>
                {
                  i === 0 ? <Text style={{ fontSize: 12 }}>{canExtract}</Text> : (
                    <TextInput
                      style={styles.input}
                      keyboardType={v.keyboardType}
                      placeholderTextColor="#d3d3d3"
                      underlineColorAndroid="transparent"
                      // clearButtonMode="while-editing"
                      onChangeText={v.onChangeText}
                    />
                  )
                }
              </View>
            ))
          }
          <TouchableOpacity style={styles.btn} onPress={this.instructions}>
            <Text style={{ fontSize: 12, color: '#37B6EB' }}>提现说明 &gt;</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginBottom: hPx2P(35) + PADDING_TAB }}>
          <Text style={styles.date}>1-3个工作日到账</Text>
          <TouchableOpacity onPress={this.submit} style={styles.extractRed}>
            <Text style={{ color: '#fff', fontSize: 16 }}>提交申请</Text>
          </TouchableOpacity>
        </View>
      </KeyboardDismiss>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: getScreenHeight() - STATUSBAR_AND_NAV_HEIGHT,
    width: getScreenWidth(),
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
    width: wPx2P(265),
    height: wPx2P(46),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.OTHER_BACK,
    borderRadius: 2,
    overflow: 'hidden',
  },
  extractWhite: {
    height: 40,
    width: getScreenWidth() - 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  date: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: hPx2P(27),
    marginTop: hPx2P(10),
    textAlign: 'center',
  },
  input: {
    flex: 1,
    padding: 0,
    fontSize: 12,
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

export default connect(mapStateToProps, mapDispatchToProps)(BalanceExtract);
