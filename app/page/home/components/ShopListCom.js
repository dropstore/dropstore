/**
 * @file 商品列表组件
 * @date 2019/8/17 19:38
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';
import ShopListItemCom from './ShopListItemCom';

class ShopListCom extends PureComponent {
  constructor(props) {
    super(props);
  }

  loadMore = () => {

  };

  renderFooter = () => {

  };

  _renderItemView = ({ item }) => <ShopListItemCom item={item} />;

  render() {
    const { shopList } = this.props;
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

      />
    );
  }
}

export default ShopListCom;
