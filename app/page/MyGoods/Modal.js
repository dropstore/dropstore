import React, { PureComponent } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { YaHei, RuiXian } from '../../res/FontFamily';
import Images from '../../res/Images';
import { Image, KeyboardDismiss, FadeImage } from '../../components';
import Colors from '../../res/Colors';
import { showToast } from '../../utils/MutualUtil';
import { getSimpleData } from '../../redux/reselect/simpleData';

function mapStateToProps() {
  return state => ({
    appOptions: getSimpleData(state, 'appOptions'),
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
      successCallback(text, type).then(() => {
        this.setState({ step: 3 });
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
    const image = (item.goods || item).image;
    const goods_name = (item.goods || item).goods_name;
    return (
      <View style={styles.titleWrapper}>
        <FadeImage source={{ uri: image }} style={styles.shoe} />
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

  render() {
    const { step, text } = this.state;
    const { item, appOptions } = this.props;

    return (
      <KeyboardDismiss style={[styles.container, { height: [0, 4].includes(step) ? 307 : 247 }]}>
        {
          step === 0 ? (
            <View style={{ paddingTop: 12, flex: 1 }}>
              <Text style={styles.edit}>修改价格</Text>
              <View style={{ flexDirection: 'row', marginHorizontal: 32 }}>
                <Text style={{ fontSize: 14, fontFamily: YaHei }}>当前价格：</Text>
                <View style={styles.priceOld}>
                  <Text style={styles.oldText}>{(item.order_price || item.price) / 100}</Text>
                </View>
                <Text style={styles.yuan}>元</Text>
              </View>
              <Text style={styles.new}>预期价格：</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  keyboardType="numeric"
                  placeholderTextColor="#d3d3d3"
                  underlineColorAndroid="transparent"
                  style={styles.input}
                  clearButtonMode="while-editing"
                  onChangeText={this.onChangeText}
                />
                <Text style={styles.yuan}>元</Text>
              </View>
              <TouchableOpacity onPress={this.toHelp} style={styles.yuanWrapper}>
                <Text style={styles.shouxufei}>{`手续费：${Math.ceil(appOptions?.data?.fee * text) / 100}元`}</Text>
                <Image source={Images.wenhao} style={{ width: 14, height: 14 }} />
              </TouchableOpacity>
            </View>
          ) : step === 1 ? <Text style={{ fontSize: 20, fontFamily: YaHei }}>修改完成！</Text>
            : [2, 3].includes(step) ? (
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
              <View style={{ flex: 1 }}>
                {this.renderShoe()}
                <Text style={{ fontFamily: YaHei, color: '#A4A4A4', fontSize: 11 }}>
                  {'物流公司：'}
                  <Text style={{ fontFamily: YaHei, fontSize: 11 }}>顺丰快递</Text>
                </Text>
                <TextInput
                  keyboardType="number-pad"
                  placeholderTextColor="#d3d3d3"
                  underlineColorAndroid="transparent"
                  style={styles.input}
                  selectionColor="#00AEFF"
                  clearButtonMode="while-editing"
                  placeholder="填写运单号"
                  onChangeText={this.onChangeText}
                />
                <Text style={styles.shouxufei}>物流信息填写后无法修改</Text>
              </View>
            ) : null
        }
        <TouchableOpacity onPress={this.sure} style={[styles.btn, { backgroundColor: text.length === 0 ? Colors.DISABLE : Colors.YELLOW }]}>
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
  shoe: {
    width: 64.5,
    height: 40,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 35,
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
    width: 307,
    backgroundColor: '#fff',
    borderRadius: 2,
    overflow: 'hidden',
    paddingHorizontal: 27,
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
    fontSize: 30,
    fontFamily: YaHei,
    marginTop: 5,
    borderBottomColor: '#C5C5CD',
    borderBottomWidth: StyleSheet.hairlineWidth,
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
    height: 43,
    width: 204,
    borderRadius: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 38,
  },
  cha: {
    position: 'absolute',
    right: 10,
    top: 10,
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

export default connect(mapStateToProps)(Modal);
