/**
 * @file 原价发售
 * @date 2019/8/18 14:52
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TopCom from '../components/TopCom';
import ShopListCom from '../components/ShopListCom';
import Images from '../../../res/Images';
import { getActivityInfo } from '../../../redux/reselect/activityList';
import { getActivityList } from '../../../redux/actions/activityList';
import ShopConstant from '../../../common/ShopConstant';

function mapStateToProps() {
  return state => ({
    activityInfo: getActivityInfo(state),
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

  render() {
    const { activityInfo } = this.props;
    return (
      <ShopListCom
        shopList={activityInfo[ShopConstant.ORIGIN_CONST]}
        loadMore={this.loadMore}
        onRefresh={this.onRefresh}
        ListHeaderComponent={<TopCom bannerId={1} imageSource={Images.instructions} />}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OriginalCost);
