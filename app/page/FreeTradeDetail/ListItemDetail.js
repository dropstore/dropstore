import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ImageNetUnkoneSize } from '../../components';
import { getScreenWidth, PADDING_TAB } from '../../common/Constant';
import { getSimpleData } from '../../redux/reselect/simpleData';
import { fetchSimpleData } from '../../redux/actions/simpleData';

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

  componentWillReceiveProps(nextProps) {
    const { finishRefresh, data } = this.props;
    if (data.isFetching && !nextProps.data.isFetching) {
      finishRefresh();
    }
  }

  refresh = () => {
    const { fetchSimpleData, id } = this.props;
    fetchSimpleData(TYPE, { id }, 'refresh');
  }

  renderItem = ({ item }) => (
    <ImageNetUnkoneSize
      key={item.image}
      style={{ width: getScreenWidth() }}
      source={{ uri: item.image }}
    />
  );

  render() {
    const { data } = this.props;
    if (data.data) {
      return (
        <FlatList
          keyExtractor={(item, index) => `${item.image}-${index}`}
          removeClippedSubviews={false}
          initialNumToRender={1}
          data={data.data}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          renderItem={this.renderItem}
        />
      );
    }
    return <View />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(ListItemDetail);
