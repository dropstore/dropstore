import React, { Component } from 'react';
import {
  ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getScreenWidth } from '../../../common/Constant';
import { BottomBtnGroup } from '../../../components';
import Colors from '../../../res/Colors';
import { YaHei } from '../../../res/FontFamily';
import { debounce } from '../../../utils/commonUtils';
import { fetchSimpleData } from '../../../redux/actions/simpleData';
import { getSimpleData } from '../../../redux/reselect/simpleData';
import { requestApi } from '../../../http/Axios';

const SIZE = (getScreenWidth() - 45) / 4;
const TYPE = 'activitySize';

function mapStateToProps() {
  return state => ({
    shoesInfo: getSimpleData(state, TYPE),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchSimpleData,
  }, dispatch);
}

class SelectShoeSizeByUnJoinsCom extends Component {
  constructor(props) {
    super(props);
    const { shopId, fetchSimpleData } = this.props;
    fetchSimpleData(TYPE, { id: shopId });
    this.state = {
      chooseId: '',
    };
  }

  changeChooseStatus = (id) => {
    const { chooseId } = this.state;
    this.setState({ chooseId: id === chooseId ? '' : id });
  };

  confirmChoose = () => {
    const {
      shopId, closeBox, navigation, shopInfo,
    } = this.props;
    const { chooseId } = this.state;
    closeBox();
    const params = {
      activity_id: shopId,
      size_id: chooseId,
    };
    requestApi('doBuyNow', { params }).then((res) => {
      navigation.push('Panicstatus', {
        shopInfo, payData: res.data, Panicstatus: true, title: '抢购成功',
      });
    });
  };

  render() {
    const { shoesInfo: { data: shoesList = [] } } = this.props;
    const { chooseId } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>鞋码选择</Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollView}
            style={{ flex: 1, backgroundColor: Colors.MAIN_BACK }}
          >
            {
              shoesList.map((item) => {
                const isSelect = chooseId === item.id;
                return (
                  <TouchableOpacity
                    style={[styles.item, {
                      borderWidth: isSelect ? StyleSheet.hairlineWidth : 0,
                    }]}
                    key={item.id}
                    onPress={() => this.changeChooseStatus(item.id)}
                  >
                    <Text style={[styles.sizeAndCount, { color: isSelect ? Colors.YELLOW : '#000' }]}>{item.size}</Text>
                    <Text style={[styles.price, { color: isSelect ? Colors.YELLOW : '#A4A4A4' }]}>{`￥${item.price / 100}`}</Text>
                  </TouchableOpacity>
                );
              })
            }
          </ScrollView>
        </View>
        <BottomBtnGroup btns={[{ text: '确认', onPress: debounce(this.confirmChoose), disabled: chooseId === '' }]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE_COLOR,
    height: 400,
  },
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 7,
    flex: 1,
  },
  item: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE_COLOR,
    borderRadius: 2,
    overflow: 'hidden',
    borderColor: Colors.YELLOW,
    marginLeft: 9,
    marginTop: 7,
  },
  titleWrapper: {
    height: 50,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  title: {
    fontFamily: YaHei,
    fontWeight: 'bold',
    fontSize: 16,
  },
  sizeAndCount: {
    fontFamily: YaHei,
    fontWeight: 'bold',
    fontSize: 18,
  },
  price: {
    fontSize: 15,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectShoeSizeByUnJoinsCom);
