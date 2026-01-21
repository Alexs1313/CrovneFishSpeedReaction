import React from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, Image } from 'react-native';
import ScrollWrapper from './ScrollWrapper';
import { welcomeHtmlLoader } from '../consts';

const WelcomeLoader = () => {
  return (
    <ScrollWrapper>
      <View style={styles.loaderContainer}>
        <Image source={require('../../assets/images/loaderLogo.png')} />

        <View style={{ position: 'absolute', bottom: 100 }}>
          <WebView
            originWhitelist={['*']}
            source={{ html: welcomeHtmlLoader }}
            style={{ width: 220, height: 10, backgroundColor: 'transparent' }}
            scrollEnabled={false}
          />
        </View>
      </View>
    </ScrollWrapper>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 700,
  },
});

export default WelcomeLoader;
