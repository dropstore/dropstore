import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
} from 'react-native';
import { YaHei } from '../../res/FontFamily';
import Images from '../../res/Images';
import { Image, KeyboardDismiss } from '../../components';
import Colors from '../../res/Colors';
import { showToast } from '../../utils/MutualUtil';

export default class Modal extends PureComponent {
  constructor(props) {
    super(props);
    const { type } = this.props;
    this.state = {
      step: {
        edit: 0,
        cancel: 2,
        express: 4,
      }[type],
    };
    this.text = '';
  }

  toHelp = () => {
    const { navigation } = this.props;
    this.close();
    navigation.navigate('Web', { url: 'http://m.dropstore.cn/index.html#/help' });
  }

  sure = () => {
    const { successCallback, type } = this.props;
    const { step } = this.state;
    if (step === 0) {
      if (this.text.length < 1) {
        showToast('请输入金额');
      } else {
        successCallback(this.text, type).then(() => {
          this.setState({
            step: 1,
          });
        });
      }
    } else if ([1, 3].includes(step)) {
      this.close();
    } else if (step === 4) {
      if (this.text.length < 1) {
        showToast('请输入运单号');
      } else {
        successCallback(this.text, type).then(() => {
          this.close();
        });
      }
    }
  }

  close = () => {
    const { closeModalbox } = this.props;
    closeModalbox();
  }

  onChangeText = (text) => {
    this.text = text;
  }

  toKufang = () => {
    const { navigation } = this.props;
    this.close();
    navigation.navigate('MyGoods', {
      // url: 'http://m.dropstore.cn/index.html#/help',
      title: '我的库房',
      type: 'warehouse',
    });
  }

  render() {
    const { step } = this.state;
    const { item } = this.props;
    return (
      <KeyboardDismiss style={[styles.container, { height: [0, 4].includes(step) ? 287 : 197 }]}>
        {
          step === 0 ? (
            <View style={{ paddingTop: 12, flex: 1 }}>
              <Text style={styles.edit}>修改价格</Text>
              <View style={{ flexDirection: 'row', marginHorizontal: 32 }}>
                <Text style={{ fontSize: 14, fontFamily: YaHei }}>当前价格：</Text>
                <View style={styles.priceOld}>
                  <Text style={styles.oldText}>{item.order_price}</Text>
                </View>
                <Text style={styles.yuan}>元</Text>
              </View>
              <Text style={styles.new}>预期价格：</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  keyboardType="number-pad"
                  placeholderTextColor="#d3d3d3"
                  underlineColorAndroid="transparent"
                  style={styles.input}
                  clearButtonMode="while-editing"
                  onChangeText={this.onChangeText}
                />
                <Text style={styles.yuan}>元</Text>
              </View>
              <TouchableOpacity onPress={this.toHelp} style={styles.yuanWrapper}>
                <Text style={styles.shouxufei}>手续费：222元</Text>
                <Image source={Images.wenhao} style={{ width: 14, height: 14 }} />
              </TouchableOpacity>
            </View>
          ) : step === 1 ? (
            <View style={styles.wrapper}>
              <Text style={{ fontSize: 16, fontFamily: YaHei }}>修改完成！</Text>
            </View>
          ) : [2, 3].includes(step) ? (
            <View>
              <Text style={styles.hint}>友情提示</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 17 }}>
                {
                  step === 2 ? (
                    <Text style={{ fontSize: 14, fontFamily: YaHei, textAlign: 'center' }}>
                      {'取消售卖，货品会回到您的'}
                      <Text style={styles.kufang} onPress={this.toKufang}>库房</Text>
                      {'中，你可以在库房中直接售卖！'}
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 14, fontFamily: YaHei, textAlign: 'center' }}>
                      {'商品已取消售卖，可以到'}
                      <Text style={styles.kufang} onPress={this.toKufang}>我的库房</Text>
                      {'中查看，管理商品！'}
                    </Text>
                  )
                }
              </View>
            </View>
          ) : step === 4 ? (
            <View style={{ paddingHorizontal: 27 }}>
              <Text style={styles.hint}>物流信息</Text>
              <Text style={{ fontFamily: YaHei }}>
                {'物流公司：'}
                <Text style={{ color: '#8F8F8F', fontFamily: YaHei }}>顺丰快递</Text>
              </Text>
              <Text style={[styles.new, { marginHorizontal: 0 }]}>填写订单号 :</Text>
              <View style={[styles.inputWrapper, { marginHorizontal: 0 }]}>
                <TextInput
                  keyboardType="number-pad"
                  placeholderTextColor="#d3d3d3"
                  underlineColorAndroid="transparent"
                  style={[styles.input, { marginHorizontal: 0 }]}
                  clearButtonMode="while-editing"
                  onChangeText={this.onChangeText}
                />
              </View>
              <Text style={styles.shouxufei}>物流信息填写后无法修改</Text>
            </View>
          ) : null
        }
        <View style={styles.btns}>
          <TouchableOpacity onPress={this.sure} style={styles.btn}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>{`${step === 4 ? '发货' : '确定'}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.close} style={styles.btn}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>取消</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.close} style={styles.cha}>
          <Image source={Images.cha} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      </KeyboardDismiss>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 46,
  },
  btns: {
    height: 45,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  yuan: {
    fontSize: 14,
    fontFamily: YaHei,
    marginLeft: 8,
  },
  container: {
    width: 265,
    backgroundColor: '#fff',
    borderRadius: 2,
    overflow: 'hidden',
  },
  oldText: {
    fontSize: 14,
    fontFamily: YaHei,
    color: '#8F8F8F',
    position: 'relative',
    bottom: -3,
  },
  priceOld: {
    flex: 1,
    borderBottomColor: '#B5B5B5',
    borderBottomWidth: 0.5,
    position: 'relative',
    bottom: 3,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 32,
  },
  input: {
    borderColor: '#8F8F8F',
    borderWidth: 0.5,
    borderRadius: 2,
    overflow: 'hidden',
    flex: 1,
    height: 26,
    padding: 0,
    includeFontPadding: false,
    paddingHorizontal: 5,
  },
  edit: {
    fontSize: 16,
    fontFamily: YaHei,
    alignSelf: 'center',
    marginBottom: 30,
  },
  new: {
    fontSize: 14,
    fontFamily: YaHei,
    marginTop: 27,
    marginHorizontal: 32,
  },
  shouxufei: {
    fontSize: 10,
    color: '#8F8F8F',
    fontFamily: YaHei,
    marginRight: 2,
    marginVertical: 8,
    textAlign: 'right',
  },
  yuanWrapper: {
    marginRight: 32,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btn: {
    flex: 1,
    backgroundColor: Colors.OTHER_BACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cha: {
    backgroundColor: Colors.OTHER_BACK,
    position: 'absolute',
    right: 0,
    height: 35,
    width: 35,
    borderBottomLeftRadius: 2,
    paddingLeft: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    fontSize: 16,
    fontFamily: YaHei,
    marginTop: 13,
    textAlign: 'center',
    marginBottom: 27,
  },
  kufang: {
    fontSize: 14,
    fontFamily: YaHei,
    color: '#37B6EB',
    textAlign: 'right',
  },
});
