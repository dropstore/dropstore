import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { debounce } from '../../../utils/commonUtils';
import FadeImage from '../../../components/FadeImage';
import ScaleView from '../../../components/ScaleView';
import { SCREEN_WIDTH } from '../../../common/Constant';

class VendorListItem extends PureComponent {
  toVendorPage = () => {
    const { navigation } = this.props;
    navigation.push('vendorDetail', {
      title: '详情页',
    });
  }

  render() {
    const { vendor } = this.props;
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <Text>zheshi ceshi </Text>
        <ScaleView style={styles.container} onPress={debounce(this.toVendorPage)}>
          <FadeImage style={styles.image} source={{ uri: vendor.image_url }} />
          <View style={styles.containerRight}>
            <View style={styles.vendorName}>
              <Text style={styles.nameText} numberOfLines={1}>{vendor.name}</Text>
            </View>
            <View style={styles.voucherInfoCell}>
              <View style={styles.vendorInfo}>
                <Text style={styles.priceText}>{vendor.avg_price > 0 ? `￥${vendor.avg_price}元/人` : '￥暂无人均'}</Text>
              </View>
              <Text style={styles.distanceText}>
                {vendor.category_name === '' ? '' : `${vendor.category_name} | `}
                {vendor.distance}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.voucherText} numberOfLines={1}>{vendor.recommand_voucher_text}</Text>
              {
                !vendor.is_valid_now && (
                  <View style={styles.limitTimeTextWrapper}>
                    <Text style={styles.limitTimeText}>限时使用</Text>
                  </View>
                )
              }
            </View>
            {
              ['mai', 'quan'].includes(vendor.discount_type)
              && (
              <View style={[styles.stripeWrapper, { backgroundColor: vendor.is_valid_now ? '#fff3f3' : '#f7f7f7' }]}>
                <View style={[styles.stripe, { width: `${(10 - vendor.discount_rate) * 10}%`, backgroundColor: vendor.is_valid_now ? '#df5450' : '#ccc' }]} />
              </View>
              )
            }
          </View>
        </ScaleView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  border: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#EAEAEA',
    position: 'absolute',
    width: SCREEN_WIDTH - 95,
    right: 0,
  },
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  image: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#EAEAEA',
    borderRadius: 9,
    width: 65,
    height: 65,
    marginTop: 14,
  },
  containerRight: {
    paddingTop: 14,
    paddingLeft: 10,
    flex: 1,
    borderTopColor: '#e5e5e5',
    borderBottomColor: '#e5e5e5',
    paddingBottom: 10.5,
  },
  vendorName: {
    flexDirection: 'row',
    height: 24,
  },
  distanceText: {
    textAlign: 'right',
    fontSize: 11,
    color: '#999999',
  },
  nameText: {
    maxWidth: SCREEN_WIDTH - 175,
    flexShrink: 1,
    fontFamily: 'PingFangSC-Medium',
    lineHeight: 24,
    fontSize: 15,
    color: '#333333',
    fontWeight: '500',
    marginRight: 13,
  },
  voucherInfoCell: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  vendorInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  vendorStar: {
    marginRight: 1,
    width: 8,
    height: 8,
  },
  priceText: {
    fontSize: 11,
    color: '#999',
    marginLeft: 5,
  },
  voucherText: {
    color: '#333333',
    fontSize: 11,
    marginBottom: 1,
    maxWidth: SCREEN_WIDTH - 175,
  },
  recentTagWrapper: {
    marginTop: 4,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderWidth: StyleSheet.hairlineWidth,
  },
  dicountTagWrapper: {
    backgroundColor: '#FFFAF1',
    borderColor: '#FFDEC2',
  },
  accessTagWrapper: {
    backgroundColor: '#F7FAFF',
    borderColor: '#A0C7FF',
  },
  recentTagText: {
    fontSize: 11,
  },
  dicountTagText: {
    color: '#FFBC7A',
  },
  accessTagText: {
    color: '#61A7FF',
  },
  stripeWrapper: {
    height: 3,
    borderRadius: 7.5,
    overflow: 'hidden',
  },
  stripe: {
    height: 3,
    borderRadius: 7.5,
    overflow: 'hidden',
  },
  supplierImage: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 9,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: '#333',
  },
  ellipsis: {
    marginLeft: 5,
    marginTop: 3,
    color: '#333',
  },
  noVouchers: {
    fontSize: 11,
    color: '#999',
    textAlign: 'right',
  },
  limitTimeTextWrapper: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    overflow: 'hidden',
    borderRadius: 2,
    marginLeft: 10,
    paddingHorizontal: 2,
    height: 15,
  },
  limitTimeText: {
    color: '#999',
    fontSize: 11,
    lineHeight: 15,
    padding: 0,
  },
});

export default withNavigation(VendorListItem);
