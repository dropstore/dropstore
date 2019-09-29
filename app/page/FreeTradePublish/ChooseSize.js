/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {
  Text, ScrollView, View, StyleSheet, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Image from '../../components/Image';
import { wPx2P } from '../../utils/ScreenUtil';
import { SCREEN_WIDTH } from '../../common/Constant';
import Colors from '../../res/Colors';
import { YaHei } from '../../res/FontFamily';
import { getSimpleData } from '../../redux/reselect/simpleData';
import { fetchSimpleData } from '../../redux/actions/simpleData';

const SIZE = (SCREEN_WIDTH - 45) / 4;
const TYPE = 'getShoeSizeList';

function mapStateToProps() {
  return state => ({
    shoeSizeList: getSimpleData(state, TYPE),
  });
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchSimpleData,
  }, dispatch);
}

class ChooseSize extends PureComponent {
  constructor(props) {
    super(props);
    const { navigation, fetchSimpleData } = this.props;
    this.item = navigation.getParam('item');
    fetchSimpleData(TYPE, { goods_id: this.item.id });
  }

  changeChooseStatus = (item) => {
    const { navigation } = this.props;
    navigation.navigate('PublishCommission', {
      title: '支付库管费',
      TYPE: 'getMissionPrice',
      payType: 1,
      goodsInfo: {
        type: 'storeMoney',
        shoeSize: item.id,
        goodsId: this.item.id,
        goodsImage: this.item.image,
        goodsName: this.item.goods_name,
      },
    });
  }

  render() {
    const { navigation, shoeSizeList: { data = [] } } = this.props;
    const item = navigation.getParam('item');
    return (
      <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={false} style={styles.choseSizeContainer}>
        <View style={styles.shoseName}>
          <Image source={{ uri: item.image }} style={styles.shoseImage} />
          <Text style={styles.title}>{item.goods_name}</Text>
        </View>
        <Text style={styles.choseYourShoeText}>选择你要出售的鞋码</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
          {
            data.map((item, index) => (
              <TouchableOpacity style={styles.item} key={index} onPress={() => { this.changeChooseStatus(item); }}>
                <Text style={styles.sizeNumber}>{item.size}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  choseSizeContainer: {
    backgroundColor: '#efefef',
  },
  title: {
    fontSize: 15,
    fontFamily: YaHei,
    marginLeft: 10,
    flex: 1,
    textAlign: 'justify',
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
  shoseName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 12,
    marginTop: 7,
  },
  shoseImage: {
    width: wPx2P(166),
    height: wPx2P(97),
  },
  sizeItem: {
    textAlign: 'center',
    width: '90%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE_COLOR,
    borderWidth: StyleSheet.hairlineWidth,
  },
  sizeNumber: {
    fontFamily: YaHei,
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemViwe: {
    width: SCREEN_WIDTH / 4.3,
    height: wPx2P(83),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.NORMAL_TEXT_F2,
  },
  choseYourShoe: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 22,
    paddingBottom: 22,
  },
  choseYourShoeText: {
    fontSize: 13,
    fontFamily: YaHei,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 13,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ChooseSize);
