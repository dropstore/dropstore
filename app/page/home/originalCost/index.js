/**
 * @file 原价发售
 * @date 2019/8/17 19:11
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import TopCom from '../components/TopCom';
import ShopListCom from '../components/ShopListCom';

import Images from '../../../res/Images';
import { tempData } from '../../TempData';

export default class OriginalCost extends PureComponent {
  onRefresh = () => {

  };

  loadMore = () => {

  }

  render() {
    return (
      <ShopListCom
        shopList={tempData}
        loadMore={this.loadMore}
        onRefresh={this.onRefresh}
        ListHeaderComponent={<TopCom imageSource={Images.instructions} />}
      />
    );
  }
}
