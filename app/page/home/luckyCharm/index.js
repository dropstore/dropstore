import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getActivityInfo } from '../../../redux/reselect/activityList';
import { getActivityList } from '../../../redux/actions/activityList';
import ShopConstant from '../../../common/ShopConstant';
import ShopListCom from '../selfSupport';
import TopCom from '../components/TopCom';
import Images from '../../../res/Images';

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
    getActivityList(ShopConstant.LUCKY_CHARM);
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

  render() {
    const { activityInfo } = this.props;
    return (
      <ShopListCom
        shopList={activityInfo}
        loadMore={this.loadMore}
        onRefresh={this.onRefresh}
        ListHeaderComponent={<TopCom bannerId={3} imageSource={Images.instructions} />}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lucky);
