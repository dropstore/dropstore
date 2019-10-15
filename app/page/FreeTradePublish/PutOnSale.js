import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Text, ScrollView, View, StyleSheet, TextInput, TouchableOpacity, Platform,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { PADDING_TAB } from '../../common/Constant';
import { Image } from '../../components';
import { YaHei, RuiXian } from '../../res/FontFamily';
import Colors from '../../res/Colors';
import { wPx2P } from '../../utils/ScreenUtil';
import { getSimpleData } from '../../redux/reselect/simpleData';
import { fetchSimpleData } from '../../redux/actions/simpleData';
import { showToast } from '../../utils/MutualUtil';

const TYPE = 'warehousePutOnSale';

function mapStateToProps() {
  return state => ({
    info: getSimpleData(state, TYPE),
    appOptions: getSimpleData(state, 'appOptions'),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchSimpleData,
  }, dispatch);
}

class PutOnSale extends PureComponent {
  constructor(props) {
    super(props);
    const { navigation, fetchSimpleData } = this.props;
    this.item = navigation.getParam('item');
    fetchSimpleData(TYPE, { order_id: this.item.order_id });
    this.state = {
      price: 0,
      agreed: true,
    };
  }

  toPay = () => {
    const { price, agreed } = this.state;
    const { navigation } = this.props;
    if (!agreed) {
      showToast('同意卖家须知后可继续上架');
      return;
    }
    if (price * 1 <= 0) {
      showToast('请输入价格');
      return;
    }
    navigation.navigate('PublishCommission', {
      title: '支付服务费',
      TYPE: 'freeTradeToRelease',
      payType: 4,
      goodsInfo: {
        type: 'deposit',
        price,
        order_id: this.item.order_id,
        goodsImage: (this.item.goods || this.item).image,
        goodsName: (this.item.goods || this.item).goods_name,
      },
    });
  }

  toWeb = () => {
    const { navigation } = this.props;
    navigation.navigate('Web', { url: 'http://m.dropstore.cn/index.html#/secret', title: '隐私协议' });
  }

  change= () => {
    const { agreed } = this.state;
    this.setState({ agreed: !agreed });
  }

  render() {
    const { info, appOptions } = this.props;
    const { price, agreed } = this.state;
    const deposit = Math.ceil(price * appOptions?.data?.fee) / 100;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={false} style={styles.scrollView}>
          <View style={styles.shoesInfo}>
            <View style={styles.shoesInfoTop}>
              <Image style={{ width: wPx2P(166), height: wPx2P(97) }} source={{ uri: (this.item.goods || this.item).image }} />
              <View style={styles.shoesInfoNameBox}>
                <Text style={styles.title}>{(this.item.goods || this.item).goods_name}</Text>
                <Text style={{ fontSize: 12 }}>{`SIZE : ${this.item.size}`}</Text>
              </View>
            </View>
            <View style={styles.shoeSalePrice}>
              <Text style={{ fontSize: 13 }}>
                {'最高售价：'}
                <Text style={styles.TopPrice}>{`￥${info.data?.max_price / 100}`}</Text>
              </Text>
              <Text style={{ fontSize: 13 }}>
                {'最低售价：'}
                <Text style={styles.LowPrice}>{`￥${info.data?.min_price / 100}`}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.shoesCommission}>
            <View style={styles.inputPrice}>
              <Text style={{ color: '#999' }}>￥</Text>
              <TextInput
                style={styles.inputPriceTextare}
                keyboardType="numeric"
                placeholder="输入价格"
                maxLength={9}
                selectionColor="#00AEFF"
                underlineColorAndroid="transparent"
                clearButtonMode="while-editing"
                onChangeText={(price) => { this.setState({ price }); }}
              />
            </View>
            <View style={styles.shoesCommissionMoney}>
              <Text style={styles.priceText}>{`平台服务费(${appOptions?.data?.fee}%)：￥${deposit}`}</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottom}>
          <View style={styles.priceWrapper}>
            <TouchableOpacity onPress={this.change}>
              <Image
                style={{ width: 20, height: 20 }}
                source={agreed ? require('../../res/image/selectIcon.png') : require('../../res/image/unSelect.png')}
              />
            </TouchableOpacity>
            <Text style={styles.ihavekonw}>我已阅读</Text>
            <TouchableOpacity onPress={this.toWeb}>
              <Text style={styles.salerNeedKnow}>卖家须知</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.zhifu, { backgroundColor: !agreed ? '#e2e2e2' : Colors.YELLOW }]}
            onPress={this.toPay}
          >
            <Text style={styles.queren}>上架</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontFamily: RuiXian,
    fontSize: 15,
    textAlign: 'justify',
    lineHeight: 18,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#efefef',
    paddingTop: 9,
    paddingLeft: 9,
    paddingRight: 9,
  },
  shoesInfo: {
    padding: 14,
    backgroundColor: '#fff',
  },
  shoesInfoTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  shoeSalePrice: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shoesInfoNameBox: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  inputPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 2,
    overflow: 'hidden',
    borderColor: '#999',
    borderWidth: StyleSheet.hairlineWidth,
    height: 33,
    paddingLeft: 5,
  },
  shoesCommission: {
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  shoesCommissionInput: {
    borderColor: '#DBDBDB',
    borderWidth: 1,
    backgroundColor: '#FBFBFB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 7,
  },
  shoesCommissionMoney: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  shoesCommissionIncome: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 9,
  },
  priceText: {
    fontSize: 13,
    color: '#000',
    fontFamily: YaHei,
  },
  TopPrice: {
    color: '#37B6EB',
    fontSize: 13,
  },
  LowPrice: {
    color: Colors.YELLOW,
    fontSize: 13,
  },
  inputPriceTextare: {
    flex: 1,
    marginLeft: 5,
    padding: 0,
    includeFontPadding: false,
  },
  zhifu: {
    flex: 1,
    height: 44,
    marginLeft: 20,
    borderRadius: 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    height: 66 + PADDING_TAB,
    backgroundColor: '#fff',
    paddingBottom: PADDING_TAB,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(188, 188, 188)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 5,
      },
      android: {
        elevation: 50,
        position: 'relative',
      },
    }),
  },
  priceWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 20,
  },
  ihavekonw: {
    marginLeft: 9,
    fontSize: 12,
    color: '#555555',
  },
  queren: {
    color: '#fff',
    fontSize: 16,
    fontFamily: YaHei,
  },
  salerNeedKnow: {
    fontSize: 12,
    color: '#37B6EB',
  },

});
export default connect(mapStateToProps, mapDispatchToProps)(PutOnSale);
