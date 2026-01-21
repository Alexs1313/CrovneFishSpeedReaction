import {
  View,
  Text,
  TouchableOpacity as CrovneButton,
  Image,
  FlatList,
  Share,
  Platform,
  ImageBackground,
  ScrollView as CrovneScrollWrap,
} from 'react-native';
import { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { GRADIENT_COLORS } from '../consts';
import { useStore } from '../[FishSpeedReactionStore]/context';

const fontR = 'Montserrat-Regular';
const fontSB = 'Montserrat-SemiBold';
const mainWhite = '#FFFFFF';

const CollectionCrovneScreen = () => {
  const crovneFishSpeedReactionNavigation = useNavigation();
  const {
    crovneFishSpeedReactionUnlocked,
    crovneFishSpeedReactionLoadWallpapers,
  } = useStore();

  const crovneFishSpeedReactionWallpapers = {
    fish1: {
      id: 'fish1',
      image: require('../../assets/images/wallp1.png'),
    },
    fish2: {
      id: 'fish2',
      image: require('../../assets/images/wallp2.png'),
    },
    fish3: {
      id: 'fish3',
      image: require('../../assets/images/wallp3.png'),
    },
  };

  useEffect(() => {
    crovneFishSpeedReactionLoadWallpapers();
  }, []);

  const crovneFishSpeedReactionGetImageUri = image => {
    const crovneFishSpeedReactionResolved = Image.resolveAssetSource(image);

    return Platform.OS === 'android'
      ? `file://${crovneFishSpeedReactionResolved.uri}`
      : crovneFishSpeedReactionResolved.uri;
  };

  const crovneFishSpeedReactionOnShare = id => {
    const crovneFishSpeedReactionWallpaper =
      crovneFishSpeedReactionWallpapers[id];

    if (!crovneFishSpeedReactionWallpaper) return;

    const crovneFishSpeedReactionUri = crovneFishSpeedReactionGetImageUri(
      crovneFishSpeedReactionWallpaper.image,
    );

    Share.share({
      url: crovneFishSpeedReactionUri,
      message: 'Check out my wallpaper',
    });
  };

  const crovneFishSpeedReactionRenderItem = ({ item }) => {
    const crovneFishSpeedReactionWallpaper =
      crovneFishSpeedReactionWallpapers[item];

    if (!crovneFishSpeedReactionWallpaper) return null;

    return (
      <View style={{ width: '50%', marginBottom: 16 }}>
        <ImageBackground
          source={crovneFishSpeedReactionWallpaper.image}
          style={{
            resizeMode: 'cover',
            width: 160,
            height: 240,
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <CrovneButton onPress={() => crovneFishSpeedReactionOnShare(item)}>
              <ImageBackground
                source={require('../../assets/images/shrBtn.png')}
                style={{
                  width: 89,
                  height: 29,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: fontSB,
                    color: '#000',
                  }}
                >
                  Share
                </Text>
              </ImageBackground>
            </CrovneButton>
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 60,
      }}
    >
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
            marginBottom: 50,
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
              Collection
            </Text>

            <Image source={require('../../assets/images/headLogo.png')} />
          </View>
        </LinearGradient>

        {crovneFishSpeedReactionUnlocked.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: fontR,
                color: '#777',
              }}
            >
              You don't have any wallpapers yet...
            </Text>
          </View>
        ) : (
          <FlatList
            data={crovneFishSpeedReactionUnlocked}
            keyExtractor={item => item}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: 40,
            }}
            renderItem={crovneFishSpeedReactionRenderItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </CrovneScrollWrap>
    </View>
  );
};

export default CollectionCrovneScreen;
