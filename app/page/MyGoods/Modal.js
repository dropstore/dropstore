import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { YaHei, RuiXian } from '../../res/FontFamily';
import Images from '../../res/Images';
import { Image, KeyboardDismiss, FadeImage } from '../../components';
import Colors from '../../res/Colors';
import { showToast } from '../../utils/MutualUtil';
import { getSimpleData } from '../../redux/reselect/simpleData';
import { getAddress } from '../../redux/reselect/address';

function mapStateToProps() {
  return state => ({
    appOptions: getSimpleData(state, 'appOptions'),
    address: getAddress(state),
  });
}

class Modal extends PureComponent {
  constructor(props) {
    super(props);
    const { type } = this.props;
    this.state = {
      text: '',
      step: {
        edit: 0,
        cancel: 2,
        express: 4,
      }[type],
    };
  }

  toHelp = () => {
    const { navigation } = this.props;
    this.close();
    navigation.navigate('Web', { url: 'http://m.dropstore.cn/index.html#/help' });
  }

  sure = () => {
    const { successCallback, type } = this.props;
    const { step, text } = this.state;
    if (step === 0) {
      if (text.length < 1) {
        showToast('请输入金额');
      } else {
        successCallback(text, type).then(() => {
          this.close();
        });
      }
    } else if ([1, 3].includes(step)) {
      this.close();
    } else if (step === 4) {
      if (text.length < 1) {
        showToast('请输入运单号');
      } else {
        successCallback(text, type).then(() => {
          this.close();
        });
      }
    } else if (step === 2) {
      successCallback(text, type).then((close) => {
        if (close) {
          this.close();
        } else {
          this.setState({ step: 3 });
        }
      });
    }
  }

  close = () => {
    const { closeModalbox } = this.props;
    closeModalbox();
  }

  onChangeText = (text) => {
    this.setState({ text });
  }

  renderShoe = () => {
    const { item } = this.props;
    const goods_name = (item.goods || item).goods_name;
    return (
      <View style={styles.titleWrapper}>
        <FadeImage source={{ uri: (item.goods || item).icon }} style={styles.shoe} />
        <Text numberOfLines={2} style={styles.title}>{goods_name}</Text>
      </View>
    );
  }

  toKufang = () => {
    const { navigation, route } = this.props;
    this.close();
    if (route === 'Goods') {
      navigation.push('MyGoods', {
        title: '我的库房',
        type: 'warehouse',
      });
    }
  }

  renderTip = () => {
    const { appOptions } = this.props;
    const { text } = this.state;
    return (
      <Menu ref={(v) => { this.menu = v; }} style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity
          hitSlop={{
            top: 8, right: 10, bottom: 8, left: 10,
          }}
          onPress={() => this.menu.open()}
          style={styles.openTip}
        >
          <Text style={styles.shouxufei}>{`平台服务费：${Math.ceil(appOptions?.data?.fee * text) / 100}元`}</Text>
          <Image source={Images.wenhao} style={{ width: 14, height: 14 }} />
        </TouchableOpacity>
        <MenuTrigger />
        <MenuOptions
          renderOptionsContainer={() => (
            <Text style={styles.jianding}>
              {'包含鉴别费(对每件商品进行多重鉴别真伪服务产生的服务费用)，包装服务费(商品发货至买家时所需的各类包装材料及人工包装服务所产生的服务费用)。'}
            </Text>
          )}
          customStyles={{ optionsContainer: { width: 180, paddingHorizontal: 10, paddingVertical: 5 } }}
        />
      </Menu>
    );
  }

  toChoose = () => {
    const { navigation } = this.props;
    navigation.navigate('ChooseAddress', {
      title: '选择地址',
      onPress: () => navigation.pop(),
    });
  }

  render() {
    const { text, step } = this.state;
    const { item, address } = this.props;
    const defaultAddress = address.current;
    return (
      <KeyboardDismiss style={[styles.container, { height: step === 0 ? 307 : step === 4 ? 390 : 247 }]}>
        {
          step === 0 ? (
            <View style={{ flex: 1 }}>
              {this.renderShoe()}
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 11, fontFamily: YaHei, color: '#A4A4A4' }}>当前价格：</Text>
                <Text style={styles.oldText}>
                  {`${item.sell_price / 100}￥`}
                </Text>
              </View>
              <TextInput
                keyboardType="numeric"
                placeholderTextColor="#DEDEDE"
                underlineColorAndroid="transparent"
                style={styles.input}
                selectionColor="#00AEFF"
                clearButtonMode="while-editing"
                placeholder="预期价格"
                onChangeText={this.onChangeText}
              />
              {this.renderTip()}
            </View>
          ) : step === 1 ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, fontFamily: YaHei }}>修改完成！</Text>
            </View>
          )
            : [2, 3].includes(step) ? (
              <View style={{ flex: 1 }}>
                <Text style={styles.hint}>友情提示</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 17 }}>
                  {
                  step === 2 ? (
                    <Text style={{ fontSize: 14, fontFamily: YaHei }}>
                      {'取消售卖，货品会回到您的'}
                      <Text style={styles.kufang} onPress={this.toKufang}>库房</Text>
                      {'中，你可以在库房中直接售卖！'}
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 14, fontFamily: YaHei }}>
                      {'商品已取消售卖，可以到'}
                      <Text style={styles.kufang} onPress={this.toKufang}>我的库房</Text>
                      {'中查看，管理商品！'}
                    </Text>
                  )
                }
                </View>
              </View>
            ) : step === 4 ? (
              <View style={{ flex: 1 }}>
                {this.renderShoe()}
                <View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: '#212121', fontSize: 12 }}>收货人：酱爆</Text>
                    <Text style={{ color: '#212121', fontSize: 12 }}>1383883838</Text>
                  </View>
                  <Text style={{ color: '#858585', fontSize: 11, marginTop: 2 }}>北京市朝阳区朝外SOHO B座823</Text>
                </View>
                <Text style={{
                  fontFamily: YaHei, color: '#A4A4A4', fontSize: 11, marginTop: 10,
                }}
                >
                  {'物流公司：'}
                  <Text style={{ fontFamily: YaHei, fontSize: 11 }}>顺丰快递</Text>
                </Text>
                <TextInput
                  keyboardType="number-pad"
                  placeholderTextColor="#DEDEDE"
                  underlineColorAndroid="transparent"
                  style={styles.input}
                  selectionColor="#00AEFF"
                  clearButtonMode="while-editing"
                  placeholder="填写运单号"
                  onChangeText={this.onChangeText}
                />
                <Text style={styles.shouxufei}>物流信息填写后无法修改</Text>
                <Text style={{ fontSize: 12, color: '#212121' }}>寄回地址</Text>
                <TouchableOpacity
                  onPress={this.toChoose}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <View style={{
                      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                    }}
                    >
                      <Text style={{ color: '#212121', fontSize: 12 }}>{defaultAddress.link_name}</Text>
                      <Text style={{ color: '#212121', fontSize: 12 }}>{defaultAddress.mobile}</Text>
                    </View>
                    <Text numberOfLines={1} style={{ color: '#858585', fontSize: 11, marginTop: 2 }}>{defaultAddress.address}</Text>
                  </View>
                  <Image source={Images.iconRight} style={{ height: 9, width: 6 }} />
                </TouchableOpacity>
              </View>
            ) : null
        }
        <TouchableOpacity
          onPress={this.sure}
          style={[styles.btn, { backgroundColor: text.length === 0 && [4, 0].includes(step) ? '#DEDEDE' : Colors.YELLOW }]}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>{`${step === 4 ? '发货' : '确定'}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          hitSlop={{
            top: 20, left: 20, right: 20, bottom: 20,
          }}
          onPress={this.close}
          style={styles.cha}
        >
          <Image source={require('../../res/image/close-x.png')} style={{ height: 12, width: 12 }} />
        </TouchableOpacity>
      </KeyboardDismiss>
    );
  }
}

const styles = StyleSheet.create({
  jianding: {
    fontSize: 11,
    textAlign: 'justify',
    color: '#8F8F8F',
    lineHeight: 13,
  },
  shoe: {
    width: 64.5,
    height: 40,
  },
  openTip: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 46,
  },
  title: {
    fontFamily: RuiXian,
    fontSize: 11,
    flex: 1,
    marginLeft: 5,
    textAlign: 'justify',
    lineHeight: 13,
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
    paddingHorizontal: 28,
    paddingTop: 33,
    paddingBottom: 38,
  },
  oldText: {
    fontSize: 13,
    fontFamily: YaHei,
    position: 'relative',
    bottom: 2,
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
    fontSize: 15,
    fontFamily: YaHei,
    marginTop: 15,
    borderBottomColor: '#C5C5CD',
    borderBottomWidth: StyleSheet.hairlineWidth,
    includeFontPadding: false,
    padding: 0,
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btn: {
    height: 43,
    width: 204,
    borderRadius: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  cha: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  hint: {
    fontSize: 20,
    fontFamily: YaHei,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 27,
  },
  kufang: {
    fontSize: 14,
    fontFamily: YaHei,
    color: '#37B6EB',
    textAlign: 'right',
  },
});

export default connect(mapStateToProps)(Modal);
