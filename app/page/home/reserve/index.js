import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SectionList, StyleSheet, Text } from 'react-native';
import TopCom from '../components/TopCom';
import Images from '../../../res/Images';
import { getScreenWidth } from '../../../common/Constant';
import { getActivityInfo } from '../../../redux/reselect/activityList';
import { getActivityList } from '../../../redux/actions/activityList';
import ShopConstant from '../../../common/ShopConstant';
import PullToRefresh from '../../../components/PullToRefresh';
import ImageBackground from '../../../components/ImageBackground';
import ShopListItemCom from '../components/ShopListItemCom';

function mapStateToProps() {
  return state => ({
    activityInfo: getActivityInfo(state, ShopConstant.RESERVE),
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
    getActivityList(ShopConstant.RESERVE);
  }

  onRefresh = () => {
    const { getActivityList } = this.props;
    getActivityList(ShopConstant.RESERVE);
  };

  loadMore = () => {
    const { getActivityList } = this.props;
    getActivityList(ShopConstant.RESERVE, { fetchNextPage: true });
  };

  renderItem = ({ item }) => (
    <ImageBackground resizeMode="stretch" style={styles.content}>
      <ShopListItemCom item={item} />
    </ImageBackground>
  )

  renderSectionHeader = ({ section }) => (
    <ImageBackground resizeMode="stretch" style={styles.image}>
      <Text style={styles.text}>{section.title}</Text>
    </ImageBackground>
  )

  render() {
    const { activityInfo } = this.props;
    return (
      <PullToRefresh
        Wrapper={SectionList}
        totalPages={activityInfo.totalPages}
        currentPage={activityInfo.currentPage}
        refresh={this.onRefresh}
        renderSectionHeader={this.renderSectionHeader}
        ListHeaderComponent={<TopCom bannerId={4} />}
        sections={[
          {
            title: '六月',
            data: activityInfo.list,
          },
        ]}
        stickySectionHeadersEnabled={false}
        renderItem={this.renderItem}
        onEndReached={this.loadMore}
      />
    );
  }
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: 3,
    marginVertical: 3,
  },
  title: {
    flex: 1,
    height: 36,
    marginBottom: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 36,
    fontWeight: '500',
    color: '#ffffff',
  },
  image: {
    width: getScreenWidth() - 20,
    height: 36,
    marginVertical: 5,
    marginHorizontal: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OriginalCost);
