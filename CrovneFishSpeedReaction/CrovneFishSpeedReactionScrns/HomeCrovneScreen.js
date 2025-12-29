import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const MenuItem = ({ icon, title, subtitle, onPress }) => (
    <TouchableOpacity
      style={[
        {
          width: '50%',
          height: '50%',
          borderWidth: 1,
          borderColor: '#FFD34C',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16,
        },
        title === 'Game' && { borderTopWidth: 0 },
        title === 'Statistics' && { borderTopWidth: 0 },
        title === 'Daily Wallpaper' && { borderBottomWidth: 0 },
        title === 'Collection' && { borderBottomWidth: 0 },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={icon} style={{ marginBottom: 12 }} />

      <Text
        style={{
          fontSize: 20,
          fontFamily: 'Montserrat-SemiBold',
          color: '#fff',
          marginBottom: 6,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          fontSize: 10,
          fontFamily: 'Montserrat-Regular',
          color: '#9D8202',
          textAlign: 'center',
        }}
      >
        {subtitle}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'space-between',
      }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          <MenuItem
            icon={require('../../assets/icons/famicons_game-controller.png')}
            title="Game"
            subtitle="Click the fish instantly and show the best time."
            onPress={() => navigation.navigate('ModeCrovneScreen')}
          />

          <MenuItem
            icon={require('../../assets/icons/uil_statistics.png')}
            title="Statistics"
            subtitle="View best reaction time and leaderboard."
            onPress={() => navigation.navigate('StatsCrovneScreen')}
          />

          <MenuItem
            icon={require('../../assets/icons/tabler_gift-filled.png')}
            title="Daily Wallpaper"
            subtitle="Try once a day and win a collectible card."
            onPress={() => navigation.navigate('DailyCrovneWallpaperScreen')}
          />

          <MenuItem
            icon={require('../../assets/icons/bxs_collection.png')}
            title="Collection"
            subtitle="Browse and download your wallpapers."
            onPress={() => navigation.navigate('CollectionCrovneScreen')}
          />
        </View>

        <View
          style={{
            position: 'absolute',
            alignSelf: 'center',
            top: '42%',
          }}
        >
          <Image
            source={require('../../assets/images/homeBgGradient.png')}
            style={{ top: -50 }}
          />

          <Image
            source={require('../../assets/images/homeLogo.png')}
            style={{
              position: 'absolute',
              alignSelf: 'center',
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: 16,
            borderWidth: 1,
            borderColor: '#FFD34C',
            position: 'absolute',
            bottom: 20,
            width: 200,
            borderRadius: 21,
            alignSelf: 'center',
            backgroundColor: '#000',
          }}
        >
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://apps.apple.com/us/app/crovne-fish-speed-reaction/id6757163465',
              )
            }
          >
            <Image
              source={require('../../assets/icons/material-symbols_star-rounded.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('AboutCrovneScreen')}
          >
            <Image source={require('../../assets/icons/mdi_about.png')} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://apps.apple.com/us/app/crovne-fish-speed-reaction/id6757163465',
              )
            }
          >
            <Image
              source={require('../../assets/icons/material-symbols_share.png')}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
