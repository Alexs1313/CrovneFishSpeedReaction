import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  ImageBackground,
  Share,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { GRADIENT_COLORS } from '../consts';
import { BlurView } from '@react-native-community/blur';

const crovneFishSpeedReactionStorageKeys = {
  unlocked: 'crovne_unlocked_wallpapers',
  nextPlayAt: 'crovne_wallpapers_next_play_at',
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
      const unlockedCrvneRaw = await AsyncStorage.getItem(
        crovneFishSpeedReactionStorageKeys.unlocked,
      );
      const timeRaw = await AsyncStorage.getItem(
        crovneFishSpeedReactionStorageKeys.nextPlayAt,
      );

      setCrovneFishSpeedReactionUnlocked(
        unlockedCrvneRaw ? JSON.parse(unlockedCrvneRaw) : [],
      );
      setCrovneFishSpeedReactionNextPlayAt(timeRaw ? Number(timeRaw) : null);
    })();
  }, []);

  useEffect(() => {
    if (!crovneFishSpeedReactionLocked) return;

    crovneFishSpeedReactionTimerRef.current = setInterval(() => {
      setCrovneFishSpeedReactionTick(t => t + 1);
    }, 1000);

    return () => clearInterval(crovneFishSpeedReactionTimerRef.current);
  }, [crovneFishSpeedReactionLocked]);

  const crovneFishSpeedReactionResetAttemptsWithShuffle = () => {
    setCrovneFishSpeedReactionAttemptsLeft(2);
    setCrovneFishSpeedReactionDeck(crovneFishSpeedReactionBuildDeck());
    setCrovneFishSpeedReactionRevealed([]);
    setCrovneFishSpeedReactionBusy(false);
  };

  const crovneFishSpeedReactionResetAfterWin = () => {
    setCrovneFishSpeedReactionAttemptsLeft(2);
    setCrovneFishSpeedReactionRevealed([]);
    setCrovneFishSpeedReactionBusy(false);
  };

  const crovneFishSpeedReactionLockFor24h = async () => {
    const ts = Date.now() + 24 * 60 * 60 * 1000;
    setCrovneFishSpeedReactionNextPlayAt(ts);
    await AsyncStorage.setItem(
      crovneFishSpeedReactionStorageKeys.nextPlayAt,
      String(ts),
    );
  };

  const crovneFishSpeedReactionUnlockWallpaper = async fishId => {
    if (crovneFishSpeedReactionUnlocked.includes(fishId)) return;

    const next = [...crovneFishSpeedReactionUnlocked, fishId];
    setCrovneFishSpeedReactionUnlocked(next);

    await AsyncStorage.setItem(
      crovneFishSpeedReactionStorageKeys.unlocked,
      JSON.stringify(next),
    );
  };

  const crovneFishSpeedReactionOnPressCard = async key => {
    if (crovneFishSpeedReactionLocked || crovneFishSpeedReactionBusy) return;

    if (crovneFishSpeedReactionRevealed.includes(key)) return;

    if (crovneFishSpeedReactionRevealed.length === 3) return;

    const next = [...crovneFishSpeedReactionRevealed, key];
    setCrovneFishSpeedReactionRevealed(next);

    if (next.length === 3) {
      setCrovneFishSpeedReactionBusy(true);

      const cards = next.map(k =>
        crovneFishSpeedReactionDeck.find(c => c.key === k),
      );
      const ids = cards.map(c => c.fishId);
      const win = ids.every(id => id === ids[0]);

      if (win) {
        await crovneFishSpeedReactionUnlockWallpaper(ids[0]);
        await crovneFishSpeedReactionLockFor24h();
        setCrovneFishSpeedReactionWonFishId(ids[0]);
        setCrovneFishSpeedReactionWinModal(true);
      } else {
        setCrovneFishSpeedReactionAttemptsLeft(prev => {
          const nextAttempts = prev - 1;

          setTimeout(() => {
            if (nextAttempts <= 0) {
              crovneFishSpeedReactionResetAttemptsWithShuffle();
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
      <ScrollView
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
            <TouchableOpacity
              onPress={() => crovneFishSpeedReactionNavigation.goBack()}
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
                fontFamily: 'Montserrat-SemiBold',
                color: '#fff',
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
                borderColor: '#FFD34C',
                paddingVertical: 24,
                alignItems: 'center',
                marginTop: 40,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: 'Montserrat-SemiBold',
                  color: '#FFF',
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
                  fontFamily: 'Montserrat-SemiBold',
                  color: '#FFF',
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
                    <TouchableOpacity
                      key={card.key}
                      style={{
                        width: '23%',
                        aspectRatio: 1,
                        marginBottom: 10,
                      }}
                      activeOpacity={0.85}
                      onPress={() =>
                        crovneFishSpeedReactionOnPressCard(card.key)
                      }
                    >
                      <View
                        style={{
                          flex: 1,
                          borderRadius: 20,
                          borderWidth: 1.5,
                          borderColor: '#FFD34C',
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
                              fontFamily: 'Montserrat-SemiBold',
                              color: '#FFD34C',
                            }}
                          ></Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          )}
        </View>

        <Modal
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
                borderColor: '#FFD34C',
                backgroundColor: '#000',
                paddingTop: 18,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'Montserrat-SemiBold',
                  color: '#fff',
                  marginBottom: 14,
                  textAlign: 'center',
                }}
              >
                Congratulations!
              </Text>

              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Montserrat-Regular',
                  color: '#fff',
                  textAlign: 'center',
                  marginBottom: 20,
                }}
              >
                You have received the collection wallpapers. You can view and
                download them in the "Collection" section
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setCrovneFishSpeedReactionWinModal(false);
                    crovneFishSpeedReactionResetAfterWin();
                  }}
                >
                  <Image source={require('../../assets/images/backCard.png')} />
                </TouchableOpacity>

                <TouchableOpacity
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
                        fontFamily: 'Montserrat-SemiBold',
                        color: '#000',
                      }}
                    >
                      Share
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default DailyCrovneWallpaperScreen;
