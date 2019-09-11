import React, { PureComponent } from 'react';
import {
  SectionList, StyleSheet, View, Image, Text, TouchableOpacity,
} from 'react-native';
import TopCom from '../components/TopCom';
import ShopListItemCom from '../components/ShopListItemCom';
import Colors from '../../../res/Colors';
import { Mario, YaHei } from '../../../res/FontFamily';
import Images from '../../../res/Images';

export default class Home extends PureComponent {
  renderSectionHeader = ({ section }) => <Text style={styles.title}>{section.title}</Text>

  renderItem = ({ item, index, section }) => (
    <View>
      <ShopListItemCom item={item} />
      {
        index === section.data.length - 1 && (
          <TouchableOpacity onPress={() => alert('待做')} style={styles.getmore}>
            <Text style={styles.moreText}>MORE</Text>
            <Text style={styles.moreTextCN}>更多</Text>
            <Image style={styles.imageMore} source={Images.shape} />
          </TouchableOpacity>
        )
      }
    </View>
  )

  render() {
    const { shopList } = this.state;
    return (
      <SectionList
        sections={shopList}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderSectionHeader={this.renderSectionHeader}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => `index-${index}`}
        ListHeaderComponent={<TopCom imageSource={Images.instructions} />}
        style={{ backgroundColor: Colors.NORMAL_TEXT_F6, flex: 1 }}
      />
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 12.5,
    fontWeight: '500',
    height: 35,
    lineHeight: 35,
    fontFamily: Mario,
  },
  getmore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 3,
    paddingRight: 15,
  },
  imageMore: {
    width: 12,
    height: 12,
  },
  moreText: {
    marginRight: 5,
    fontSize: 10,
    fontWeight: '500',
    fontFamily: Mario,
  },
  moreTextCN: {
    fontSize: 13,
    color: '#000',
    fontFamily: YaHei,
  },
});
