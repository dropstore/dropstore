import React, { PureComponent } from 'react';
import { FlatList, View, Animated } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ImageNetUnkoneSize } from '../../components';
import { getScreenWidth, PADDING_TAB } from '../../common/Constant';
import { getSimpleData } from '../../redux/reselect/simpleData';
import { fetchSimpleData } from '../../redux/actions/simpleData';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const TYPE = 'freeTradeGoodsDetail';

function mapStateToProps() {
  return state => ({
    data: getSimpleData(state, TYPE),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchSimpleData,
  }, dispatch);
}

class ListItemDetail extends PureComponent {
  constructor(props) {
    super(props);
    const { fetchSimpleData, id } = this.props;
    fetchSimpleData(TYPE, { id });
  }

  renderItem = ({ item }) => (
    <ImageNetUnkoneSize
      key={item.image}
      style={{ width: getScreenWidth() }}
      source={{ uri: item.image }}
    />
  );

  render() {
    const { data, onScroll } = this.props;
    if (data.data) {
      return (
        <AnimatedFlatList
          keyExtractor={(item, index) => `${item.image}-${index}`}
          removeClippedSubviews={false}
          showsVerticalScrollIndicator={false}
          initialNumToRender={1}
          data={data.data}
          contentContainerStyle={{ paddingBottom: PADDING_TAB }}
          style={{ flex: 1, backgroundColor: '#fff' }}
          renderItem={this.renderItem}
          onScroll={onScroll}
          scrollEventThrottle={1}
        />
      );
    }
    return <View />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItemDetail);
