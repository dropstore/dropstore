/**
 * @file 选择鞋码组件
 * @date 2019/8/19 9:26
 * @author ZWW
 */
import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Image from '../../../../components/Image';
import {hitSlop} from '../../../../common/Constant';
import ImageBackground from '../../../../components/ImageBackground';
import {commonStyle} from '../../../../res/style/CommonStyle';
import Images from '../../../../res/Images';
import Colors from '../../../../res/Colors';
import {YaHei} from "../../../../res/FontFamily";
import {bottomStyle} from '../../../../res/style/BottomStyle';
import {debounce} from "../../../../utils/commonUtils";
import {startGroup} from "../../../../redux/actions/shopDetailInfo";
import {showToast} from "../../../../utils/MutualUtil";


export default class SelectShoeSizeCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCount: 0,
      shoesList: [],
    }
  }

  componentDidMount() {
    const {shoesList} = this.props;
    let _shoesList = JSON.parse(JSON.stringify(shoesList));
    for (let i = 0; i < _shoesList.length; i++) {
      _shoesList[i].num = 0;
    }
    this.setState({shoesList: _shoesList});
  }

  changeChooseCount = (item, operator) => {
    let shoesList = this.state.shoesList;
    let totalCount = this.state.totalCount;
    for (let i = 0; i < shoesList.length; i++) {
      if (shoesList[i].id === item.id) {
        let _shoeData = shoesList[i];
        if (operator === '+') {
          if (_shoeData.num < _shoeData.limit_num) {
            _shoeData.num++;
            totalCount++;
          } else {
            showToast('选择数量不能大于限购数量')
          }
        } else {
          if (_shoeData.num !== 0) {
            _shoeData.num--;
            totalCount--;
          }
        }
      }
    }
    this.setState({shoesList: shoesList, totalCount: totalCount});
  };

  _confirmChoose = () => {
    const {shopId, closeBox} = this.props;
    closeBox();
    startGroup(shopId, this.state.shoesList);
  };

  render() {
    const {shoesList, closeBox} = this.props;
    let _shoesList = this.state.shoesList;
    let showShoesLit = _shoesList.length !== 0 ? _shoesList : shoesList;
    return (
      <View style={_style.container}>
        <View style={{flex: 1,height: 400}}>
          <View style={commonStyle.row}>
            <View style={_style.mainView}>
              <Text style={_style.title}>鞋码选择</Text>
              <Text style={_style.alreadyChoose}>已选数量 {this.state.totalCount}</Text>
            </View>
            <TouchableOpacity hitSlop={hitSlop} style={_style.close} onPress={() => closeBox()}>
              <Image style={_style.close} source={Images.close_shoe}/>
            </TouchableOpacity>
          </View>
          <View style={_style.centerView}>
            <ScrollView>
              {
                showShoesLit.map((item, index) => (
                  <View key={index}>
                    <View style={[commonStyle.row, {marginLeft: 43,}]}>
                      <Text style={_style.sizeAndCount}>{item.size}</Text>
                      <View style={[commonStyle.row, _style.rightView]}>
                        <Text style={_style.price}>{item.price}￥</Text>
                        <TouchableOpacity style={{padding: 5}} hitSlop={hitSlop}
                                          onPress={() => this.changeChooseCount(item, '-')}>
                          <Image style={_style.lrImage} source={Images.shoe_zjt}/>
                        </TouchableOpacity>
                        <Text style={_style.sizeAndCount}>{item.num}</Text>
                        <TouchableOpacity style={{padding: 5}} hitSlop={hitSlop}
                                          onPress={() => this.changeChooseCount(item, '+')}>
                          <Image style={_style.lrImage} source={Images.shoe_zjr}/>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Image
                      style={_style.line}
                      source={Images.shoe_hth}/>
                  </View>
                ))
              }
            </ScrollView>
          </View>
        </View>
        <View style={bottomStyle.bottomView}>
          <ImageBackground
            hitSlop={hitSlop}
            style={bottomStyle.buttonOnlyOneChildView}
            source={Images.bg_right}
            disabled={this.state.totalCount === 0}
            onPress={debounce(this._confirmChoose)}
          >
            <Text style={bottomStyle.buttonText}>确认</Text>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const _style = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE_COLOR,
    height: 400
  },
  mainView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  title: {
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 23
  },
  close: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 10,
    top: 5,
    marginLeft: 10
  },
  alreadyChoose: {
    fontSize: 15,
    color: Colors.NORMAL_TEXT_0,
    fontFamily: YaHei,
    fontWeight: '300',
    marginLeft: 20
  },
  centerView: {
    marginTop: 28,
    height: 250,
  },
  rightView: {
    position: 'absolute',
    right: 46,
    top: 0,
  },
  sizeAndCount: {
    color: 'rgba(0,0,0,1)',
    fontFamily: YaHei,
    fontWeight: 'bold',
    fontSize: 18
  },
  price: {
    color: 'rgba(0,0,0,1)',
    fontSize: 15,
    marginRight: 31
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
    marginLeft: 26
  }
});




