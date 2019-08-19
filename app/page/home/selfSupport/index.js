/**
 * @file drop自营
 * @date 2019/8/18 14:52
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import TopCom from '../components/TopCom';
import ShopListCom from '../components/ShopListCom';
import Images from '../../../res/Images';
import { tempData1 } from '../../TempData';

export default class SelfSupport extends PureComponent {
  onRefresh = () => {

  };

  loadMore = () => {

  }

  render() {
    return (
      <ShopListCom
        shopList={tempData1}
        loadMore={this.loadMore}
        onRefresh={this.onRefresh}
        ListHeaderComponent={<TopCom imageSource={Images.instructions} />}
      />
    );
  }
}
