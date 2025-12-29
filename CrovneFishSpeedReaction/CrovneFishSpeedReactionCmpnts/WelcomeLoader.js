import React from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, Image } from 'react-native';
import ScrollWrapper from './ScrollWrapper';

const WelcomeLoader = () => {
  const crovneLoader = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background: transparent;
    }

    .loader {
      --height-of-loader: 4px;
      --loader-color: linear-gradient(90deg, #FFD300, #FFFF8A, #FFF379, #FFD34C, #FFA104, #FF9E00, #F6CF5B , #EDFFB3, #F4FA86, #FFF240,#FFFF8A );
      width: 130px;
      height: var(--height-of-loader);
      border-radius: 30px;
      background-color: rgba(0,0,0,0.2);
      position: relative;
      overflow: hidden;
    }

    .loader::before {
      content: "";
      position: absolute;
      background: var(--loader-color);
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      border-radius: 30px;
      animation: moving 1s ease-in-out infinite;
    }

    @keyframes moving {
      50% {
        width: 100%;
      }
      100% {
        width: 0;
        left: unset;
        right: 0;
      }
    }
  </style>
</head>
<body>
  <div class="loader"></div>
</body>
</html>
`;

  return (
    <ScrollWrapper>
      <View style={styles.loaderContainer}>
        <Image source={require('../../assets/images/loaderLogo.png')} />

        <View style={{ position: 'absolute', bottom: 100 }}>
          <WebView
            originWhitelist={['*']}
            source={{ html: crovneLoader }}
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
