import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Text, ScrollView, View, StyleSheet, TextInput, TouchableOpacity, Platform,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { PADDING_TAB } from '../../common/Constant';
import { BottomPay, Image } from '../../components';
import { YaHei } from '../../res/FontFamily';
import Colors from '../../res/Colors';
import { wPx2P } from '../../utils/ScreenUtil';


function mapStateToProps() {
  return state => ({

  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

class PutOnSale extends PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    // const { price,goods_name,image} = navigation.getParam('goods')
    this.state = {
      currentItem: {
        // image,
        // goods_name,
        // price,
      },
      disable: false,
    };
  }

  toPay = () => {

  }

  exit = () => {

  }

  onPress = () => {

  }

  render() {
    const { currentItem } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.shoesInfo}>
            <View style={styles.shoesInfoTop}>
              <View style={styles.shoesInfoImage}>
                <Image style={{ width: 166, height: 97 }} source={{ uri: '../../res/image/fxtszqldd.png' }} />
              </View>
              <View style={styles.shoesInfoNameBox}>
                <View style={styles.shoesInfoName}>
                  <Text style={{ flex: 1 }}>
                    AIR JORDAN 1 HIGH OG 2018版“ORIGIN STORY”蜘蛛侠
                  </Text>
                </View>
                <View style={styles.shoesInfoSize}>
                  <Text>已选尺寸：42</Text>

                </View>
              </View>
            </View>
            <View style={styles.shoeSalePrice}>
              <Text>
最高售价：
<Text style={styles.TopPrice}>￥200000</Text>
              </Text>
              <Text>
最低售价：
<Text style={styles.LowPrice}>￥200000</Text>
              </Text>
            </View>
          </View>
          <View style={styles.shoesCommission}>
            <View style={styles.shoesCommissionInput}>
              <View style={styles.inputPrice}>
                <Text>￥</Text>
                <TextInput
                style={styles.inputPriceTextare}
                placeholder="输入价位"
                maxLength={9}
                color="#BEBEBE"
                autoFocus
               />
              </View>
              <Text style={styles.servicePrice}>服务费：4000</Text>
            </View>
            <View style={styles.shoesCommissionMoney}>
              <Text style={styles.priceText}>平台手续费：</Text>
              <Text style={styles.priceText}>-￥40.00</Text>
            </View>
            <View style={styles.shoesCommissionIncome}>
              <Text style={styles.priceText}>成交收入：</Text>
              <Text style={styles.priceText}>￥40.00</Text>
            </View>
          </View>

        </ScrollView>
        <View style={styles.bottom}>
          <View style={styles.priceWrapper}>
            <TouchableOpacity
              onPress={this.onPress}
            >
              <Image style={{ width: 20, height: 20 }} source={require('../../res/image/selectIcon.png')} />
            </TouchableOpacity>
            <Text style={styles.ihavekonw}>我已阅读</Text>
            <TouchableOpacity
              onPress={this.onPress}
            >
              <Text style={styles.salerNeedKnow}>卖家须知></Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            disabled={this.state.disable}
            style={[styles.zhifu, { backgroundColor: this.state.disable ? '#e2e2e2' : Colors.OTHER_BACK }]}
            onPress={this.onPress}
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
    marginBottom: 66 + PADDING_TAB,
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
  shoesInfoImage: {

  },
  shoesInfoNameBox: {
    flex: 1,
  },
  shoesInfoName: {
    flex: 1,
  },
  inputPrice: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 2,
  },

  servicePrice: {
    flex: 1,
    fontSize: 15,
    color: '#BEBEBE',
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
  },
  LowPrice: {
    color: '#C20000',
  },
  inputPriceTextare: {
    flex: 8,
  },
  zhifu: {
    width: wPx2P(150),
    height: 44,
    borderRadius: 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    height: 66 + PADDING_TAB,
    position: 'absolute',
    width: '100%',
    bottom: 0,
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  price: {
    fontSize: 16,
    fontFamily: YaHei,
  },
  ihavekonw: {
    marginLeft: 9,
    fontSize: 14,
  },
  queren: {
    color: '#fff',
    fontSize: 16,
    fontFamily: YaHei,
  },
  salerNeedKnow: {
    fontSize: 14,
    color: '#37B6EB',
  },

});
export default connect(mapStateToProps, mapDispatchToProps)(PutOnSale);
