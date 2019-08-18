/**
 * @file 商品详情
 * @date 2019/8/18 15:55
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import ShopBasicInfoCom from './components/ShopBasicInfoCom';
import ShopMoreInfoCom from './components/ShopMoreInfoCom';
import ImageBackgroundCom from '../../components/ImageBackgroundCom';
import Colors from '../../res/Colors';
import Images from '../../res/Images';
import {SCREEN_WIDTH} from '../../common/Constant';

export default class ShopDetail extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigation} = this.props;
    const item = navigation.getParam('item');
    return (
      <View style={_styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <ShopBasicInfoCom item={item}/>
          <ShopMoreInfoCom/>
        </ScrollView>
        <ImageBackgroundCom
          source={Images.hk}
          style={{width:SCREEN_WIDTH}}
          onPress={() => alert('通知我')}>
          <Text style={{
            fontSize: 14,
            color: Colors.HEADER_COLOR,
            textAlign: 'center',
          }}>分享活动，参与抽签</Text>
        </ImageBackgroundCom>
      </View>
    )
  }
}
const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR
  },
  // emptyView: {
  //   width: '100%',
  //   height: 18,
  //   backgroundColor: Colors.NORMAL_TEXT_F6
  // },

});
