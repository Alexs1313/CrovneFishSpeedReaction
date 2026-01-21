import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity as CrovneButton,
  Image,
  ScrollView as CrovneScrollWrap,
  Modal as CrovneCustomModal,
  ImageBackground,
  Share,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { GRADIENT_COLORS } from '../consts';
import { BlurView } from '@react-native-community/blur';

const mainYellow = '#FFD34C';
const fontR = 'Montserrat-Regular';
const fontSB = 'Montserrat-SemiBold';
const mainWhite = '#FFFFFF';

const crovneFishSpeedReactionStorageKeys = {
  unlocked: 'crovne_unlocked_wallpapers',
  nextPlayAt: 'crovne_wallpapers_next_play_at',
};

const crovneFishSpeedReactionPad = n => String(n).padStart(2, '0');

const crovneFishSpeedReactionFormatHMS = sec =>
  `${crovneFishSpeedReactionPad(
    Math.floor(sec / 3600),
  )}:${crovneFishSpeedReactionPad(
    Math.floor((sec % 3600) / 60),
  )}:${crovneFishSpeedReactionPad(sec % 60)}`;

const crovneFishSpeedReactionShuffle = arr => {
  const crvnA = [...arr];
  for (let i = crvnA.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [crvnA[i], crvnA[j]] = [crvnA[j], crvnA[i]];
  }
  return crvnA;
};

const crovneFishSpeedReactionFishes = [
  {
    id: 'fish1',
    name: 'Crovne Fish I',
    card: require('../../assets/images/crovneFish1.png'),
    wallpaper: require('../../assets/images/wallp1.png'),
  },
  {
    id: 'fish2',
    name: 'Crovne Fish II',
    card: require('../../assets/images/crovneFish2.png'),
    wallpaper: require('../../assets/images/wallp2.png'),
  },
  {
    id: 'fish3',
    name: 'Crovne Fish III',
    card: require('../../assets/images/crovneFish3.png'),
    wallpaper: require('../../assets/images/wallp3.png'),
  },
];

const crovneFishSpeedReactionBuildDeck = () => {
  const cards = [];
  let index = 0;

  while (cards.length < 16) {
    const cllFish =
      crovneFishSpeedReactionFishes[
        index % crovneFishSpeedReactionFishes.length
      ];

    cards.push(
      { key: `${cllFish.id}-${cards.length}-1`, fishId: cllFish.id },
      { key: `${cllFish.id}-${cards.length}-2`, fishId: cllFish.id },
    );

    index++;
  }

  return crovneFishSpeedReactionShuffle(cards.slice(0, 16));
};

const DailyCrovneWallpaperScreen = () => {
  const crovneFishSpeedReactionNavigation = useNavigation();
  const [crovneFishSpeedReactionUnlocked, setCrovneFishSpeedReactionUnlocked] =
    useState([]);
  const [
    crovneFishSpeedReactionNextPlayAt,
    setCrovneFishSpeedReactionNextPlayAt,
  ] = useState(null);
  const [crovneFishSpeedReactionDeck, setCrovneFishSpeedReactionDeck] =
    useState(crovneFishSpeedReactionBuildDeck);
  const [crovneFishSpeedReactionRevealed, setCrovneFishSpeedReactionRevealed] =
    useState([]);
  const [
    crovneFishSpeedReactionAttemptsLeft,
    setCrovneFishSpeedReactionAttemptsLeft,
  ] = useState(2);
  const [crovneFishSpeedReactionBusy, setCrovneFishSpeedReactionBusy] =
    useState(false);
  const [
    crovneFishSpeedReactionWonFishId,
    setCrovneFishSpeedReactionWonFishId,
  ] = useState(null);
  const [crovneFishSpeedReactionWinModal, setCrovneFishSpeedReactionWinModal] =
    useState(false);
  const [crovneFishSpeedReactionTick, setCrovneFishSpeedReactionTick] =
    useState(0);

  const crovneFishSpeedReactionTimerRef = useRef(null);

  const crovneFishSpeedReactionLocked =
    crovneFishSpeedReactionNextPlayAt &&
    Date.now() < crovneFishSpeedReactionNextPlayAt;

  const crovneFishSpeedReactionSecondsLeft = crovneFishSpeedReactionLocked
    ? Math.max(
        0,
        Math.floor((crovneFishSpeedReactionNextPlayAt - Date.now()) / 1000),
      )
    : 0;

  useEffect(() => {
    (async () => {
      const unlockedCurveRaw = await AsyncStorage.getItem(
        crovneFishSpeedReactionStorageKeys.unlocked,
      );
      const nextPlayTimeRaw = await AsyncStorage.getItem(
        crovneFishSpeedReactionStorageKeys.nextPlayAt,
      );

      setCrovneFishSpeedReactionUnlocked(
        unlockedCurveRaw ? JSON.parse(unlockedCurveRaw) : [],
      );
      setCrovneFishSpeedReactionNextPlayAt(
        nextPlayTimeRaw ? Number(nextPlayTimeRaw) : null,
      );
    })();
  }, []);

  useEffect(() => {
    if (!crovneFishSpeedReactionLocked) return;

    crovneFishSpeedReactionTimerRef.current = setInterval(() => {
      setCrovneFishSpeedReactionTick(tick => tick + 1);
    }, 1000);

    return () => clearInterval(crovneFishSpeedReactionTimerRef.current);
  }, [crovneFishSpeedReactionLocked]);

  const resetFishSpeedReactionAttemptsWithShuffle = () => {
    setCrovneFishSpeedReactionAttemptsLeft(2);
    setCrovneFishSpeedReactionDeck(crovneFishSpeedReactionBuildDeck());
    setCrovneFishSpeedReactionRevealed([]);
    setCrovneFishSpeedReactionBusy(false);
  };

  const resetFishSpeedReactionAfterWin = () => {
    setCrovneFishSpeedReactionAttemptsLeft(2);
    setCrovneFishSpeedReactionRevealed([]);
    setCrovneFishSpeedReactionBusy(false);
  };

  const lockFishSpeedReactionFor24h = async () => {
    const nextPlayTimestamp = Date.now() + 24 * 60 * 60 * 1000;

    setCrovneFishSpeedReactionNextPlayAt(nextPlayTimestamp);

    await AsyncStorage.setItem(
      crovneFishSpeedReactionStorageKeys.nextPlayAt,
      String(nextPlayTimestamp),
    );
  };

  const unlockFishSpeedReactionWallpaper = async fishId => {
    if (crovneFishSpeedReactionUnlocked.includes(fishId)) return;

    const updatedUnlockedWallpapers = [
      ...crovneFishSpeedReactionUnlocked,
      fishId,
    ];
    setCrovneFishSpeedReactionUnlocked(updatedUnlockedWallpapers);

    await AsyncStorage.setItem(
      crovneFishSpeedReactionStorageKeys.unlocked,
      JSON.stringify(updatedUnlockedWallpapers),
    );
  };

  const handleFishSpeedReactionCardPress = async key => {
    if (crovneFishSpeedReactionLocked || crovneFishSpeedReactionBusy) return;

    if (crovneFishSpeedReactionRevealed.includes(key)) return;

    if (crovneFishSpeedReactionRevealed.length === 3) return;

    const nextRevealed = [...crovneFishSpeedReactionRevealed, key];
    setCrovneFishSpeedReactionRevealed(nextRevealed);

    if (nextRevealed.length === 3) {
      setCrovneFishSpeedReactionBusy(true);

      const selectedCards = nextRevealed.map(k =>
        crovneFishSpeedReactionDeck.find(c => c.key === k),
      );

      const fishIds = selectedCards.map(card => card.fishId);

      const isWin = fishIds.every(id => id === fishIds[0]);

      if (isWin) {
        await unlockFishSpeedReactionWallpaper(fishIds[0]);
        await lockFishSpeedReactionFor24h();
        setCrovneFishSpeedReactionWonFishId(fishIds[0]);
        setCrovneFishSpeedReactionWinModal(true);
      } else {
        setCrovneFishSpeedReactionAttemptsLeft(prevAttempts => {
          const nextAttempts = prevAttempts - 1;

          setTimeout(() => {
            if (nextAttempts <= 0) {
              resetFishSpeedReactionAttemptsWithShuffle();
            } else {
              setCrovneFishSpeedReactionRevealed([]);
              setCrovneFishSpeedReactionBusy(false);
            }
          }, 700);

          return nextAttempts;
        });
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000', paddingTop: 60 }}>
      <CrovneScrollWrap
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={GRADIENT_COLORS}
          style={{
            width: '95%',
            borderRadius: 22,
            alignSelf: 'center',
            marginBottom: 22,
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
                fontFamily: fontSB,
                color: mainWhite,
              }}
            >
              Wallpapers
            </Text>

            <Image source={require('../../assets/images/headLogo.png')} />
          </View>
        </LinearGradient>

        <View
          style={{
            paddingBottom: 60,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            bottom: 50,
          }}
        >
          {crovneFishSpeedReactionLocked && (
            <Text
              style={{
                fontSize: 24,
                fontFamily: fontSB,
                color: mainWhite,
                marginBottom: 8,
                textAlign: 'center',
                marginTop: 60,
              }}
            >
              See you later
            </Text>
          )}
          {crovneFishSpeedReactionLocked && (
            <View
              style={{
                width: '55%',
                alignSelf: 'center',
                borderRadius: 22,
                borderWidth: 1,
                borderColor: mainYellow,
                paddingVertical: 24,
                alignItems: 'center',
                marginTop: 40,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: fontSB,
                  color: mainWhite,
                }}
              >
                {crovneFishSpeedReactionFormatHMS(
                  crovneFishSpeedReactionSecondsLeft,
                )}
              </Text>
            </View>
          )}

          {!crovneFishSpeedReactionLocked && (
            <>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  fontFamily: fontSB,
                  color: mainWhite,
                  marginBottom: 24,
                  marginTop: 60,
                }}
              >
                You have {crovneFishSpeedReactionAttemptsLeft}/2 attempts.
              </Text>

              <View
                style={{
                  width: '92%',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}
              >
                {crovneFishSpeedReactionDeck.map(card => {
                  const revealed = crovneFishSpeedReactionRevealed.includes(
                    card.key,
                  );
                  const fish = crovneFishSpeedReactionFishes.find(
                    f => f.id === card.fishId,
                  );

                  return (
                    <CrovneButton
                      key={card.key}
                      style={{
                        width: '23%',
                        aspectRatio: 1,
                        marginBottom: 10,
                      }}
                      activeOpacity={0.85}
                      onPress={() => handleFishSpeedReactionCardPress(card.key)}
                    >
                      <View
                        style={{
                          flex: 1,
                          borderRadius: 20,
                          borderWidth: 1.5,
                          borderColor: mainYellow,
                          backgroundColor: '#000',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {revealed ? (
                          <Image
                            source={fish.card}
                            style={{
                              width: 64,
                              height: 64,
                              resizeMode: 'contain',
                            }}
                          />
                        ) : (
                          <Text
                            style={{
                              fontSize: 30,
                              fontFamily: fontSB,
                              color: mainYellow,
                            }}
                          ></Text>
                        )}
                      </View>
                    </CrovneButton>
                  );
                })}
              </View>
            </>
          )}
        </View>

        <CrovneCustomModal
          visible={crovneFishSpeedReactionWinModal}
          transparent
          animationType="fade"
        >
          {Platform.OS === 'ios' && (
            <BlurView
              blurType="light"
              blurAmount={1}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
          )}
          <View
            style={{
              flex: 1,
              backgroundColor: Platform.OS === 'android' ? '#59595966' : null,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={
                crovneFishSpeedReactionFishes.find(
                  f => f.id === crovneFishSpeedReactionWonFishId,
                )?.wallpaper
              }
              style={{
                resizeMode: 'contain',
                marginBottom: 43,
              }}
            />
            <View
              style={{
                width: '85%',
                borderRadius: 24,
                borderWidth: 2,
                borderColor: mainYellow,
                backgroundColor: '#000',
                paddingTop: 18,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: fontSB,
                  color: mainWhite,
                  marginBottom: 14,
                  textAlign: 'center',
                }}
              >
                Congratulations!
              </Text>

              <Text
                style={{
                  fontSize: 15,
                  fontFamily: fontR,
                  color: mainWhite,
                  textAlign: 'center',
                  marginBottom: 20,
                }}
              >
                You have received the collection wallpapers! You can view and
                download them in the "Collection" section
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <CrovneButton
                  onPress={() => {
                    setCrovneFishSpeedReactionWinModal(false);
                    resetFishSpeedReactionAfterWin();
                  }}
                >
                  <Image source={require('../../assets/images/backCard.png')} />
                </CrovneButton>

                <CrovneButton
                  activeOpacity={0.7}
                  onPress={() =>
                    Share.share({
                      message:
                        'Congratulations! You have received the collection wallpapers. You can view and download them in the "Collection" section',
                    })
                  }
                >
                  <ImageBackground
                    source={require('../../assets/images/onboardBtn.png')}
                    style={{
                      width: 165,
                      height: 44,
                      alignSelf: 'flex-end',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: fontSB,
                        color: '#000',
                      }}
                    >
                      Share
                    </Text>
                  </ImageBackground>
                </CrovneButton>
              </View>
            </View>
          </View>
        </CrovneCustomModal>
      </CrovneScrollWrap>
    </View>
  );
};

export default DailyCrovneWallpaperScreen;
