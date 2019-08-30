/**
 * @file 商品列表组件
 * @date 2019/8/17 19:38
 * @author ZWW
 */
import React, {PureComponent} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, Text, View} from 'react-native';
import ShopListItemCom from './ShopListItemCom';
import NoDataCom from '../../../components/NoDataCom';
import AgainLoadCom from '../../../components/AgainLoadCom';
import Colors from '../../../res/Colors';
import Image from "../home/VendorList";
import Images from "../../../res/Images";
import {loadStyle} from "../../../res/style/LoadStyle";

class ShopListCom extends PureComponent {

  renderFooter = () => {
    const {shopList} = this.props;
    if (shopList.totalPages === shopList.currentPage && shopList.totalPages > 0) {
      return (
        <View style={[loadStyle.loadingFooter, {paddingBottom: 50}]}>
          <Text style={loadStyle.loadingText}>--------- 已加载全部 --------- </Text>
        </View>
      );
    }
    return (
      <View style={loadStyle.loadingFooter}>
        <Text style={loadStyle.loadingText}>加载中</Text>
        <Image source={Images.loading} style={loadStyle.loadingGif}/>
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
    const {shopList, ListHeaderComponent, onRefresh, loadMore, againLoad} = this.props;
    const list = shopList.list;
    if (shopList.isSendRequest) {
      // 界面无数据渲染且请求失败的情况下
      if (!shopList.isSuccess && list.length === 0) {
        return <AgainLoadCom againLoad={againLoad}/>
      }
      if (list.length !== 0) {
        return (
          <FlatList
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={5}
            initialNumToRender={10}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={this.renderFooter}
            ListEmptyComponent={<NoDataCom/>}
            ref={(l) => {
              this.shopList = l;
            }}
            data={shopList.list}
            renderItem={this._renderItemView}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            onEndReached={loadMore}
            removeClippedSubviews={false}
            onEndReachedThreshold={0.2}
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
    } else {
      return <ActivityIndicator style={{marginTop: 50}}/>;
    }
  }
}

export default ShopListCom;
