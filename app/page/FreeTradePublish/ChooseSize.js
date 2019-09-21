import React, { PureComponent } from 'react';
import { Text,ScrollView,View,StyleSheet,TouchableOpacity } from 'react-native';
import { withNavigation} from 'react-navigation'
import  Image  from '../../components/Image'
import {hPx2P, wPx2P} from "../../utils/ScreenUtil";
import { hitSlop, SCREEN_WIDTH } from '../../common/Constant';
import Colors from '../../res/Colors';
import { YaHei } from '../../res/FontFamily';
// app/page/shopDetail/components/other/SelectShoeSizeByUnJoinsCom.js
class ChooseSize extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      chooseId: '-1',
      shoesList: [],
    }
  }
  changeChooseStatus = (item)=>{
     let {shoesList,chooseId } =this.state;
     const { navigation } =this.props;
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
    navigation.navigate('PublishComission', {
      title: '手续费',
    });
  }
  componentDidMount() {
    const sises =[{size:10,id:Math.random(10)},{size:10,id:Math.random(10)},{size:10,id:Math.random(10)},{size:10,id:Math.random(10)},{size:10,id:Math.random(10)},{size:10,id:Math.random(10)},{size:10,id:Math.random(10)},{size:10,id:Math.random(10)},{size:10,id:Math.random(10)},{size:10,id:Math.random(10)},]
    // const _shoesList = JSON.parse(JSON.stringify(shoesList));
    const _shoesList = sises;
    for (let i = 0; i < _shoesList.length; i++) {
      _shoesList[i].isSelect = false;
    }
    this.setState({ shoesList: _shoesList });
  }
  render() {
    const { navigation } = this.props;
    const item  = navigation.getParam('item');
    const { shoesList: _shoesList, chooseId } = this.state;
    return (<ScrollView style={styles.choseSizeContainer}>
            <View style={styles.shoseName}>
              <Image  source={{uri:item.image}} style={styles.shoseImage}/>
              <Text style={{flex:1}} numberOfLines={4}>{item.goods_name}</Text>
            </View>
            <View  style={styles.choseYourShoe}>
              <Text style={styles.choseYourShoeText}>选择你要出售的鞋码</Text>
            </View>
            <View  style={{flexDirection: 'row',flexWrap:'wrap',}}>
              {
                _shoesList.map((item,index)=>{
                  return  (
                      <TouchableOpacity   key={index} onPress={()=>{this.changeChooseStatus(item)}}>
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
                            <Text style={[styles.sizeNumber,{color:item.isSelect ? Colors.OTHER_BACK : '#000' }]}>{item.size}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                })
              }
            </View>
         </ScrollView>)
  }
}
const styles = StyleSheet.create({
  choseSizeContainer: {
     padding:8,
     backgroundColor:'#efefef'
  },
  shoseName:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#fff'
  },
  shoseImage:{
    width:wPx2P(166),
    height:wPx2P(97),

  },
  sizeItem:{
    textAlign:'center',
    width:'90%',
    height:'90%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.WHITE_COLOR,
    borderWidth: StyleSheet.hairlineWidth,
  },
  sizeNumber:{
    fontFamily: YaHei,
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemViwe:{
    width:SCREEN_WIDTH/4.3,
    height:wPx2P(83),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.NORMAL_TEXT_F2,
  },
  choseYourShoe:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:22,
    paddingBottom:22
  },
  choseYourShoeText:{
    fontSize: 16
  }
})
export default withNavigation(ChooseSize)
