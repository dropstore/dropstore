import React, { PureComponent } from 'react';
import { View, ScrollView,Text, StyleSheet } from 'react-native';
import TopCom from '../components/TopCom';
import VendorSection from './VendorSection'
import Colors from '../../../res/Colors';
import Images from '../../../res/Images';
import { px2Dp } from '../../../utils/ScreenUtil';

// export default class Home extends PureComponent {
//   render() {
//     return <VendorList />;
//   }
// }
export default class Reserve extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shopList: {
        'MAY 5月': [{
          leftImage: Images.xh,
          statusImage: Images.qe,
          shoe: Images.shoe,
          shopTitle: 'CLOT x AIR JORDAN 13 2018版 CLOT x AIR JORDAN 13 2018版',
          shopSubTitle: ' "BLACK INFREAD" EDC 黑红 "BLACK INFREAD" EDC 黑红',
          price: 1999,
          time: '2019/01/06 21:00',
          endTime: '10:56:27',
          status: 0,
        }, {
          leftImage: Images.xh,
          statusImage: Images.qr,
          shoe: Images.shoe,
          shopTitle: 'CLOT x AIR JORDAN 13 2018版',
          shopSubTitle: '"BLACK INFREAD" EDC 黑红',
          price: 1999,
          time: '2019/01/06 21:00',
          endTime: '10:56:27',
          status: 0,
        }, {
          leftImage: Images.xh,
          shoe: Images.shoe,
          shopTitle: 'CLOT x AIR JORDAN 13 2018版',
          shopSubTitle: '"BLACK INFREAD" EDC 黑红',
          price: 1999,
          time: '2019/01/06 21:00',
          endTime: '10:56:27',
          perCount: 999,
          status: 2,
        }, {
          leftImage: Images.xh,
          shoe: Images.shoe,
          shopTitle: 'CLOT x AIR JORDAN 13 2018版',
          shopSubTitle: '"BLACK INFREAD" EDC 黑红',
          price: 1999,
          time: '2019/01/06 21:00',
          endTime: '10:56:27',
          status: 3,
        }],
        'JUN 6月':[{
          leftImage: Images.xh,
          statusImage: Images.qe,
          shoe: Images.shoe,
          shopTitle: 'CLOT x AIR JORDAN 13 2018版 CLOT x AIR JORDAN 13 2018版',
          shopSubTitle: ' "BLACK INFREAD" EDC 黑红 "BLACK INFREAD" EDC 黑红',
          price: 1999,
          time: '2019/01/06 21:00',
          endTime: '10:56:27',
          status: 0,
        }, {
          leftImage: Images.xh,
          statusImage: Images.qr,
          shoe: Images.shoe,
          shopTitle: 'CLOT x AIR JORDAN 13 2018版',
          shopSubTitle: '"BLACK INFREAD" EDC 黑红',
          price: 1999,
          time: '2019/01/06 21:00',
          endTime: '10:56:27',
          status: 0,
        }, {
          leftImage: Images.xh,
          shoe: Images.shoe,
          shopTitle: 'CLOT x AIR JORDAN 13 2018版',
          shopSubTitle: '"BLACK INFREAD" EDC 黑红',
          price: 1999,
          time: '2019/01/06 21:00',
          endTime: '10:56:27',
          perCount: 999,
          status: 2,
        }, {
          leftImage: Images.xh,
          shoe: Images.shoe,
          shopTitle: 'CLOT x AIR JORDAN 13 2018版',
          shopSubTitle: '"BLACK INFREAD" EDC 黑红',
          price: 1999,
          time: '2019/01/06 21:00',
          endTime: '10:56:27',
          status: 3,
        }]
      }
    };
  }
  render() {
    return <ScrollView style={{ backgroundColor: Colors.NORMAL_TEXT_F6, flex: 1 }}>
      <TopCom imageSource={Images.bn} />
      <View style={_styles.listContainer}>
        {
          Object.keys( this.state.shopList).map( key => <VendorSection title={key} shopList={this.state.shopList[key]} />)
        }
      </View>
    </ScrollView>
  }
}

const _styles = StyleSheet.create({
  listContainer: {
    marginTop: px2Dp(26),
    marginLeft: px2Dp(15),
    marginRight: px2Dp(18),
    flex: 1,
  },
});
