/**
 * @file 原价发售
 * @date 2019/8/18 14:52
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TopCom from '../components/TopCom';
import ShopListItemCom from '../components/ShopListItemCom';
import { getActivityInfo } from '../../../redux/reselect/activityList';
import { getActivityList } from '../../../redux/actions/activityList';
import ShopConstant from '../../../common/ShopConstant';
import { PullToRefresh } from '../../../components';

function mapStateToProps() {
  return state => ({
    activityInfo: getActivityInfo(state, ShopConstant.ORIGIN_CONST),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getActivityList,
  }, dispatch);
}

class OriginalCost extends PureComponent {
  constructor(props) {
    super(props);
    const { getActivityList } = this.props;
    getActivityList(ShopConstant.ORIGIN_CONST);
    this.state = {};
  }

  onRefresh = () => {
    const { getActivityList } = this.props;
    getActivityList(ShopConstant.ORIGIN_CONST);
  };

  loadMore = () => {
    const { getActivityList } = this.props;
    getActivityList(ShopConstant.ORIGIN_CONST, { fetchNextPage: true });
  };

  renderItem = ({ item }) => {
    const { navigation } = this.props;
    return <ShopListItemCom navigation={navigation} item={item} />;
  }

  render() {
    const { activityInfo: shopList } = this.props;
    return (
      <PullToRefresh
        totalPages={shopList.totalPages}
        currentPage={shopList.currentPage}
        Wrapper={FlatList}
        style={{ paddingTop: 5 }}
        contentContainerStyle={{ paddingLeft: 1 }}
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

export default connect(mapStateToProps, mapDispatchToProps)(OriginalCost);
