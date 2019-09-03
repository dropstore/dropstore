import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SectionList, StyleSheet, Text } from 'react-native';
import TopCom from '../components/TopCom';
import Images from '../../../res/Images';
import { SCREEN_WIDTH } from '../../../common/Constant';
import { getActivityInfo } from '../../../redux/reselect/activityList';
import { getActivityList } from '../../../redux/actions/activityList';
import ShopConstant from '../../../common/ShopConstant';
import PullToRefresh from '../../../components/PullToRefresh';
import ImageBackground from '../../../components/ImageBackground';
import ShopListItemCom from '../components/ShopListItemCom';

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

  againLoad = () => {
    const { getActivityList } = this.props;
    getActivityList(ShopConstant.ORIGIN_CONST);
  };

  renderItem = ({ item }) => (
    <ImageBackground resizeMode="stretch" source={Images.jc} style={styles.content}>
      <ShopListItemCom item={item} />
    </ImageBackground>
  )

  renderSectionHeader = ({ section }) => (
    <ImageBackground resizeMode="stretch" source={Images.ht} style={styles.image}>
      <Text style={styles.text}>{section.title}</Text>
    </ImageBackground>
  )

  render() {
    const { activityInfo } = this.props;
    const list = activityInfo['1'];
    return (
      <PullToRefresh
        totalPages={list.totalPages}
        currentPage={list.currentPage}
        onRefresh={this.onRefresh}
        firstRequest={list.isFetching && list.totalPages < 0}
      >
        <SectionList
          showsVerticalScrollIndicator={false}
          renderSectionHeader={this.renderSectionHeader}
          ListHeaderComponent={<TopCom imageSource={Images.bn} />}
          sections={[
            {
              title: '六月',
              data: list.list,
            },
          ]}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          onEndReached={this.loadMore}
          removeClippedSubviews={false}
          onEndReachedThreshold={0.2}
        />
      </PullToRefresh>
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
    width: SCREEN_WIDTH - 20,
    height: 36,
    marginVertical: 5,
    marginHorizontal: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OriginalCost);
