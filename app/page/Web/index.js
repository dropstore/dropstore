import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { withNavigation } from 'react-navigation';

const injectedJavaScript = Platform.OS === 'ios' ? `
(function() {
  function wrap(fn) {
    return function wrapper() {
      var res = fn.apply(this, arguments);
      window.ReactNativeWebView.postMessage('navigationStateChange');
      return res;
    }
  }

  history.pushState = wrap(history.pushState);
  history.replaceState = wrap(history.replaceState);
  window.addEventListener('popstate', function() {
    window.ReactNativeWebView.postMessage('navigationStateChange');
  });
})();

true;
` : null;

class Web extends Component {
  onShouldStartLoadWithRequest = (e) => {
    const scheme = e.url.split('://')[0];
    if (scheme === 'http' || scheme === 'https') {
      return true;
    }
    return false;
  }

  goBack = () => {
    const { navigation } = this.props;
    if (this.canGoBack) {
      this.webview.goBack();
    } else {
      navigation.pop();
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <WebView
        style={styles.webView}
        source={{ uri: navigation.getParam('url') }}
        ref={(v) => { this.webview = v; }}
        startInLoadingState
        onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
        mixedContentMode="always"
        injectedJavaScript={injectedJavaScript}
        onMessage={({ nativeEvent: state }) => {
          if (state.data === 'navigationStateChange') {
            this.canGoBack = state.canGoBack;
          }
        }
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  webView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  nowifiWrapper: {
    flex: 1,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  nowifiHintText: {
    color: '#D5D5D5',
    fontSize: 14,
    marginTop: 12,
  },
  refreshNetworkBtn: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#B6B6B6',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 34,
    marginTop: 50,
  },
  refreshNetworkBtnText: {
    color: '#666666',
    fontSize: 14,
  },
});

module.exports = withNavigation(Web);
