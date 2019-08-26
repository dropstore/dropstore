/**
 * @file 商品列表组件
 * @date 2019/8/17 19:38
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, Text, View} from 'react-native';
import ShopListItemCom from './ShopListItemCom';
import Colors from '../../../res/Colors';
import Image from "../home/VendorList";
import Images from "../../../res/Images";

class ShopListCom extends PureComponent {

  renderFooter = () => {
    const {shopList} = this.props;
    if (shopList.totalPages === shopList.currentPage && shopList.totalPages > 0) {
      return (
        <View style={styles.loadingFooter}>
          <Text style={styles.loadingText}>没有更多了</Text>
        </View>
      );
    }
    return (
      <View style={styles.loadingFooter}>
        <Text style={styles.loadingText}>加载中</Text>
        <Image source={Images.loading} style={styles.loadingGif}/>
      </View>
    );
  };

  _renderItemView = ({item, index}) => {
    const {firstCom} = this.props;
    if (firstCom && index === 0) {
      return firstCom;
    }
    return <ShopListItemCom item={item}/>;
  };

  render() {
    const {shopList, ListHeaderComponent, onRefresh, loadMore} = this.props;
    if (shopList.isFetching && shopList.totalPages < 0) {
      return <ActivityIndicator style={{marginTop: 50}}/>;
    }
    if (!shopList.isSuccess) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alert: 'center'}}>
          <Text>网络连接失败</Text>
        </View>
      )
    }
    if(shopList.list.length!==0){
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={5}
          initialNumToRender={3}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={this.renderFooter}
          ref={(l) => {
            this.shopList = l;
          }}
          data={shopList.list}
          renderItem={this._renderItemView}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          onEndReached={loadMore}
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
    return (
      <View style={{flex: 1, justifyContent: 'center', alert: 'center'}}>
        <Text>暂无数据</Text>
      </View>
    )
  }
}

export default ShopListCom;
