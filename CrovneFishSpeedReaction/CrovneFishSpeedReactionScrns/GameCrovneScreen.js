import {
  View,
  Text,
  TouchableOpacity as CrovneButton,
  Image,
  Share,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useRef, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { GRADIENT_COLORS } from '../consts';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const crovneFishSpeedReactionFishes = [
  require('../../assets/images/crovneFish1.png'),
  require('../../assets/images/crovneFish2.png'),
  require('../../assets/images/crovneFish3.png'),
];

const crovneFishSpeedReactionStorageKeyBestReaction = 'crovne_best_reaction';

const GameCrovneScreen = () => {
  const crovneFishSpeedReactionNavigation = useNavigation();
  const [
    crovneFishSpeedReactionGameStarted,
    setCrovneFishSpeedReactionGameStarted,
  ] = useState(false);
  const [
    crovneFishSpeedReactionWaitingFish,
    setCrovneFishSpeedReactionWaitingFish,
  ] = useState(false);
  const [
    crovneFishSpeedReactionFishVisible,
    setCrovneFishSpeedReactionFishVisible,
  ] = useState(false);
  const [crovneFishSpeedReactionFish, setCrovneFishSpeedReactionFish] =
    useState(null);
  const [crovneFishSpeedReactionReaction, setCrovneFishSpeedReactionReaction] =
    useState(null);

  const crovneFishSpeedReactionStartTimeRef = useRef(0);
  const crovneFishSpeedReactionTimerRef = useRef(null);

  const crovneFishSpeedReactionFormatDate = date => {
    const day = String(date.getDate()).padStart(2, '0');

    const month = String(date.getMonth() + 1).padStart(2, '0');

    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const crovneFishSpeedReactionStartGame = () => {
    setCrovneFishSpeedReactionGameStarted(true);
    setCrovneFishSpeedReactionWaitingFish(true);
    setCrovneFishSpeedReactionFishVisible(false);
    setCrovneFishSpeedReactionReaction(null);

    const delay = Math.random() * 3000 + 1000;

    crovneFishSpeedReactionTimerRef.current = setTimeout(() => {
      const randomFish =
        crovneFishSpeedReactionFishes[
          Math.floor(Math.random() * crovneFishSpeedReactionFishes.length)
        ];

      setCrovneFishSpeedReactionFish(randomFish);
      crovneFishSpeedReactionStartTimeRef.current = Date.now();
      setCrovneFishSpeedReactionFishVisible(true);
      setCrovneFishSpeedReactionWaitingFish(false);
    }, delay);
  };

  const crovneFishSpeedReactionSaveBestResult = async time => {
    try {
      const rawSv = await AsyncStorage.getItem(
        crovneFishSpeedReactionStorageKeyBestReaction,
      );
      const prevRes = rawSv ? JSON.parse(rawSv) : null;

      const timeNum = parseFloat(time);
      const today = crovneFishSpeedReactionFormatDate(new Date());

      if (!prevRes || timeNum < prevRes.bestTime) {
        const payload = {
          bestTime: timeNum,
          date: today,
        };

        await AsyncStorage.setItem(
          crovneFishSpeedReactionStorageKeyBestReaction,
          JSON.stringify(payload),
        );
      }
    } catch (e) {
      console.log('e');
    }
  };

  const crovneFishSpeedReactionOnFishPress = async () => {
    const currTime =
      (Date.now() - crovneFishSpeedReactionStartTimeRef.current) / 1000;

    const fixedTm = currTime.toFixed(4);

    setCrovneFishSpeedReactionReaction(fixedTm);
    setCrovneFishSpeedReactionFishVisible(false);

    await crovneFishSpeedReactionSaveBestResult(fixedTm);
  };

  const crovneFishSpeedReactionOnShare = () => {
    Share.share({
      message: `My reaction time is ${crovneFishSpeedReactionReaction} sec!`,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          paddingTop: 60,
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={GRADIENT_COLORS}
          style={{
            width: '95%',
            borderRadius: 22,
          }}
        >
          <View
            style={{
              backgroundColor: '#000',
              margin: 1,
              borderRadius: 21,
              padding: 14,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <CrovneButton
              onPress={() => crovneFishSpeedReactionNavigation.goBack()}
            >
              <Image source={require('../../assets/images/backButton.png')} />
            </CrovneButton>

            <Text
              style={{
                fontSize: 24,
                fontFamily: 'Montserrat-SemiBold',
                color: '#fff',
              }}
            >
              Game
            </Text>

            <Image source={require('../../assets/images/headLogo.png')} />
          </View>
        </LinearGradient>

        {!crovneFishSpeedReactionReaction && (
          <View>
            <ImageBackground
              source={require('../../assets/images/gameGradBg.png')}
              style={{
                width: 400,
                height: 420,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  marginTop: 80,
                  width: 260,
                  height: 260,
                  borderRadius: 28,
                  borderWidth: 2,
                  borderColor: '#FFD34C',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  alignSelf: 'center',
                  marginBottom: 90,
                  backgroundColor: '#000',
                }}
              >
                {crovneFishSpeedReactionFishVisible && (
                  <CrovneButton
                    activeOpacity={0.9}
                    onPress={crovneFishSpeedReactionOnFishPress}
                  >
                    <Image
                      source={crovneFishSpeedReactionFish}
                      style={{
                        width: 180,
                        height: 180,
                        resizeMode: 'contain',
                      }}
                    />
                  </CrovneButton>
                )}
              </View>
            </ImageBackground>

            {!crovneFishSpeedReactionGameStarted && (
              <CrovneButton
                activeOpacity={0.85}
                onPress={crovneFishSpeedReactionStartGame}
                style={{ alignSelf: 'center' }}
              >
                <LinearGradient
                  colors={GRADIENT_COLORS}
                  style={{
                    width: 281,
                    height: 81,
                    borderRadius: 22,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  start={{ x: 0.6, y: 1.8 }}
                  end={{ x: 0.7, y: 0 }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: 'Montserrat-SemiBold',
                      color: '#000',
                    }}
                  >
                    Start
                  </Text>
                </LinearGradient>
              </CrovneButton>
            )}

            {crovneFishSpeedReactionWaitingFish && (
              <LinearGradient
                colors={GRADIENT_COLORS}
                style={{
                  marginTop: 26,
                  borderRadius: 23,
                  width: '90%',
                  alignSelf: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: '#000',
                    margin: 1,
                    borderRadius: 23,
                    paddingTop: 16,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 24,
                      fontFamily: 'Montserrat-SemiBold',
                      color: '#fff',
                      marginBottom: 20,
                      textAlign: 'center',
                    }}
                  >
                    Click here!
                  </Text>

                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: 'Montserrat-Regular',
                      color: '#fff',
                      textAlign: 'center',
                      marginBottom: 30,
                    }}
                  >
                    Watch carefully, the fish could appear at any moment.
                  </Text>
                </View>
              </LinearGradient>
            )}
          </View>
        )}

        {crovneFishSpeedReactionReaction && (
          <>
            <ImageBackground
              source={require('../../assets/images/bgGradient.png')}
              style={{
                width: 350,
                height: 350,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 40,
              }}
            >
              <Image
                source={require('../../assets/images/onboardImg2.png')}
                style={{ resizeMode: 'contain', bottom: 30 }}
              />
            </ImageBackground>

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
                  paddingTop: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Montserrat-Regular',
                    color: '#ccc',
                    textAlign: 'center',
                    marginBottom: 30,
                  }}
                >
                  Your result
                </Text>

                <Text
                  style={{
                    fontSize: 32,
                    fontFamily: 'Montserrat-SemiBold',
                    color: '#fff',
                    textAlign: 'center',
                    marginBottom: 20,
                  }}
                >
                  {crovneFishSpeedReactionReaction} sec.
                </Text>

                <CrovneButton
                  activeOpacity={0.7}
                  onPress={crovneFishSpeedReactionOnShare}
                >
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
                </CrovneButton>
              </View>
            </LinearGradient>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default GameCrovneScreen;
