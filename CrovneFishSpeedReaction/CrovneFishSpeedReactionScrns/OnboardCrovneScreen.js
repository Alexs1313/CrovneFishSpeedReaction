import {
  Image as CrovneImage,
  ImageBackground as CrovneBackgroundImage,
  Text as CrovneText,
  TouchableOpacity as CrovneButton,
  View as CrovneView,
} from 'react-native';
import ScrollWrapper from '../CrovneFishSpeedReactionCmpnts/ScrollWrapper';
import LinearGradient from 'react-native-linear-gradient';
import { GRADIENT_COLORS } from '../consts';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const OnboardCrovneScreen = () => {
  const [currentCrovneIndex, setCurrentCrovneIndex] = useState(0);
  const navigation = useNavigation();

  return (
    <ScrollWrapper>
      <CrovneView
        style={{
          flex: 1,
          paddingTop: 40,
          alignItems: 'center',
          paddingBottom: 50,
        }}
      >
        <CrovneImage source={require('../../assets/images/onboardLogo.png')} />

        <CrovneText
          style={{
            fontSize: 24,
            fontFamily: 'Montserrat-SemiBold',
            color: '#fff',
            marginTop: 16,
            marginBottom: 24,
          }}
        >
          {currentCrovneIndex === 0
            ? 'Welcome to Crovne Fish'
            : currentCrovneIndex === 1
            ? 'Test Your Reaction'
            : 'Compete and Collect'}
        </CrovneText>

        <CrovneBackgroundImage
          source={require('../../assets/images/bgGradient.png')}
          style={{
            width: 340,
            height: 350,
            justifyContent: 'center',
            alignItems: 'center',
            top: 60,
          }}
        >
          {currentCrovneIndex === 0 && (
            <CrovneImage
              source={require('../../assets/images/onboardImg1.png')}
              style={{ bottom: 20 }}
            />
          )}

          {currentCrovneIndex === 1 && (
            <CrovneImage
              source={require('../../assets/images/onboardImg2.png')}
              style={{ bottom: 60 }}
            />
          )}

          {currentCrovneIndex === 2 && (
            <CrovneImage
              source={require('../../assets/images/onboardImg3.png')}
              style={{ top: 10 }}
            />
          )}
        </CrovneBackgroundImage>

        <LinearGradient
          colors={GRADIENT_COLORS}
          style={{
            marginTop: 60,
            borderRadius: 23,
            width: '90%',
            bottom: 80,
          }}
        >
          <CrovneView
            style={{
              backgroundColor: '#000',
              margin: 1,
              borderRadius: 23,
              paddingTop: 20,
              paddingLeft: 5,
            }}
          >
            <CrovneText
              style={{
                fontSize: 18,
                fontFamily: 'Montserrat-SemiBold',
                color: '#fff',
                paddingVertical: 12,
                paddingHorizontal: 24,
                textAlign: 'center',
                marginBottom: 14,
              }}
            >
              {currentCrovneIndex === 0 && 'I am the master of the depths.'}
              {currentCrovneIndex === 1 && 'I release a fish unexpectedly.'}
              {currentCrovneIndex === 2 &&
                'Play alone or challenge your friends.'}
            </CrovneText>

            <CrovneText
              style={{
                fontSize: 14,
                fontFamily: 'Montserrat-Regular',
                color: '#fff',
                paddingBottom: 16,
                paddingHorizontal: 24,
                textAlign: 'center',
                marginBottom: 10,
              }}
            >
              {currentCrovneIndex === 0 &&
                `In my world, it is not strength that decides, but reaction.
A fish can appear at any moment — be ready.`}

              {currentCrovneIndex === 1 &&
                `Saw it — click instantly.
The faster your reaction, the closer you are to the crown.`}

              {currentCrovneIndex === 2 &&
                `Compare your reaction times, top the leaderboard.
Test your luck every day and unlock collectible wallpapers.`}
            </CrovneText>

            <CrovneButton
              onPress={() => {
                if (currentCrovneIndex < 2) {
                  setCurrentCrovneIndex(currentCrovneIndex + 1);
                } else {
                  navigation.navigate('HomeCrovneScreen');
                }
              }}
            >
              <CrovneBackgroundImage
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
                <CrovneText
                  style={{
                    fontSize: 18,
                    fontFamily: 'Montserrat-SemiBold',
                    color: '#000',
                  }}
                >
                  {currentCrovneIndex === 0
                    ? 'Next'
                    : currentCrovneIndex === 1
                    ? 'Okay'
                    : 'Start'}
                </CrovneText>
              </CrovneBackgroundImage>
            </CrovneButton>
          </CrovneView>
        </LinearGradient>

        <CrovneView
          style={{
            flexDirection: 'row',
            gap: 8,
            bottom: 60,
          }}
        >
          {[1, 2, 3].map((_, index) => (
            <CrovneImage
              key={index}
              source={
                index === currentCrovneIndex
                  ? require('../../assets/images/paginationActive.png')
                  : require('../../assets/images/paginationInactive.png')
              }
            />
          ))}
        </CrovneView>
      </CrovneView>
    </ScrollWrapper>
  );
};

export default OnboardCrovneScreen;
