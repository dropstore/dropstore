import React, {PureComponent} from 'react'
import {WebView} from 'react-native'
import {SCREEN_WIDTH} from "../../../../common/Constant";

const BaseScript =
  `
    (function () {
        var height = null;
        function changeHeight() {
          if (document.body.scrollHeight != height) {
            height = document.body.scrollHeight;
            if (window.postMessage) {
              window.postMessage(JSON.stringify({
                type: 'setHeight',
                height: height,
              }))
            }
          }
        }
        setInterval(changeHeight, 100);
    } ())
    `

export default class ShopMainBodyCom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = ({
      height: 0
    })
  }

  /**
   * web端发送过来的交互消息
   */
  onMessage(event) {
    try {
      const action = JSON.parse(event.nativeEvent.data)
      if (action.type === 'setHeight' && action.height > 0) {
        this.setState({height: action.height})
      }
    } catch (error) {
      // pass
    }
  }

  render() {
    const {shopInfo} = this.props;
    return (
      <WebView
        injectedJavaScript={BaseScript}
        style={{
          width: SCREEN_WIDTH,
          height: this.state.height
        }}
        automaticallyAdjustContentInsets
        source={{html: shopInfo.goods.details}}
        decelerationRate='normal'
        scalesPageToFit
        javaScriptEnabled
        domStorageEnabled
        scrollEnabled={false}
        onMessage={this.onMessage.bind(this)}
      />
    )
  }
}
