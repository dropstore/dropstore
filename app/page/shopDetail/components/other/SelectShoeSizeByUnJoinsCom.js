import React, { Component } from 'react';
import {
  ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SCREEN_WIDTH } from '../../../../common/Constant';
import { BottomBtnGroup } from '../../../../components';
import Colors from '../../../../res/Colors';
import { YaHei } from '../../../../res/FontFamily';
import { debounce } from '../../../../utils/commonUtils';
import { doBuyNow, getShoesList } from '../../../../redux/actions/shopDetailInfo';
import { getReShoesList } from '../../../../redux/reselect/shopDetailInfo';

const SIZE = (SCREEN_WIDTH - 45) / 4;

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

class SelectShoeSizeByUnJoinsCom extends Component {
  constructor(props) {
    super(props);
    const { shopId, getShoesList } = this.props;
    getShoesList(shopId);
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
    doBuyNow(shopId, chooseId, navigation, shopInfo);
  };

  render() {
    const { shoesInfo: { shoesList = [] } } = this.props;
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
                    <Text style={[styles.sizeAndCount, { color: isSelect ? Colors.OTHER_BACK : '#000' }]}>{item.size}</Text>
                    <Text style={[styles.price, { color: isSelect ? Colors.OTHER_BACK : '#A4A4A4' }]}>{`￥${item.price / 100}`}</Text>
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
    borderColor: Colors.OTHER_BACK,
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
