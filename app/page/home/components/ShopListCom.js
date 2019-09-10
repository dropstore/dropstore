/**
 * @file 商品列表组件
 * @date 2019/8/17 19:38
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import ShopListItemCom from './ShopListItemCom';
import { AgainLoadCom, PullToRefresh } from '../../../components';

class ShopListCom extends PureComponent {
  _renderItemView = ({ item, index }) => {
    return <ShopListItemCom item={item} />;
  };

  render() {
    const {
      shopList, ListHeaderComponent, onRefresh, loadMore,
    } = this.props;
    const list = shopList.list;
    if (shopList.error && list.length === 0) {
      return <AgainLoadCom againLoad={onRefresh} />;
    }
    return (
      <PullToRefresh
        totalPages={shopList.totalPages}
        currentPage={shopList.currentPage}
        Wrapper={FlatList}
        style={{ paddingTop: 5 }}
        ListHeaderComponent={ListHeaderComponent}
        data={shopList.list}
        refresh={onRefresh}
        renderItem={this._renderItemView}
        onEndReached={loadMore}
      />
    );
  }
}

export default ShopListCom;
