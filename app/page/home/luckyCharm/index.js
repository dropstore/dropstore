/**
 * @file 锦鲤列表页
 * @date 2019/9/6
 * @author YDD
 */
import React, { PureComponent } from 'react';
import { FlatList } from 'react-native'
import {AgainLoadCom, PullToRefresh  } from '../../../components'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getActivityInfo } from '../../../redux/reselect/activityList';
import { getActivityList } from '../../../redux/actions/activityList';
import ShopConstant from '../../../common/ShopConstant';
import LuckyItem from './luckItem'

function mapStateToProps() {
  return state => ({
    activityInfo: getActivityInfo(state, ShopConstant.LUCKY_CHARM),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getActivityList,
  }, dispatch);
}

class Lucky extends PureComponent {
  constructor(props) {
    super(props);
    const { getActivityList } = this.props;
    // getActivityList(ShopConstant.LUCKY_CHARM);
    this.state = {};
  }

  onRefresh = () => {
    const { getActivityList } = this.props;
    getActivityList(ShopConstant.LUCKY_CHARM);
  };

  loadMore = () => {
    const { getActivityList } = this.props;
    getActivityList(ShopConstant.LUCKY_CHARM, { fetchNextPage: true });
  };
  _renderItem = ({item,index})=>{
     return <LuckyItem item={item} />
  }

  render() {

    const shopList = this.props.activityInfo
    const list = shopList.list;
    if (shopList.error && list.length === 0) {
      return <AgainLoadCom againLoad={this.onRefresh} />;
    }
    return (
      <PullToRefresh
        totalPages={shopList.totalPages}
        currentPage={shopList.currentPage}
        Wrapper={FlatList}
        style={{ paddingTop: 5 }}
        data = {list}
        refresh={ this.onRefresh }
        renderItem = { this._renderItem }
        onEndReached = { this.loadMore }
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lucky);
