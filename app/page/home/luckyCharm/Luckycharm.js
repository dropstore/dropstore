/**
 *@file  球鞋锦鲤
 *@date 2019/8/18
 *@author YDD
 */
import React, { PureComponent } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '../../../common/Constant';
import Images from '../../../res/Images';
import Colors from '../../../res/Colors';
import TopCom from '../components/TopCom';
import ShopList from '../components/ShopListCom';
import { px2Dp } from '../../../utils/ScreenUtil';
import { YaHei } from '../../../res/FontFamily';

class MyTopImage extends React.PureComponent {
  _onPress = () => {

  };

  render() {
    return (
      <View>
        <TopCom imageSource={Images.instructions} />
      </View>
    );
  }
}

export default class LuckyCharmList extends PureComponent {
  state = {
    selected: true,
    shopList: [{
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
    }, {
      leftImage: Images.xh,
      shoe: Images.shoe,
      shopTitle: 'CLOT x AIR JORDAN 13 2018版',
      shopSubTitle: '"BLACK INFREAD" EDC 黑红',
      price: 1999,
      time: '2019/01/06 21:00',
      endTime: '10:56:27',
      status: 4,
    }, {
      leftImage: Images.xh,
      shoe: Images.shoe,
      shopTitle: 'CLOT x AIR JORDAN 13 2018版',
      shopSubTitle: '"BLACK INFREAD" EDC 黑红',
      price: 1999,
      time: '2019/01/06 21:00',
      endTime: '10:56:27',
      status: 4,
    }, {
      leftImage: Images.xh,
      shoe: Images.shoe,
      shopTitle: 'CLOT x AIR JORDAN 13 2018版',
      shopSubTitle: '"BLACK INFREAD" EDC 黑红',
      price: 1999,
      time: '2019/01/06 21:00',
      endTime: '10:56:27',
      status: 4,
    }, {
      leftImage: Images.xh,
      shoe: Images.shoe,
      shopTitle: 'CLOT x AIR JORDAN 13 2018版',
      shopSubTitle: '"BLACK INFREAD" EDC 黑红',
      price: 1999,
      time: '2019/01/06 21:00',
      endTime: '10:56:27',
      status: 4,
    }, {
      leftImage: Images.xh,
      shoe: Images.shoe,
      shopTitle: 'CLOT x AIR JORDAN 13 2018版',
      shopSubTitle: '"BLACK INFREAD" EDC 黑红',
      price: 1999,
      time: '2019/01/06 21:00',
      endTime: '10:56:27',
      status: 4,
    }, {
      leftImage: Images.xh,
      shoe: Images.shoe,
      shopTitle: 'CLOT x AIR JORDAN 13 2018版',
      shopSubTitle: '"BLACK INFREAD" EDC 黑红',
      price: 1999,
      time: '2019/01/06 21:00',
      endTime: '10:56:27',
      status: 4,
    }, {
      leftImage: Images.xh,
      shoe: Images.shoe,
      shopTitle: 'CLOT x AIR JORDAN 13 2018版',
      shopSubTitle: '"BLACK INFREAD" EDC 黑红',
      price: 1999,
      time: '2019/01/06 21:00',
      endTime: '10:56:27',
      status: 4,
    }, {
      leftImage: Images.xh,
      shoe: Images.shoe,
      shopTitle: '1111 x AIR JORDAN 13 2018版',
      shopSubTitle: '"BLACK INFREAD" EDC 黑红',
      price: 1999,
      time: '2019/01/06 21:00',
      endTime: '10:56:27',
      status: 4,
    }],
  };

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id) => {
      Alert(`被惦记的id是${id}`);
    };

  _renderItem = ({ item, index }) => (index == 0 ? (<MyTopImage />) : (
    <MyListItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected
      title={item.title}
    />
  ));

  _renderHeader = () => (<MyTopImage />)

  render() {
    return (
      <View style={{ backgroundColor: Colors.NORMAL_TEXT_F6, flex: 1 }}>
        <View style={styles.listContainer}>
          <ShopList
            shopList={this.state.shopList}
            firstCom={<MyTopImage />}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  customerNotes: {
    width: 717,
    height: 301,

  },
  listContainer: {
    marginTop: px2Dp(26),
    marginLeft: px2Dp(15),
    marginRight: px2Dp(18),
    flex: 1,
  },
  nameText: {
    maxWidth: SCREEN_WIDTH - 175,
    flexShrink: 1,
    fontFamily: YaHei,
    lineHeight: 24,
    fontSize: 15,
    color: '#333333',
    fontWeight: '500',
    marginRight: 13,
  },
  imageBox: {
    padding: 10,
    margin: 10,
  },
});
