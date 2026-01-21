import {
  View as CrovneMainBox,
  Text,
  TouchableOpacity,
  ScrollView as CrovneScrollWrap,
  Image,
  Share,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { GRADIENT_COLORS } from '../consts';

const mainYellow = '#FFD34C';
const fontR = 'Montserrat-Regular';
const fontSB = 'Montserrat-SemiBold';
const mainWhite = '#FFFFFF';

const crovneFishSpeedReactionStorage = {
  solo: 'crovne_best_reaction',
  party: 'crovne_player_times',
};

const crovneFishSpeedReactionCrowns = [
  require('../../assets/images/crowngold.png'),
  require('../../assets/images/crownsilver.png'),
  require('../../assets/images/crownbronze.png'),
];

const StatsCrovneScreen = () => {
  const crovneFishSpeedReactionNavigation = useNavigation();
  const [crovneFishSpeedReactionMode, setCrovneFishSpeedReactionMode] =
    useState('solo');
  const [crovneFishSpeedReactionSoloBest, setCrovneFishSpeedReactionSoloBest] =
    useState(null);
  const [
    crovneFishSpeedReactionPartyList,
    setCrovneFishSpeedReactionPartyList,
  ] = useState([]);

  useEffect(() => {
    crovneFishSpeedReactionLoadData();
  }, [crovneFishSpeedReactionMode]);

  const crovneFishSpeedReactionLoadData = async () => {
    if (crovneFishSpeedReactionMode === 'solo') {
      const svdMode = await AsyncStorage.getItem(
        crovneFishSpeedReactionStorage.solo,
      );
      setCrovneFishSpeedReactionSoloBest(svdMode ? JSON.parse(svdMode) : null);
      return;
    }

    const svdMode = await AsyncStorage.getItem(
      crovneFishSpeedReactionStorage.party,
    );
    let list = [];

    if (svdMode) {
      const dict = JSON.parse(svdMode);
      list = Object.entries(dict)
        .map(([name, data]) => ({
          name,
          bestTime: data.bestTime,
        }))
        .sort((a, b) => a.bestTime - b.bestTime)
        .slice(0, 4);
    }

    while (list.length < 4) {
      list.push({ name: '---', bestTime: null });
    }

    setCrovneFishSpeedReactionPartyList(list);
  };

  const crovneFishSpeedReactionShareText = message => {
    Share.share({ message });
  };

  const crovneFishSpeedReactionClearSolo = async () => {
    await AsyncStorage.removeItem(crovneFishSpeedReactionStorage.solo);
    setCrovneFishSpeedReactionSoloBest(null);
  };

  const crovneFishSpeedReactionHasPartyData =
    crovneFishSpeedReactionPartyList.some(party => party.bestTime !== null);

  return (
    <CrovneMainBox style={{ flex: 1, backgroundColor: '#000', paddingTop: 60 }}>
      <CrovneScrollWrap
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient colors={GRADIENT_COLORS} style={styles.gradientBack}>
          <CrovneMainBox style={styles.head}>
            <TouchableOpacity
              onPress={() => crovneFishSpeedReactionNavigation.goBack()}
            >
              <Image source={require('../../assets/images/backButton.png')} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 24,
                fontFamily: fontSB,
                color: mainWhite,
              }}
            >
              Statistics
            </Text>
            <Image source={require('../../assets/images/headLogo.png')} />
          </CrovneMainBox>
        </LinearGradient>

        <CrovneMainBox
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 24,
          }}
        >
          {['solo', 'party'].map(v => (
            <TouchableOpacity
              key={v}
              onPress={() => setCrovneFishSpeedReactionMode(v)}
              style={{
                width: 185,
                height: 62,
                borderRadius: 22,
                borderWidth: 1,
                borderColor: mainYellow,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 6,
                opacity: crovneFishSpeedReactionMode === v ? 1 : 0.6,
              }}
            >
              <Text
                style={{
                  fontFamily: fontSB,
                  fontSize: 20,
                  color:
                    crovneFishSpeedReactionMode === v ? mainWhite : '#9D8202',
                }}
              >
                {v === 'solo' ? 'Solo mode' : 'Party mode'}
              </Text>
            </TouchableOpacity>
          ))}
        </CrovneMainBox>

        {crovneFishSpeedReactionMode === 'solo' && (
          <>
            <CrovneMainBox style={styles.bestResWrap}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: fontR,
                  color: mainWhite,
                  textAlign: 'center',
                  marginBottom: 12,
                }}
              >
                Best result
              </Text>
              <Text
                style={{
                  fontSize: 34,
                  fontFamily: fontSB,
                  color: mainWhite,
                  textAlign: 'center',
                }}
              >
                {crovneFishSpeedReactionSoloBest
                  ? crovneFishSpeedReactionSoloBest.bestTime.toFixed(3)
                  : '0.000'}{' '}
                sec.
              </Text>
            </CrovneMainBox>

            {!crovneFishSpeedReactionSoloBest && (
              <Text style={styles.noDataText}>No data...</Text>
            )}

            {crovneFishSpeedReactionSoloBest && (
              <CrovneMainBox style={styles.dateBox}>
                <Text style={styles.dateBoxText}>
                  {crovneFishSpeedReactionSoloBest.date}
                </Text>

                <Text style={styles.dateBoxTextSub}>
                  {crovneFishSpeedReactionSoloBest.bestTime.toFixed(3)} sec.
                </Text>

                <CrovneMainBox
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      crovneFishSpeedReactionShareText(
                        `My best reaction time is ${crovneFishSpeedReactionSoloBest.bestTime.toFixed(
                          3,
                        )} sec!`,
                      )
                    }
                  >
                    <ImageBackground
                      source={require('../../assets/images/shareButton.png')}
                      style={styles.shareBtn}
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
                  </TouchableOpacity>

                  <TouchableOpacity onPress={crovneFishSpeedReactionClearSolo}>
                    <Image
                      source={require('../../assets/images/deleteBtn.png')}
                    />
                  </TouchableOpacity>
                </CrovneMainBox>
              </CrovneMainBox>
            )}
          </>
        )}

        {crovneFishSpeedReactionMode === 'party' && (
          <>
            {crovneFishSpeedReactionPartyList.map((p, i) => (
              <CrovneMainBox
                key={i}
                style={{
                  width: i === 0 ? '90%' : '80%',
                  alignSelf: 'center',
                  borderRadius: 22,
                  borderWidth: 1,
                  borderColor: mainYellow,
                  padding: 22,
                  marginBottom: 14,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <CrovneMainBox
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  {i < 3 ? (
                    <Image
                      source={crovneFishSpeedReactionCrowns[i]}
                      style={{
                        width: 54,
                        height: 54,
                        resizeMode: 'contain',
                        marginRight: 10,
                      }}
                    />
                  ) : (
                    <CrovneMainBox style={styles.crownIndexBox}>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-SemiBold',
                          color: '#fff',
                          fontSize: 24,
                        }}
                      >
                        {i + 1}
                      </Text>
                    </CrovneMainBox>
                  )}
                  <Text
                    style={{
                      fontFamily: fontSB,
                      fontSize: 20,
                      color: mainWhite,
                    }}
                  >
                    {p.name}
                  </Text>
                </CrovneMainBox>

                <CrovneMainBox style={styles.crownBestTimeBox}>
                  <Text
                    style={{
                      fontFamily: fontSB,
                      fontSize: 15,
                      color: mainWhite,
                    }}
                  >
                    {p.bestTime !== null
                      ? `${p.bestTime.toFixed(3)} sec.`
                      : '---'}
                  </Text>
                </CrovneMainBox>
              </CrovneMainBox>
            ))}

            {crovneFishSpeedReactionHasPartyData && (
              <TouchableOpacity
                style={{ marginTop: 26, alignItems: 'center' }}
                onPress={() =>
                  crovneFishSpeedReactionShareText(
                    crovneFishSpeedReactionPartyList
                      .filter(p => p.bestTime !== null)
                      .map(
                        (p, i) =>
                          `${i + 1}. ${p.name} — ${p.bestTime.toFixed(3)} sec.`,
                      )
                      .join('\n'),
                  )
                }
              >
                <LinearGradient
                  colors={GRADIENT_COLORS}
                  style={styles.shareBtnBott}
                  start={{ x: 0.6, y: 1.8 }}
                  end={{ x: 0.7, y: 0 }}
                >
                  <Text
                    style={{
                      fontFamily: fontSB,
                      fontSize: 22,
                      color: '#000',
                    }}
                  >
                    Share
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </>
        )}
      </CrovneScrollWrap>
    </CrovneMainBox>
  );
};

const styles = StyleSheet.create({
  head: {
    backgroundColor: '#000',
    margin: 1,
    borderRadius: 21,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gradientBack: {
    width: '95%',
    borderRadius: 22,
    alignSelf: 'center',
    marginBottom: 24,
  },
  bestResWrap: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 23,
    borderWidth: 1,
    borderColor: mainYellow,
    paddingVertical: 24,
    marginBottom: 20,
  },
  noDataText: {
    marginTop: 60,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: 20,
    color: '#fff',
  },
  dateBox: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 23,
    borderWidth: 2,
    borderColor: mainYellow,
    paddingTop: 10,
    marginBottom: 20,
  },
  dateBoxText: {
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  dateBoxTextSub: {
    fontSize: 26,
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 38,
  },
  shareBtn: {
    width: 165,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crownIndexBox: {
    width: 54,
    height: 54,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: mainYellow,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  crownBestTimeBox: {
    borderWidth: 1,
    borderColor: mainYellow,
    borderRadius: 14,
    paddingVertical: 9,
    paddingHorizontal: 12,
    minWidth: 100,
    minHeight: 53,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareBtnBott: {
    width: 260,
    height: 70,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StatsCrovneScreen;
