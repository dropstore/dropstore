import React, { PureComponent } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Image from '../../components/Image';
import { BottomPay } from '../../components';
import Images from '../../res/Images';
import Colors from '../../res/Colors';
import { debounce } from '../../utils/commonUtils';
import { showToast } from '../../utils/MutualUtil';
import { getOrderInfo, getPayStatus } from '../../redux/actions/pay';
import ShopConstant from '../../common/ShopConstant';

const PAY_WAYS = [{
  type: ShopConstant.ALIPAY,
  subImage: Images.pay_zfb,
  name: '支付宝',
  isSelect: false,
  bgColor: Colors.PAY_ZFB_BG,
},
// {
//   type: ShopConstant.WECHATPAY,
//   subImage: Images.pay_wx,
//   name: '微信钱包',
//   isSelect: false,
//   bgColor: Colors.PAY_WX_BG,
// },
  // {
//   type: ShopConstant.DROPPAY,
//   subImage: Images.pay_drop,
//   name: 'Drop账户',
//   isSelect: false,
//   bgColor: Colors.NORMAL_TEXT_C2,
// }
];

export default class Pay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      choosedIndex: -1,
    };
  }

    changePayStatus = (index) => {
      const { choosedIndex } = this.state;
      this.setState({ choosedIndex: choosedIndex === index ? -1 : index });
    };

    pay = async () => {
      const { navigation } = this.props;
      const data = navigation.getParam('payData');
      const type = navigation.getParam('type');
      const shopInfo = navigation.getParam('shopInfo');
      const noTimer = navigation.getParam('noTimer');
      const buySuccess = navigation.getParam('buySuccess');
      const noShareBtn = navigation.getParam('noShareBtn');
      const { choosedIndex } = this.state;
      if (choosedIndex < 0) {
        return showToast('请选择付款方式');
      }
      const status = await getOrderInfo(type, PAY_WAYS[choosedIndex].type, data.order_id);
      if (status === ShopConstant.FINISHPAY) {
        window.waitPay = null;
        getPayStatus(type, data.order_id, navigation, shopInfo, buySuccess, noTimer, noShareBtn);
      }
    };

    render() {
      const { choosedIndex } = this.state;
      const { navigation } = this.props;
      const data = navigation.getParam('payData');
      return (
        <View style={styles.container}>
          <Text style={styles.alSel}>请选择付款方式:</Text>
          <View style={{ flex: 1 }}>
            {
              PAY_WAYS.map((item, index) => (
                <TouchableOpacity
                  style={[styles.wrapper, { backgroundColor: item.bgColor }]}
                  onPress={() => this.changePayStatus(index)}
                  key={item.name}
                >
                  <View style={{ alignItems: 'center', flexDirection: 'row', paddingVertical: 10 }}>
                    <Image style={styles.payImage} source={item.subImage} />
                    <Text style={styles.payTitle}>{item.name}</Text>
                  </View>
                  <Image
                    style={styles.paySel}
                    source={choosedIndex === index ? Images.sel : Images.unSel}
                  />
                </TouchableOpacity>
              ))
            }
          </View>
          <BottomPay management={data.management} price={data.price} onPress={debounce(this.pay)} text="立即支付" />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR,
  },
  alSel: {
    color: '#333',
    marginLeft: 10,
    marginTop: 10,
  },
  payImage: {
    width: 56,
    height: 56,
    marginLeft: 15,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  payTitle: {
    fontSize: 17,
    color: 'rgba(255,255,255,1)',
    marginLeft: 10,
  },
  paySel: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 2,
    overflow: 'hidden',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 10,
  },
});
