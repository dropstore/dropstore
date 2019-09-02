/**
 * @file 商品列表组件
 * @date 2019/8/17 19:38
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import ShopListItemCom from './ShopListItemCom';
import AgainLoadCom from '../../../components/AgainLoadCom';
import PullToRefresh from '../../../components/PullToRefresh';

class ShopListCom extends PureComponent {
  _renderItemView = ({ item, index }) => {
    const { firstCom } = this.props;
    if (firstCom && index === 0) {
      return firstCom;
    }
    return <ShopListItemCom item={item} />;
  };

  render() {
    const {
      shopList, ListHeaderComponent, onRefresh, loadMore, againLoad,
    } = this.props;
    const list = shopList.list;
    if (shopList.error && list.length === 0) {
      return <AgainLoadCom againLoad={againLoad} />;
    }
    return (
      <PullToRefresh
        totalPages={shopList.totalPages}
        currentPage={shopList.currentPage}
        onRefresh={onRefresh}
        firstRequest={shopList.isFetching && shopList.totalPages < 0}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={5}
          initialNumToRender={10}
          ListHeaderComponent={ListHeaderComponent}
          // ListEmptyComponent={<NoDataCom />}
          ref={(l) => { this.shopList = l; }}
          data={shopList.list}
          renderItem={this._renderItemView}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          onEndReached={loadMore}
          removeClippedSubviews={false}
          onEndReachedThreshold={0.2}
        />
      </PullToRefresh>
    );
  }
}

export default ShopListCom;
