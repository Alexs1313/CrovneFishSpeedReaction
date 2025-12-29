import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Share,
  ScrollView as CrovneScrollWrap,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GRADIENT_COLORS } from '../consts';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';

const crovneFishSpeedReactionCrowns = [
  require('../../assets/images/crowngold.png'),
  require('../../assets/images/crownsilver.png'),
  require('../../assets/images/crownbronze.png'),
];

const crovneFishSpeedReactionFishes = [
  require('../../assets/images/crovneFish1.png'),
  require('../../assets/images/crovneFish2.png'),
  require('../../assets/images/crovneFish3.png'),
];

const crovneFishSpeedReactionStorageKeys = {
  lastGame: 'crovne_last_game',
  playerTimes: 'crovne_player_times',
};

const PartyGameCrovneScreen = () => {
  const crovneFishSpeedReactionNavigation = useNavigation();
  const [
    crovneFishSpeedReactionPlayersCount,
    setCrovneFishSpeedReactionPlayersCount,
  ] = useState(2);
  const [crovneFishSpeedReactionPlayers, setCrovneFishSpeedReactionPlayers] =
    useState(Array(2).fill(''));
  const [crovneFishSpeedReactionStarted, setCrovneFishSpeedReactionStarted] =
    useState(false);
  const [
    crovneFishSpeedReactionFishVisible,
    setCrovneFishSpeedReactionFishVisible,
  ] = useState(false);
  const [crovneFishSpeedReactionFish, setCrovneFishSpeedReactionFish] =
    useState(null);
  const [crovneFishSpeedReactionResults, setCrovneFishSpeedReactionResults] =
    useState(Array(2).fill(null));
  const [crovneFishSpeedReactionFinished, setCrovneFishSpeedReactionFinished] =
    useState(false);

  const crovneFishSpeedReactionStartTimeRef = useRef(0);

  const crovneFishSpeedReactionDisplayName = (name, index) =>
    name?.trim() ? name.trim() : `Player ${index + 1}`;

  useEffect(() => {
    setCrovneFishSpeedReactionPlayers(prev => {
      const next = [...prev];
      while (next.length < crovneFishSpeedReactionPlayersCount) next.push('');
      next.length = crovneFishSpeedReactionPlayersCount;
      return next;
    });

    setCrovneFishSpeedReactionResults(prev => {
      const next = [...prev];
      while (next.length < crovneFishSpeedReactionPlayersCount) next.push(null);
      next.length = crovneFishSpeedReactionPlayersCount;
      return next;
    });
  }, [crovneFishSpeedReactionPlayersCount]);

  const crovneFishSpeedReactionChangePlayers = dir => {
    if (crovneFishSpeedReactionStarted) return;
    setCrovneFishSpeedReactionPlayersCount(prev =>
      Math.min(4, Math.max(2, dir === 'inc' ? prev + 1 : prev - 1)),
    );
  };

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => Orientation.unlockAllOrientations();
    }, []),
  );

  const crovneFishSpeedReactionOnChangeName = (index, text) => {
    if (crovneFishSpeedReactionStarted) return;
    setCrovneFishSpeedReactionPlayers(prev => {
      const next = [...prev];
      next[index] = text;
      return next;
    });
  };

  const crovneFishSpeedReactionStartGame = () => {
    setCrovneFishSpeedReactionStarted(true);
    setCrovneFishSpeedReactionFinished(false);
    setCrovneFishSpeedReactionResults(
      Array(crovneFishSpeedReactionPlayersCount).fill(null),
    );
    setCrovneFishSpeedReactionFishVisible(false);

    const delay = Math.random() * 3000 + 1000;
    setTimeout(() => {
      setCrovneFishSpeedReactionFish(
        crovneFishSpeedReactionFishes[
          Math.floor(Math.random() * crovneFishSpeedReactionFishes.length)
        ],
      );
      crovneFishSpeedReactionStartTimeRef.current = Date.now();
      setCrovneFishSpeedReactionFishVisible(true);
    }, delay);
  };

  const crovneFishSpeedReactionSaveResults = async finalResults => {
    try {
      const now = Date.now();

      await AsyncStorage.setItem(
        crovneFishSpeedReactionStorageKeys.lastGame,
        JSON.stringify({
          createdAt: now,
          playersCount: crovneFishSpeedReactionPlayersCount,
          results: finalResults,
        }),
      );

      const savedRaw = await AsyncStorage.getItem(
        crovneFishSpeedReactionStorageKeys.playerTimes,
      );
      const savedDict = savedRaw ? JSON.parse(savedRaw) : {};

      for (const p of finalResults) {
        const timeNum = parseFloat(p.time);
        const prevBest = savedDict[p.name]?.bestTime;
        savedDict[p.name] = {
          lastTime: timeNum,
          bestTime: prevBest == null ? timeNum : Math.min(prevBest, timeNum),
          updatedAt: now,
        };
      }

      await AsyncStorage.setItem(
        crovneFishSpeedReactionStorageKeys.playerTimes,
        JSON.stringify(savedDict),
      );
    } catch {}
  };

  const crovneFishSpeedReactionOnPressPlayer = async index => {
    if (
      !crovneFishSpeedReactionFishVisible ||
      crovneFishSpeedReactionResults[index] !== null
    )
      return;

    const tm =
      (Date.now() - crovneFishSpeedReactionStartTimeRef.current) / 1000;

    const nextResults = [...crovneFishSpeedReactionResults];
    nextResults[index] = tm.toFixed(3);
    setCrovneFishSpeedReactionResults(nextResults);

    if (nextResults.every(r => r !== null)) {
      setCrovneFishSpeedReactionFishVisible(false);
      setCrovneFishSpeedReactionFinished(true);

      const finalResults = crovneFishSpeedReactionPlayers.map((name, i) => ({
        name: crovneFishSpeedReactionDisplayName(name, i),
        time: nextResults[i],
      }));

      await crovneFishSpeedReactionSaveResults(finalResults);
    }
  };

  const crovneFishSpeedReactionSortedResults = useMemo(() => {
    if (!crovneFishSpeedReactionFinished) return [];
    return crovneFishSpeedReactionPlayers
      .map((name, i) => ({
        name: crovneFishSpeedReactionDisplayName(name, i),
        time: crovneFishSpeedReactionResults[i],
      }))
      .sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
  }, [
    crovneFishSpeedReactionFinished,
    crovneFishSpeedReactionPlayers,
    crovneFishSpeedReactionResults,
  ]);

  const crovneFishSpeedReactionOnShareResults = () => {
    const text = crovneFishSpeedReactionSortedResults
      .map((p, i) => `${i + 1}. ${p.name} — ${p.time} sec.`)
      .join('\n');

    Share.share({ message: `Results:\n\n${text}` });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <CrovneScrollWrap
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {!crovneFishSpeedReactionStarted && (
          <LinearGradient colors={GRADIENT_COLORS} style={styles.header}>
            <View style={styles.headerInner}>
              <TouchableOpacity
                onPress={() => crovneFishSpeedReactionNavigation.goBack()}
              >
                <Image source={require('../../assets/images/backButton.png')} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Game</Text>
              <Image source={require('../../assets/images/headLogo.png')} />
            </View>
          </LinearGradient>
        )}

        {!crovneFishSpeedReactionStarted && (
          <View style={styles.chooseWrapper}>
            <Text style={styles.chooseTitle}>Choose players</Text>

            <View style={styles.counterRow}>
              <TouchableOpacity
                onPress={() => crovneFishSpeedReactionChangePlayers('dec')}
              >
                <Image source={require('../../assets/images/prevarr.png')} />
              </TouchableOpacity>

              <View style={styles.countBox}>
                <Text style={styles.countText}>
                  {crovneFishSpeedReactionPlayersCount}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => crovneFishSpeedReactionChangePlayers('inc')}
              >
                <Image source={require('../../assets/images/nextarr.png')} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputsCard}>
              {crovneFishSpeedReactionPlayers.map((name, index) => (
                <TextInput
                  key={index}
                  value={name}
                  onChangeText={text =>
                    crovneFishSpeedReactionOnChangeName(index, text)
                  }
                  placeholder={`Player ${index + 1}`}
                  placeholderTextColor="#777"
                  autoCapitalize="words"
                  autoCorrect={false}
                  returnKeyType="done"
                  style={styles.input}
                />
              ))}
            </View>

            <TouchableOpacity onPress={crovneFishSpeedReactionStartGame}>
              <LinearGradient
                colors={GRADIENT_COLORS}
                style={styles.startBtn}
                start={{ x: 0.6, y: 1.8 }}
                end={{ x: 0.7, y: 0 }}
              >
                <Text style={styles.startText}>Start</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {crovneFishSpeedReactionStarted &&
          !crovneFishSpeedReactionFinished &&
          crovneFishSpeedReactionPlayersCount === 2 && (
            <View style={styles.field}>
              <TouchableOpacity
                style={[
                  styles.zoneBase,
                  styles.topZone,
                  crovneFishSpeedReactionResults[0] !== null &&
                    styles.zonePressed,
                ]}
                onPress={() => crovneFishSpeedReactionOnPressPlayer(0)}
              >
                <Text style={[styles.name, styles.rotated]}>
                  {crovneFishSpeedReactionDisplayName(
                    crovneFishSpeedReactionPlayers[0],
                    0,
                  )}
                </Text>
                <Text style={[styles.time, styles.rotated]}>
                  {crovneFishSpeedReactionResults[0] ?? '0.000'} sec.
                </Text>
              </TouchableOpacity>

              <View style={styles.centerBox}>
                {!crovneFishSpeedReactionFishVisible && (
                  <Text style={styles.centerText}>Watch carefully</Text>
                )}
                {crovneFishSpeedReactionFishVisible && (
                  <Image
                    source={crovneFishSpeedReactionFish}
                    style={styles.fish}
                  />
                )}
              </View>

              <TouchableOpacity
                style={[
                  styles.zoneBase,
                  styles.bottomZone,
                  crovneFishSpeedReactionResults[1] !== null &&
                    styles.zonePressed,
                ]}
                onPress={() => crovneFishSpeedReactionOnPressPlayer(1)}
              >
                <Text style={styles.name}>
                  {crovneFishSpeedReactionDisplayName(
                    crovneFishSpeedReactionPlayers[1],
                    1,
                  )}
                </Text>
                <Text style={styles.time}>
                  {crovneFishSpeedReactionResults[1] ?? '0.000'} sec.
                </Text>
              </TouchableOpacity>
            </View>
          )}

        {crovneFishSpeedReactionStarted &&
          !crovneFishSpeedReactionFinished &&
          crovneFishSpeedReactionPlayersCount === 3 && (
            <View style={styles.field}>
              <TouchableOpacity
                style={[
                  styles.zoneBase,
                  styles.topZone,
                  crovneFishSpeedReactionResults[0] !== null &&
                    styles.zonePressed,
                ]}
                onPress={() => crovneFishSpeedReactionOnPressPlayer(0)}
              >
                <Text style={[styles.name, styles.rotated]}>
                  {crovneFishSpeedReactionDisplayName(
                    crovneFishSpeedReactionPlayers[0],
                    0,
                  )}
                </Text>
                <Text style={[styles.time, styles.rotated]}>
                  {crovneFishSpeedReactionResults[0] ?? '0.000'} sec.
                </Text>
              </TouchableOpacity>

              <View style={styles.centerBox}>
                {!crovneFishSpeedReactionFishVisible && (
                  <Text style={styles.centerText}>Watch carefully</Text>
                )}
                {crovneFishSpeedReactionFishVisible && (
                  <Image
                    source={crovneFishSpeedReactionFish}
                    style={styles.fish}
                  />
                )}
              </View>

              <View style={styles.bottomRow}>
                {[1, 2].map(i => (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.zoneBase,
                      styles.bottomHalf,
                      crovneFishSpeedReactionResults[i] !== null &&
                        styles.zonePressed,
                    ]}
                    onPress={() => crovneFishSpeedReactionOnPressPlayer(i)}
                  >
                    <Text style={styles.name}>
                      {crovneFishSpeedReactionDisplayName(
                        crovneFishSpeedReactionPlayers[i],
                        i,
                      )}
                    </Text>
                    <Text style={styles.time}>
                      {crovneFishSpeedReactionResults[i] ?? '0.000'} sec.
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

        {crovneFishSpeedReactionStarted &&
          !crovneFishSpeedReactionFinished &&
          crovneFishSpeedReactionPlayersCount === 4 && (
            <View style={styles.field}>
              <View style={styles.row}>
                {[0, 1].map(i => (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.zoneBase,
                      styles.bottomHalf,
                      crovneFishSpeedReactionResults[i] !== null &&
                        styles.zonePressed,
                    ]}
                    onPress={() => crovneFishSpeedReactionOnPressPlayer(i)}
                  >
                    <Text style={[styles.name, styles.rotated]}>
                      {crovneFishSpeedReactionDisplayName(
                        crovneFishSpeedReactionPlayers[i],
                        i,
                      )}
                    </Text>
                    <Text style={[styles.time, styles.rotated]}>
                      {crovneFishSpeedReactionResults[i] ?? '0.000'} sec.
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.centerBox}>
                {!crovneFishSpeedReactionFishVisible && (
                  <Text style={styles.centerText}>Watch carefully</Text>
                )}
                {crovneFishSpeedReactionFishVisible && (
                  <Image
                    source={crovneFishSpeedReactionFish}
                    style={styles.fish}
                  />
                )}
              </View>

              <View style={styles.row}>
                {[2, 3].map(i => (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.zoneBase,
                      styles.quarter,
                      crovneFishSpeedReactionResults[i] !== null &&
                        styles.zonePressed,
                    ]}
                    onPress={() => crovneFishSpeedReactionOnPressPlayer(i)}
                  >
                    <Text style={styles.name}>
                      {crovneFishSpeedReactionDisplayName(
                        crovneFishSpeedReactionPlayers[i],
                        i,
                      )}
                    </Text>
                    <Text style={styles.time}>
                      {crovneFishSpeedReactionResults[i] ?? '0.000'} sec.
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

        {crovneFishSpeedReactionFinished && (
          <CrovneScrollWrap contentContainerStyle={styles.resultWrapper}>
            <LinearGradient colors={GRADIENT_COLORS} style={styles.header}>
              <View style={styles.headerInner}>
                <TouchableOpacity
                  onPress={() => crovneFishSpeedReactionNavigation.goBack()}
                >
                  <Image
                    source={require('../../assets/images/backButton.png')}
                  />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Game</Text>
                <Image source={require('../../assets/images/headLogo.png')} />
              </View>
            </LinearGradient>

            <Text style={styles.resultTitle}>Result</Text>

            {crovneFishSpeedReactionSortedResults.map((p, i) => (
              <View
                key={i}
                style={[styles.partyRow, { width: i === 0 ? '90%' : '80%' }]}
              >
                <View style={styles.left}>
                  {i < 3 ? (
                    <Image
                      source={crovneFishSpeedReactionCrowns[i]}
                      style={styles.crown}
                    />
                  ) : (
                    <View style={styles.place}>
                      <Text style={styles.placeText}>{i + 1}</Text>
                    </View>
                  )}
                  <Text style={styles.player}>{p.name}</Text>
                </View>

                <View style={styles.timeBox}>
                  <Text style={styles.partyTime}>{p.time}</Text>
                </View>
              </View>
            ))}

            <TouchableOpacity
              style={{ marginTop: 50 }}
              activeOpacity={0.8}
              onPress={crovneFishSpeedReactionOnShareResults}
            >
              <LinearGradient
                colors={GRADIENT_COLORS}
                style={styles.shareBtn}
                start={{ x: 0.6, y: 1.8 }}
                end={{ x: 0.7, y: 0 }}
              >
                <Text style={styles.shareBtnText}>Share</Text>
              </LinearGradient>
            </TouchableOpacity>
          </CrovneScrollWrap>
        )}
      </CrovneScrollWrap>
    </View>
  );
};

export default PartyGameCrovneScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: {
    marginTop: 60,
    width: '95%',
    borderRadius: 22,
    alignSelf: 'center',
    marginBottom: 38,
  },
  headerInner: {
    backgroundColor: '#000',
    margin: 1,
    borderRadius: 21,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
  },
  chooseWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  chooseTitle: {
    fontSize: 22,
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
    marginBottom: 20,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 36,
    gap: 12,
  },
  countBox: {
    width: 140,
    height: 58,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: '#FFD34C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 32,
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
  },
  inputsCard: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#FFD34C',
    borderRadius: 22,
    padding: 24,
    marginBottom: 35,
    minHeight: 290,
  },
  input: {
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#FFD34C',
    borderRadius: 22,
    paddingHorizontal: 16,
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    marginBottom: 15,
  },
  startBtn: {
    width: 280,
    height: 80,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startText: {
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    color: '#000',
  },
  field: { flex: 1 },
  zoneBase: {
    borderWidth: 1,
    borderColor: '#FFD34C',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  topZone: { width: '100%', height: '50%' },
  bottomZone: { width: '100%', height: '50%' },
  bottomRow: { flexDirection: 'row', width: '100%', height: '50%' },
  bottomHalf: { width: '50%', height: '100%' },
  row: { flexDirection: 'row', width: '100%', height: '50%' },
  quarter: { width: '50%', height: '100%' },
  zonePressed: { backgroundColor: '#09A102' },
  name: {
    fontSize: 26,
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  time: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
    marginTop: 6,
  },
  rotated: { transform: [{ rotate: '180deg' }] },
  centerBox: {
    position: 'absolute',
    top: '42%',
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#FFD34C',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    zIndex: 10,
  },
  centerText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
  },
  fish: { width: 80, height: 80, resizeMode: 'contain' },
  resultWrapper: {
    paddingTop: 20,
    alignItems: 'center',
    paddingBottom: 60,
  },
  resultTitle: {
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
    marginBottom: 30,
  },
  partyRow: {
    alignSelf: 'center',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#FFD34C',
    padding: 22,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: { flexDirection: 'row', alignItems: 'center' },
  crown: {
    width: 54,
    height: 54,
    resizeMode: 'contain',
    marginRight: 10,
  },
  place: {
    width: 54,
    height: 54,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#FFD34C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  placeText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
    fontSize: 24,
  },
  player: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    color: '#fff',
  },
  timeBox: {
    borderWidth: 1,
    borderColor: '#FFD34C',
    borderRadius: 14,
    paddingVertical: 9,
    paddingHorizontal: 12,
    minWidth: 100,
    minHeight: 53,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partyTime: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    color: '#fff',
  },
  shareBtn: {
    width: 260,
    height: 70,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareBtnText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 22,
    color: '#000',
  },
});
