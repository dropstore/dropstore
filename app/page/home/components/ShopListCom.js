/**
 * @file 商品列表组件
 * @date 2019/8/17 19:38
 * @author ZWW
 */

import React, {PureComponent} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import ShopListItemCom from '../components/ShopListItemCom';
import {SCREEN_HEIGHT} from '../../../common/Constant';
import Colors from '../../../res/Colors';

class ShopListCom extends PureComponent {
  constructor(props) {
    super(props);
  }

  onRefresh = () => {

  };

  loadMore = () => {

  };
  renderFooter = () => {

  };
  _renderItemView = ({item}) => <ShopListItemCom shopList={item}/>;

  render() {
    const {shopList} = this.props;
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={5}
        initialNumToRender={3}
        // ListHeaderComponent={this.renderHeader}
        // ListFooterComponent={this.renderFooter}
        ref={(l) => {
          this.shopList = l;
        }}
        data={shopList}
        renderItem={this._renderItemView}
        // keyExtractor={(item, index) => `${}-${index}`}
        onEndReached={this.loadMore}
        removeClippedSubviews={false}
        onEndReachedThreshold={0.5}
        refreshControl={<RefreshControl progressViewOffset={20} tintColor={Colors.HEADER_COLOR}
                                        onRefresh={this.onRefresh} refreshing={false}/>}
      />
    )
  }
}

export default ShopListCom;
