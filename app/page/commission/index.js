import React, { PureComponent } from 'react';
import {
  StyleSheet, Text, TextInput, View,
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardDismiss, BottomPay } from '../../components';
import { getScreenWidth, PADDING_TAB } from '../../common/Constant';
import Colors from '../../res/Colors';
import { Normal, YaHei } from '../../res/FontFamily';
import { getSimpleData } from '../../redux/reselect/simpleData';
import { setCommission, getPayMes } from '../../redux/actions/shopDetailInfo';
import ShopConstant from '../../common/ShopConstant';
import { wPx2P, hPx2P } from '../../utils/ScreenUtil';

function mapStateToProps() {
  return state => ({
    activityInfo: getSimpleData(state, 'activityInfo'),
  });
}

class Commission extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
      number: 0,
      commission: 0, // 服务器返回的已设置的单双佣金
      inputCommission: 0, // 输入的单双佣金
    };
  }

  componentDidMount() {
    const { activityInfo: { data } } = this.props;
    getPayMes(data.activity.id, data.user_activity.id).then((res) => {
      if (res.data) {
        const number = res.data.number;
        const commission = res.data.commission / 100;
        this.setState({ number, commission, totalPrice: number * commission });
      }
    });
  }

  _toPay = () => {
    const { inputCommission } = this.state;
    const { activityInfo: { data: shopInfo }, navigation } = this.props;
    // let minPrice = shopInfo.activity.min_price;
    if (inputCommission < 1) {
      // return showToast(`单人佣金不能低于1元`);
    }
    const acId = shopInfo.user_activity.id;
    setCommission(shopInfo.activity.id, acId, inputCommission).then((res) => {
      navigation.navigate('pay', {
        title: '选择支付账户',
        type: ShopConstant.PAY_COMMISSION,
        payData: res.data,
        shopInfo,
      });
    });
  };

  onChange = (event) => {
    const { number } = this.state;
    const singlePrice = event.nativeEvent.text;
    this.setState({ inputCommission: singlePrice, totalPrice: singlePrice * number });
  };

  render() {
    const { commission, totalPrice, number } = this.state;
    return (
      <KeyboardDismiss style={styles.container}>
        <View style={styles.mainView}>
          <Text style={styles.countTitle}>
            {'合计数量 '}
            <Text style={styles.count}>{number}</Text>
            {' 双'}
          </Text>
          <TextInput
            maxLength={13}
            editable={commission == 0}
            keyboardType="numeric"
            selectionColor="#00AEFF"
            placeholder={commission != 0 ? commission.toString() : '填写佣金...'}
            placeholderTextColor="rgba(162,162,162,1)"
            underlineColorAndroid="transparent"
            style={styles.pricePh}
            clearButtonMode="while-editing"
            returnKeyType="next"
            onSubmitEditing={this._toPay}
            ref={(v) => { this.valueInput = v; }}
            onChange={this.onChange}
          />
          <Text style={styles.tip}>{commission != 0 ? '已填写单双佣金' : '请填写单双佣金'}</Text>
        </View>
        <BottomPay disabled={totalPrice * 1 <= 0} price={totalPrice * 100} onPress={this._toPay} />
      </KeyboardDismiss>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.MAIN_BACK,
  },
  mainView: {
    flex: 1,
    marginTop: hPx2P(160),
    marginHorizontal: wPx2P(60),
  },
  countTitle: {
    fontSize: 13,
    fontFamily: YaHei,
    fontWeight: '400',
    color: '#000',
  },
  count: {
    fontSize: 13,
    fontFamily: YaHei,
    fontWeight: 'bold',
    color: '#37B6EB',
  },
  payTitle: {
    fontSize: 12,
    color: 'rgba(0,0,0,1)',
    marginLeft: 10,
  },
  inputBg: {
    width: 259,
    height: 60,
  },
  pricePh: {
    height: 36,
    backgroundColor: '#fff',
    fontSize: 14,
    color: 'rgba(162,162,162,1)',
    borderRadius: 2,
    overflow: 'hidden',
    marginVertical: 10,
    paddingHorizontal: 8,
  },
  tip: {
    fontSize: 12,
    color: 'rgba(0,0,0,1)',
    textAlign: 'right',
  },
  bottomView: {
    width: getScreenWidth(),
    height: 61 + PADDING_TAB,
    paddingBottom: PADDING_TAB,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(215, 215, 215, 1)',
  },
  bottomLeftView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonOnlyOneChildView: {
    width: 178,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  price: {
    fontSize: 29,
    fontFamily: YaHei,
    fontWeight: '400',
    color: 'rgba(0,0,0,1)',
    marginLeft: 10,
  },
  bottomRightView: {
    width: 178,
    height: 49,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
    marginRight: 7,
    marginLeft: 23,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Normal,
    color: 'rgba(255,255,255,1)',
  },
});

export default connect(mapStateToProps)(Commission);
