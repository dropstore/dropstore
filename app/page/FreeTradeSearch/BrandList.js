/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSimpleData } from '../../redux/reselect/simpleData';
import { fetchSimpleData } from '../../redux/actions/simpleData';
import { getScreenWidth } from '../../common/Constant';
import Colors from '../../res/Colors';
import { ScaleView, Image } from '../../components';
import { wPx2P } from '../../utils/ScreenUtil';

const TYPE = 'freeTradeSearchBrand';

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

class BrandList extends PureComponent {
  constructor(props) {
    super(props);
    this.fetchData();
  }

  loadMore = () => {
    this.fetchData('more');
  }

  fetchData = () => {
    const { fetchSimpleData } = this.props;
    fetchSimpleData(TYPE);
  }

  toListPage = (v) => {
    const { navigation } = this.props;
    navigation.navigate('BrandListPage', {
      title: v.brand_name,
      params: { brand_id: v.id },
    });
  }

  render() {
    const { data } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, backgroundColor: Colors.MAIN_BACK }} contentContainerStyle={styles.container}>
          {
            (data?.data?.brand || []).map((v, i) => (
              <ScaleView onPress={() => this.toListPage(v)} key={i} style={styles.item}>
                <Image source={{ uri: v.image }} style={styles.image} />
              </ScaleView>
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: (getScreenWidth() - 15) / 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: (getScreenWidth() - 15) / 4,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginLeft: 3,
    marginTop: 3,
  },
  image: {
    width: wPx2P(60),
    height: wPx2P(60),
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(BrandList);
