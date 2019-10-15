/**
 * @file drop自营
 * @date 2019/8/18 14:52
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import TopCom from '../components/TopCom';
import { getActivityInfo } from '../../../redux/reselect/activityList';
import { getActivityList } from '../../../redux/actions/activityList';
import ShopConstant from '../../../common/ShopConstant';
import { PullToRefresh } from '../../../components';
import ShopListItemCom from '../components/ShopListItemCom';

function mapStateToProps() {
  return state => ({
    activityInfo: getActivityInfo(state, ShopConstant.SELF_SUPPORT),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getActivityList,
  }, dispatch);
}

class SelfSupport extends PureComponent {
  constructor(props) {
    super(props);
    const { getActivityList } = this.props;
    getActivityList(ShopConstant.SELF_SUPPORT);
    this.state = {};
  }

  onRefresh = () => {
    const { getActivityList } = this.props;
    getActivityList(ShopConstant.SELF_SUPPORT);
  };

  loadMore = () => {
    const { getActivityList } = this.props;
    getActivityList(ShopConstant.SELF_SUPPORT, { fetchNextPage: true });
  };

  renderItem = ({ item, index }) => {
    const { navigation } = this.props;
    return <ShopListItemCom index={index} navigation={navigation} item={item} />;
  }

  render() {
    const { activityInfo: shopList } = this.props;
    return (
      <PullToRefresh
        totalPages={shopList.totalPages}
        currentPage={shopList.currentPage}
        Wrapper={FlatList}
        ListHeaderComponent={<TopCom bannerId={2} />}
        data={shopList.list}
        numColumns={2}
        refresh={this.onRefresh}
        renderItem={this.renderItem}
        onEndReached={this.loadMore}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelfSupport);
