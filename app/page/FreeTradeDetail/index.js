import React, { PureComponent } from 'react';
import {
  View, StyleSheet, Text, ScrollView, PanResponder,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Image, Price } from '../../components';
import { getOrderStateList } from '../../redux/reselect/orderState';
import { fetchOrderStateList } from '../../redux/actions/orderState';
import { wPx2P } from '../../utils/ScreenUtil';
import Colors from '../../res/Colors';
import TabView from './TabView';

function mapStateToProps() {
  return state => ({
    orderStateList: getOrderStateList(state, 'uncomplete') || {},
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchOrderStateList,
  }, dispatch);
}

class FreeTradeDeatil extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true,
    };
  }

  componentWillMount() {
    this.scollerPanResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: () => {
        if (this.scrollY >= 129) {
          return false;
        }
        return true;
      },
    });
  }

  ListHeaderComponent = () => {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    return (
      <View style={styles.item}>
        <Image style={styles.shoe} source={{ uri: item.goods.image }} />
        <View style={{ justifyContent: 'space-around', flex: 1, marginLeft: 10 }}>
          <Text style={{ fontSize: 12, textAlign: 'justify' }}>{item.goods.goods_name}</Text>
          <View style={{ alignItems: 'flex-end' }}>
            <Price price={item.order_price} />
          </View>
        </View>
      </View>
    );
  }

  onScroll = ({ nativeEvent: { contentOffset: { y } } }) => {
    this.scrollY = y;
    // if (y > 129) {
    //   this.setState({ scrollEnabled: false });
    // } else {
    //   this.setState({ scrollEnabled: true });
    // }
  }

  render() {
    const { scrollEnabled } = this.state;
    return (
      <ScrollView
        {...this.scollerPanResponder.panHandlers}
        nestedScrollEnabled
        scrollEnabled={scrollEnabled}
        ref={(v) => { this.scrollView = v; }}
        // stickyHeaderIndices={[1]}
        style={styles.container}
        scrollEventThrottle={1}
        onScroll={this.onScroll}
        showsVerticalScrollIndicator={false}
      >
        {this.ListHeaderComponent()}
        <TabView ref={(v) => { this.tabview = v; }} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginHorizontal: 8,
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 2,
    overflow: 'hidden',
    height: 121,
  },
  shoe: {
    width: wPx2P(166),
    height: wPx2P(97),
  },
  container: {
    flex: 1,
    backgroundColor: Colors.MAIN_BACK,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FreeTradeDeatil);
