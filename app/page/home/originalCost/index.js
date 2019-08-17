/**
 * @file 原价发售
 * @date 2019/8/17 19:11
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TopCom from '../components/TopCom';
import ShopListCom from '../components/ShopListCom';
import Colors from '../../../res/Colors';
import Images from '../../../res/Images';
import {px2Dp} from "../../../utils/ScreenUtil";

export default class OriginalCost extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shopList: [{
        leftImage: Images.xh,
        statusImage: Images.qe,
        shoe: Images.shoe,
        shopTitle: 'CLOT x AIR JORDAN 13 2018版',
        shopSubTitle: '"BLACK INFREAD" EDC 黑红',
        price: 1999,
        time: '2019/01/06 21:00',
        endTime: '10:56:27',
        status: 0
      }, {
        leftImage: Images.xh,
        statusImage: Images.qr,
        shoe: Images.shoe,
        shopTitle: 'CLOT x AIR JORDAN 13 2018版',
        shopSubTitle: '"BLACK INFREAD" EDC 黑红',
        price: 1999,
        time: '2019/01/06 21:00',
        endTime: '10:56:27',
        status: 0
      }, {
        leftImage: Images.xh,
        shoe: Images.shoe,
        shopTitle: 'CLOT x AIR JORDAN 13 2018版',
        shopSubTitle: '"BLACK INFREAD" EDC 黑红',
        price: 1999,
        time: '2019/01/06 21:00',
        endTime: '10:56:27',
        perCount: 999,
        status: 2
      }, {
        leftImage: Images.xh,
        shoe: Images.shoe,
        shopTitle: 'CLOT x AIR JORDAN 13 2018版',
        shopSubTitle: '"BLACK INFREAD" EDC 黑红',
        price: 1999,
        time: '2019/01/06 21:00',
        endTime: '10:56:27',
        status: 3
      }, {
        leftImage: Images.xh,
        shoe: Images.shoe,
        shopTitle: 'CLOT x AIR JORDAN 13 2018版',
        shopSubTitle: '"BLACK INFREAD" EDC 黑红',
        price: 1999,
        time: '2019/01/06 21:00',
        endTime: '10:56:27',
        status: 4
      },{
        leftImage: Images.xh,
        shoe: Images.shoe,
        shopTitle: 'CLOT x AIR JORDAN 13 2018版',
        shopSubTitle: '"BLACK INFREAD" EDC 黑红',
        price: 1999,
        time: '2019/01/06 21:00',
        endTime: '10:56:27',
        status: 4
      },{
        leftImage: Images.xh,
        shoe: Images.shoe,
        shopTitle: 'CLOT x AIR JORDAN 13 2018版',
        shopSubTitle: '"BLACK INFREAD" EDC 黑红',
        price: 1999,
        time: '2019/01/06 21:00',
        endTime: '10:56:27',
        status: 4
      },{
        leftImage: Images.xh,
        shoe: Images.shoe,
        shopTitle: 'CLOT x AIR JORDAN 13 2018版',
        shopSubTitle: '"BLACK INFREAD" EDC 黑红',
        price: 1999,
        time: '2019/01/06 21:00',
        endTime: '10:56:27',
        status: 4
      },{
        leftImage: Images.xh,
        shoe: Images.shoe,
        shopTitle: 'CLOT x AIR JORDAN 13 2018版',
        shopSubTitle: '"BLACK INFREAD" EDC 黑红',
        price: 1999,
        time: '2019/01/06 21:00',
        endTime: '10:56:27',
        status: 4
      },{
        leftImage: Images.xh,
        shoe: Images.shoe,
        shopTitle: 'CLOT x AIR JORDAN 13 2018版',
        shopSubTitle: '"BLACK INFREAD" EDC 黑红',
        price: 1999,
        time: '2019/01/06 21:00',
        endTime: '10:56:27',
        status: 4
      },{
        leftImage: Images.xh,
        shoe: Images.shoe,
        shopTitle: 'CLOT x AIR JORDAN 13 2018版',
        shopSubTitle: '"BLACK INFREAD" EDC 黑红',
        price: 1999,
        time: '2019/01/06 21:00',
        endTime: '10:56:27',
        status: 4
      },{
        leftImage: Images.xh,
        shoe: Images.shoe,
        shopTitle: '1111 x AIR JORDAN 13 2018版',
        shopSubTitle: '"BLACK INFREAD" EDC 黑红',
        price: 1999,
        time: '2019/01/06 21:00',
        endTime: '10:56:27',
        status: 4
      }],
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={{backgroundColor: Colors.NORMAL_TEXT_F6}}>
        <TopCom imageSource={Images.instructions}/>
        <View style={_styles.listContainer}>
          <ShopListCom shopList={this.state.shopList}/>
        </View>
      </View>
    )
  }
}
const _styles = StyleSheet.create({
  listContainer: {
    marginTop: px2Dp(26),
    marginLeft: px2Dp(15),
    marginRight: px2Dp(18),
    marginBottom: px2Dp(30),
  }
});
