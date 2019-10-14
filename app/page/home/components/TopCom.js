/**
 * @file 首页顶部图组件
 * @date 2019/8/17 19:09
 * @author ZWW
 */
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FadeImage } from '../../../components';
import { wPx2P } from '../../../utils/ScreenUtil';
import { getScreenWidth } from '../../../common/Constant';
import { getBanner } from '../../../redux/reselect/banner';
import { fetchBanner } from '../../../redux/actions/banner';

function mapStateToProps() {
  return (state, props) => ({
    banner: getBanner(state, `banner${props.bannerId}`),
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchBanner,
  }, dispatch);
}

class TopCom extends PureComponent {
  componentDidMount() {
    const { fetchBanner, bannerId } = this.props;
    fetchBanner(bannerId);
  }

  renderItem = ({ item }) => <FadeImage style={_styles.topImage} source={{ uri: item.image }} />

  render() {
    const { banner } = this.props;
    if (!banner) {
      return <View style={_styles.topImage} />;
    } if (banner.length === 1) {
      return this.renderItem({ item: banner[0] });
    }
    return (
      <Carousel
        data={banner}
        slideStyle={{ alignItems: 'center', justifyContent: 'center' }}
        renderItem={this.renderItem}
        sliderWidth={getScreenWidth()}
        itemWidth={getScreenWidth()}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        enableSnap
        loop
        autoplay
        autoplayInterval={4000}
        removeClippedSubviews={false}
      />
    );
  }
}

const _styles = StyleSheet.create({
  topImage: {
    width: wPx2P(375),
    height: wPx2P(125),
    alignSelf: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TopCom);
