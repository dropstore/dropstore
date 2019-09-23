import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Text, ScrollView, View, StyleSheet, TextInput, TouchableOpacity, Platform,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { PADDING_TAB } from '../../common/Constant';
import { Image } from '../../components';
import { YaHei } from '../../res/FontFamily';
import Colors from '../../res/Colors';
import { wPx2P } from '../../utils/ScreenUtil';
import { getSimpleData } from '../../redux/reselect/simpleData';
import { fetchSimpleData } from '../../redux/actions/simpleData';
import { showToast } from '../../utils/MutualUtil';

const TYPE = 'warehousePutOnSale';

function mapStateToProps() {
  return state => ({
    info: getSimpleData(state, TYPE),
    simpleData: getSimpleData(state, 'appOptions'),
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
    const { info, navigation } = this.props;
    const min_price = info.data?.min_price / 100;
    const max_price = info.data?.max_price / 100;
    if (price < min_price / 100 || price > max_price) {
      showToast(`请输入介于${min_price}-${max_price}之间的价格`);
      return;
    } if (!agreed) {
      showToast('同意卖家须知后可继续上架');
      return;
    }
    navigation.navigate('PublishComission', {
      title: '支付保证金',
      goodsInfo: {
        type: 'storeMoney',
        shoeSize: this.item.size,
        goodsId: this.item.goods_id,
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
    const { info, simpleData } = this.props;
    const { price, agreed } = this.state;
    const deposit = price * simpleData?.data?.fee / 100;
    const disabled = price < info.data?.min_price / 100 || price > info.data?.max_price / 100 || !agreed;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={false} style={styles.scrollView}>
          <View style={styles.shoesInfo}>
            <View style={styles.shoesInfoTop}>
              <Image style={{ width: wPx2P(166), height: wPx2P(97) }} source={{ uri: (this.item.goods || this.item).image }} />
              <View style={styles.shoesInfoNameBox}>
                <Text style={{ fontFamily: YaHei, fontSize: 15, textAlign: 'justify' }}>{(this.item.goods || this.item).goods_name}</Text>
                <Text style={{ fontSize: 12, fontFamily: YaHei }}>{`SIZE : ${this.item.size}`}</Text>
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
                keyboardType="number-pad"
                placeholder="输入价格"
                maxLength={`${info.data?.max_price / 100}`.length}
                underlineColorAndroid="transparent"
                clearButtonMode="while-editing"
                onChangeText={(price) => { this.setState({ price }); }}
              />
            </View>
            <View style={styles.shoesCommissionMoney}>
              <Text style={styles.priceText}>{`保证金：${deposit}`}</Text>
            </View>
            <View style={styles.shoesCommissionIncome}>
              <Text style={styles.priceText}>{`成交收入：${price - deposit}`}</Text>
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
              <Text style={styles.salerNeedKnow}>卖家须知&gt;</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.zhifu, { backgroundColor: disabled ? '#e2e2e2' : Colors.OTHER_BACK }]}
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
    paddingBottom: 9,
    marginTop: 24,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
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
    color: Colors.OTHER_BACK,
    fontSize: 13,
  },
  inputPriceTextare: {
    flex: 1,
    marginLeft: 5,
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
