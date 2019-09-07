import React, { Component } from 'react';
import {
  SectionList, View, Text, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListItem from './ListItem';
import Images from '../../res/Images';
import NavigationBarCom from '../../components/NavigationBarCom';
import { STATUSBAR_AND_NAV_HEIGHT } from '../../common/Constant';
import { fetchNotice } from '../../redux/actions/notice';
import { getActivity } from '../../redux/reselect/notice';

function mapStateToProps() {
  return state => ({
    activity: getActivity(state),
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
    fetchNotice('/notice/notice_list', 'activity', fetchMore);
  }

  loadMore = () => {
    this.fetchData(true);
  }

  renderItem = ({ item }) => <ListItem item={item} />

  renderSectionHeader = ({ section }) => <Text style={styles.header}>{section.title}</Text>

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationBarCom headerTitle="系统通知" isShowLeftView={false} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 22,
    marginBottom: 6,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
