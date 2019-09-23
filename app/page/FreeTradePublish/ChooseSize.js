import React, { PureComponent } from 'react';
import {
  Text, ScrollView, View, StyleSheet, TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux'
import Image from '../../components/Image';
import { wPx2P } from '../../utils/ScreenUtil';
import { SCREEN_WIDTH } from '../../common/Constant';
import Colors from '../../res/Colors';
import { YaHei } from '../../res/FontFamily';
import { getListData } from '../../redux/reselect/listData';
import { getSimpleData } from '../../redux/reselect/simpleData';
import { bindActionCreators } from 'redux';
import { fetchListData } from '../../redux/actions/listData';
import { fetchSimpleData } from '../../redux/actions/simpleData';

const TYPE ='getShoeSizeList'

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
    this.state = {
      chooseId: '-1',
    };
    // console.log('this.props.shoeSizeList');
    // console.log(this.props.);
    const { navigation,shoeSizeList = [], chooseId } = this.props;
    const item = navigation.getParam('item');
     console.log('this.props.shoeSizeList');
     console.log(item);
    this.props.fetchSimpleData(TYPE,{parmas:{id:item.id}})
  }

  changeChooseStatus = (item) => {
    let { shoesList, chooseId } = this.state;
    const { navigation } = this.props;
    for (let i = 0; i < shoesList.length; i++) {
      const _shoeData = shoesList[i];
      if (_shoeData.id === item.id) {
        _shoeData.isSelect = !_shoeData.isSelect;
        chooseId = _shoeData.isSelect ? item.id : '-1';
      } else {
        _shoeData.isSelect = false;
      }
    }
    this.setState({ shoesList, chooseId });
    navigation.navigate('MailOut', {
      title: '手续费',
    });
  }


  render() {
    const { navigation,shoeSizeList = [], chooseId } = this.props;
    const item = navigation.getParam('item');
    return (
      <ScrollView style={styles.choseSizeContainer}>
        <View style={styles.shoseName}>
          <Image source={{ uri: item.image?item.image:'' }} style={styles.shoseImage} />
          <Text style={{ flex: 1 }} numberOfLines={4}>{item.goods_name}</Text>
        </View>
        <View style={styles.choseYourShoe}>
          <Text style={styles.choseYourShoeText}>选择你要出售的鞋码</Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            shoeSizeList.map((item, index) => (
                  <TouchableOpacity key={index} onPress={() => { this.changeChooseStatus(item); }}>
                    <View style={styles.itemViwe}>
                      <View
                        style={{
                          width: '90%',
                          height: '90%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: Colors.WHITE_COLOR,
                          borderColor: item.isSelect ? Colors.OTHER_BACK : '#fff',
                          borderWidth: StyleSheet.hairlineWidth,
                        }}
                      >
                        <Text style={[styles.sizeNumber, { color: item.isSelect ? Colors.OTHER_BACK : '#000' }]}>{item.size}</Text>
                      </View>
                    </View>
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
    padding: 8,
    backgroundColor: '#efefef',
  },
  shoseName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    fontSize: 16,
  },
});
export default connect(mapStateToProps,mapDispatchToProps)(ChooseSize);
