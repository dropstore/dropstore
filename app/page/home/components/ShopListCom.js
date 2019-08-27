/**
 * @file 商品列表组件
 * @date 2019/8/17 19:38
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import ShopListItemCom from './ShopListItemCom';
import Colors from '../../../res/Colors';

class ShopListCom extends PureComponent {
  loadMore = () => {

  };

  renderFooter = () => {

  };

  _renderItemView = ({ item, index }) => {
    const { firstCom } = this.props;
    if (firstCom && index === 0) {
      return firstCom;
    }
    return <ShopListItemCom item={item} />;
  };

  render() {
    const { shopList, ListHeaderComponent, onRefresh } = this.props;
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={5}
        initialNumToRender={3}
        ListHeaderComponent={ListHeaderComponent}
        // ListFooterComponent={this.renderFooter}
        ref={(l) => { this.shopList = l; }}
        data={shopList}
        renderItem={this._renderItemView}
        // keyExtractor={(item, index) => `${}-${index}`}
        onEndReached={this.loadMore}
        removeClippedSubviews={false}
        onEndReachedThreshold={0.5}
        refreshControl={(
          <RefreshControl
            progressViewOffset={20}
            tintColor={Colors.HEADER_COLOR}
            onRefresh={onRefresh}
            refreshing={false}
          />
        )}
      />
    );
  }
}

export default ShopListCom;