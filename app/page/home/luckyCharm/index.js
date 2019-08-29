import React, {PureComponent} from "react";
import {getActivityInfo} from "../../../redux/reselect/activityList";
import {bindActionCreators} from "redux";
import {getActivityList} from "../../../redux/actions/activityList";
import ShopConstant from "../../../common/ShopConstant";
import ShopListCom from "../selfSupport";
import TopCom from "../components/TopCom";
import Images from "../../../res/Images";
import {connect} from "react-redux";

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

class Lucky extends PureComponent {
  constructor(props) {
    super(props);
    const {getActivityList} = this.props;
    getActivityList(ShopConstant.LUCKY_CHARM);
    this.state = {};
  }

  onRefresh = () => {
    const {getActivityList} = this.props;
    getActivityList(ShopConstant.LUCKY_CHARM);
  };

  loadMore = () => {
    const {getActivityList} = this.props;
    getActivityList(ShopConstant.LUCKY_CHARM, {fetchNextPage: true});
  };

  render() {
    const {activityInfo} = this.props;
    return (
      <ShopListCom
        shopList={activityInfo[ShopConstant.LUCKY_CHARM]}
        loadMore={this.loadMore}
        onRefresh={this.onRefresh}
        ListHeaderComponent={<TopCom imageSource={Images.instructions}/>}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lucky)
