/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
  ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hitSlop } from '../../../../common/Constant';
import { BottomBtnGroup } from '../../../../components';
import Colors from '../../../../res/Colors';
import { YaHei } from '../../../../res/FontFamily';
import { debounce } from '../../../../utils/commonUtils';
import { startGroup, getShoesList } from '../../../../redux/actions/shopDetailInfo';
import { showToast } from '../../../../utils/MutualUtil';
import { wPx2P } from '../../../../utils/ScreenUtil';
import { getReShoesList } from '../../../../redux/reselect/shopDetailInfo';

function mapStateToProps() {
  return state => ({
    shoesInfo: getReShoesList(state),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getShoesList,
  }, dispatch);
}

class SelectShoeSizeCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCount: 0,
      shoesList: [],
    };
  }

  componentDidMount() {
    const { shopId, getShoesList } = this.props;
    getShoesList(shopId).then((shoesList) => {
      this.setState({ shoesList: shoesList.map(v => ({ ...v, num: 0 })) });
    });
  }

  changeChooseCount = (item, isAdd) => {
    const { shoesList } = this.state;
    let { totalCount } = this.state;
    shoesList.map((v) => {
      if (v.id === item.id) {
        if (isAdd) {
          if (item.num < v.limit_num) {
            v.num += 1;
            totalCount++;
          } else {
            showToast('选择数量不能大于限购数量');
          }
        } else if (item.num >= 1) {
          item.num--;
          totalCount--;
        }
      }
      return v;
    });
    this.setState({ shoesList, totalCount });
  };

  confirmChoose = () => {
    const { shopId, closeBox } = this.props;
    const { shoesList } = this.state;
    closeBox();
    startGroup(shopId, shoesList);
  };

  render() {
    const { shoesList } = this.state;
    const { totalCount } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.mainView}>
            <Text style={styles.title}>鞋码选择</Text>
            <Text style={styles.alreadyChoose}>{`已选数量${totalCount}`}</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              shoesList.map((item, index) => (
                <View key={index} style={[styles.item, { borderBottomWidth: index === 0 ? 0 : StyleSheet.hairlineWidth }]}>
                  <Text style={styles.sizeAndCount}>{item.size}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.price}>{`${item.price / 100}￥`}</Text>
                    <TouchableOpacity style={styles.arrowLeft} hitSlop={hitSlop} onPress={() => this.changeChooseCount(item)} />
                    <Text style={[styles.sizeAndCount, { width: 40 }]}>{item.num}</Text>
                    <TouchableOpacity style={styles.arrowRight} hitSlop={hitSlop} onPress={() => this.changeChooseCount(item, true)} />
                  </View>
                </View>
              ))
            }
          </ScrollView>
        </View>
        <BottomBtnGroup btns={[{ text: '确认', onPress: debounce(this.confirmChoose), disabled: totalCount === 0 }]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  arrowLeft: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderRightWidth: 12,
    borderLeftWidth: 0,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: Colors.OTHER_BACK,
  },
  arrowRight: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderRightWidth: 0,
    borderLeftWidth: 12,
    borderTopColor: 'transparent',
    borderLeftColor: Colors.OTHER_BACK,
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
  },
  container: {
    backgroundColor: Colors.WHITE_COLOR,
    height: 400,
  },
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wPx2P(30),
    height: 45,
    borderBottomColor: '#ddd',
    paddingHorizontal: wPx2P(15),
  },
  title: {
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: wPx2P(25),
  },
  alreadyChoose: {
    fontSize: 15,
    color: Colors.NORMAL_TEXT_0,
    fontFamily: YaHei,
    fontWeight: '300',
    marginLeft: wPx2P(20),
  },
  sizeAndCount: {
    color: '#000',
    fontFamily: YaHei,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  price: {
    color: 'rgba(0,0,0,1)',
    fontSize: 15,
    marginRight: wPx2P(25),
  },
  lrImage: {
    width: 6,
    height: 8,
  },
  line: {
    width: 340,
    height: 1,
    marginTop: 12,
    marginBottom: 19,
    marginLeft: 26,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectShoeSizeCom);
