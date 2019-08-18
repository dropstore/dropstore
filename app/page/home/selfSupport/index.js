/**
 * @file drop自营
 * @date 2019/8/18 14:52
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, ScrollView, RefreshControl, FlatList} from 'react-native';
import TopCom from '../components/TopCom';
import ShopListCom from '../components/ShopListCom';
import Colors from '../../../res/Colors';
import Images from '../../../res/Images';
import {px2Dp} from '../../../utils/ScreenUtil';
import {tempData1} from '../../TempData';

export default class SelfSupport extends PureComponent {
  constructor(props) {
    super(props);
  }
  onRefresh = ()=>{

  };
  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={(
          <RefreshControl
            progressViewOffset={20}
            tintColor={Colors.HEADER_COLOR}
            onRefresh={this.onRefresh}
            refreshing={false}
          />
        )}
        style={{flex: 1, backgroundColor: Colors.NORMAL_TEXT_F6}}>
        <TopCom imageSource={Images.instructions}/>
        <View style={_styles.listContainer}>
          <ShopListCom shopList={tempData1}/>
        </View>
      </ScrollView>
    );
  }
}
const _styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: px2Dp(26),
    marginLeft: px2Dp(15),
    marginRight: px2Dp(18),
  },
});
