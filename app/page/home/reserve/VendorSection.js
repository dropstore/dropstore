import React, { PureComponent } from 'react';
import {
  ImageBackground, ActivityIndicator, View, Text, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import ShopListItemCom from '../components/ShopListItemCom';
import { bindActionCreators } from 'redux';
import { fetchVendors } from '../../../redux/actions/test';
import { getVendors } from '../../../redux/reselect/test';
import Colors from '../../../res/Colors';
import { debounce } from '../../../utils/commonUtils';
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

  toVendorPage = () => {
    const { navigation } = this.props;
    navigation.push('vendorDetail', {
      title: '详情页',
    });
  }
  render() {
    const { vendors, shopList, title } = this.props;
    if (vendors.isFetching && vendors.totalPages < 0) {
      return <ActivityIndicator style={{ marginTop: 50 }} />;
    }
    return (
      <View style={styles.container}>
        <ImageBackground resizeMode="stretch" source={Images.ht} style={styles.title}>
          <Text style={{
            textAlign: 'center',
            fontSize: 18,
            lineHeight: 28,
            fontWeight: '500',
            color: '#ffffff',
          }}>{title}</Text>
        </ImageBackground>

          <View >
              {
                shopList.map( item => <ImageBackground resizeMode="stretch" source={Images.jc} style={styles.content} onPress={debounce(this.toVendorPage)}>
                  <ShopListItemCom item={item}/>
                </ImageBackground> )
              }
          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    marginBottom: 20
  },
  content: {
      flex: 1,
      marginBottom:3
      // height: 154
  },
  title:{
    flex: 1,
    height: 28,
    marginBottom: 7
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
