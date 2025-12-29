import {
  Image,
  ImageBackground,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScrollWrapper from '../CrovneFishSpeedReactionCmpnts/ScrollWrapper';
import LinearGradient from 'react-native-linear-gradient';
import { GRADIENT_COLORS } from '../consts';

import { useNavigation } from '@react-navigation/native';

const AboutCrovneScreen = () => {
  const navigation = useNavigation();

  const shrCrvneAbout = () => {
    Share.share({
      message: `This app challenges your reaction speed through fast, minimal
gameplay where timing is everything. Test yourself solo or compete
with friends, track your best results, and unlock collectible
wallpapers as a reward for precision and focus.`,
    });
  };

  return (
    <ScrollWrapper>
      <View
        style={{
          flex: 1,
          paddingTop: 70,
          alignItems: 'center',
          paddingBottom: 30,
        }}
      >
        <LinearGradient
          colors={GRADIENT_COLORS}
          style={{
            borderRadius: 23,
            width: '95%',
          }}
        >
          <View
            style={{
              backgroundColor: '#000',
              margin: 1,
              borderRadius: 22,
              paddingTop: 20,
              padding: 14,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.goBack()}
            >
              <Image source={require('../../assets/images/backButton.png')} />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 24,
                fontFamily: 'Montserrat-SemiBold',
                color: '#fff',
              }}
            >
              About
            </Text>

            <Image source={require('../../assets/images/headLogo.png')} />
          </View>
        </LinearGradient>

        <Image
          source={require('../../assets/images/aboutLogo.png')}
          style={{ marginTop: 27 }}
        />

        <LinearGradient
          colors={GRADIENT_COLORS}
          style={{
            marginTop: 26,
            borderRadius: 23,
            width: '90%',
          }}
        >
          <View
            style={{
              backgroundColor: '#000',
              margin: 1,
              borderRadius: 23,
              paddingTop: 30,
              paddingLeft: 5,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Montserrat-Regular',
                color: '#fff',
                paddingHorizontal: 24,
                textAlign: 'center',
                marginBottom: 10,
              }}
            >
              This app challenges your reaction speed through fast, minimal
              gameplay where timing is everything. Test yourself solo or compete
              with friends, track your best results, and unlock collectible
              wallpapers as a reward for precision and focus.
            </Text>

            <TouchableOpacity activeOpacity={0.7} onPress={shrCrvneAbout}>
              <ImageBackground
                source={require('../../assets/images/onboardBtn.png')}
                style={{
                  width: 165,
                  height: 44,
                  alignSelf: 'flex-end',
                  marginTop: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Montserrat-SemiBold',
                    color: '#000',
                  }}
                >
                  Share
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </ScrollWrapper>
  );
};

export default AboutCrovneScreen;
