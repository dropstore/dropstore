import React, { PureComponent } from 'react';
import {
  FlatList, RefreshControl, ActivityIndicator, View, Text, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import ShopListItemCom from '../components/ShopListItemCom';
import { bindActionCreators } from 'redux';
import { fetchVendors } from '../../../redux/actions/test';
import { getVendors } from '../../../redux/reselect/test';
import Colors from '../../../res/Colors';
import Image from '../../../components/Image';
import Images from '../../../res/Images';

function mapStateToProps() {
  return state => ({
    vendors: getVendors(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchVendors,
  }, dispatch);
}


class CardSection extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { vendors, shopList, title } = this.props;
    if (vendors.isFetching && vendors.totalPages < 0) {
      return <ActivityIndicator style={{ marginTop: 50 }} />;
    }
    return (
      <View>
          <Text style={styles.title}>{title}</Text>
          <View>
              {
                shopList.map( item => <ShopListItemCom item={item}/> )
              }
          </View>
          <View style={styles.getmore}>
            <Image resizeMode="contain" style={styles.imageMore} source={Images.shape} />
            <Text style={{lineHeight: 20, fontSize: 12,color: '#999999'}}>更多</Text>
            <Text style={{marginRight: 6, lineHeight: 20,fontSize: 14,fontWeight: '500'}}>More</Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title:{
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500'
  },
  getmore:{
    flex: 1,
    flexDirection: 'row-reverse',
    paddingRight: 18
  },
  imageMore: {
    width: 12,
    height: 12,
    position: 'relative',
    marginTop: 4
  },
  loadingFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 40,
    borderTopColor: Colors.NORMAL_TEXT_E5,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  loadingText: {
    fontSize: 12,
    color: Colors.NORMAL_TEXT_6,
  },
  loadingGif: {
    width: 23,
    height: 5,
    marginLeft: 6,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CardSection);
