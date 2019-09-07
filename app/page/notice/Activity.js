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
    const list = [{
      activity_name: 'AIR JORDAN 1 HIGH OG 2018版“ORIGIN STORY”蜘蛛侠 ',
      type: '1',
      end_time: Date.now() / 1000 + 60 * 5 + 5,
      time: Date.now() / 1000 + 5,
      size: '42.5',
    }, {
      activity_name: 'AIR JORDAN 1 HIGH OG 2018版“ORIGIN STORY”蜘蛛侠 ',
      type: '2',
      end_time: Date.now() / 1000 + 60 * 5 + 60,
      time: Date.now() / 1000 + 60,
      size: '42.5',
    }, {
      activity_name: 'AIR JORDAN 1 HIGH OG 2018版“ORIGIN STORY”蜘蛛侠 ',
      type: '3',
      end_time: Date.now() / 1000 + 60 * 5,
      time: Date.now() / 1000,
      size: '42.5',
    }, {
      activity_name: 'AIR JORDAN 1 HIGH OG 2018版“ORIGIN STORY”蜘蛛侠 ',
      type: '6',
      end_time: Date.now() / 1000 + 60 * 5,
      time: Date.now() / 1000,
      size: '42.5',
    }];
    return (
      <View style={{ flex: 1 }}>
        <NavigationBarCom title="活动通知" />
        <PullToRefresh
          Wrapper={FlatList}
          totalPages={activity.totalPages}
          currentPage={activity.currentPage}
          refresh={this.fetchData}
          style={{ marginTop: STATUSBAR_AND_NAV_HEIGHT }}
          data={list}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
