/**
 *@file  球鞋锦鲤
 *@date 2019/8/18
 *@author YDD
 */
import React, { PureComponent } from 'react';
import {StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { SCREEN_WIDTH } from '../../../common/Constant';
import Images from '../../../res/Images';
import Colors from '../../../res/Colors';
import TopCom from '../components/TopCom';
import ShopList from '../components/ShopListCom';
import { px2Dp } from '../../../utils/ScreenUtil';
import { YaHei } from '../../../res/FontFamily';


function mapStateToProps(){
  return state =>({

  })
}

class LuckyCharmList extends PureComponent {
  state = {
    selected: true,
  };

  render() {
    return (
          <ShopList
            shopList={this.state.shopList}
            loadMore={this.loadMore}
            onRefresh={this.onRefresh}
            ListHeaderComponent={<TopCom imageSource={Images.instructions}/>}
          />
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(LuckyCharmList)


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
