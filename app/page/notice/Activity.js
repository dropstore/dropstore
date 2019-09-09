import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListItem from './ListItem';
import { NavigationBarCom, PullToRefresh } from '../../components';
import { STATUSBAR_AND_NAV_HEIGHT } from '../../common/Constant';
import { fetchNotice } from '../../redux/actions/notice';
import { getActivity } from '../../redux/reselect/notice';

function mapStateToProps() {
  return state => ({
    activity: getActivity(state) || {},
  });
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchNotice,
  }, dispatch);
}

class Activity extends Component {
  constructor(props) {
    super(props);
    this.fetchData();
  }

  fetchData = (fetchMore) => {
    const { fetchNotice } = this.props;
    fetchNotice('/notice/notice_list', 1, fetchMore);
  }

  loadMore = () => {
    this.fetchData(true);
  }

  renderItem = ({ item }) => <ListItem item={item} />

  render() {
    const { activity } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <NavigationBarCom title="活动通知" />
        <PullToRefresh
          Wrapper={FlatList}
          totalPages={activity.totalPages}
          currentPage={activity.currentPage}
          refresh={this.fetchData}
          style={{ marginTop: STATUSBAR_AND_NAV_HEIGHT }}
          data={activity.list}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
