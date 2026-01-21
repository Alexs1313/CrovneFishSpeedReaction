import { createStackNavigator } from '@react-navigation/stack';

// stack routes
import HomeCrovneScreen from '../[SpeedReactionScreens]/HomeCrovneScreen';
import AboutCrovneScreen from '../[SpeedReactionScreens]/AboutCrovneScreen';
import GameCrovneScreen from '../[SpeedReactionScreens]/GameCrovneScreen';
import ModeCrovneScreen from '../[SpeedReactionScreens]/ModeCrovneScreen';
import PartyGameCrovneScreen from '../[SpeedReactionScreens]/PartyGameCrovneScreen';
import StatsCrovneScreen from '../[SpeedReactionScreens]/StatsCrovneScreen';
import DailyCrovneWallpaperScreen from '../[SpeedReactionScreens]/DailyCrovneWallpaperScreen';
import CollectionCrovneScreen from '../[SpeedReactionScreens]/CollectionCrovneScreen';
import OnboardCrovneScreen from '../[SpeedReactionScreens]/OnboardCrovneScreen';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="OnboardCrovneScreen"
        component={OnboardCrovneScreen}
      />
      <Stack.Screen name="HomeCrovneScreen" component={HomeCrovneScreen} />
      <Stack.Screen name="AboutCrovneScreen" component={AboutCrovneScreen} />
      <Stack.Screen name="GameCrovneScreen" component={GameCrovneScreen} />
      <Stack.Screen name="ModeCrovneScreen" component={ModeCrovneScreen} />
      <Stack.Screen
        name="PartyGameCrovneScreen"
        component={PartyGameCrovneScreen}
      />
      <Stack.Screen name="StatsCrovneScreen" component={StatsCrovneScreen} />
      <Stack.Screen
        name="DailyCrovneWallpaperScreen"
        component={DailyCrovneWallpaperScreen}
      />
      <Stack.Screen
        name="CollectionCrovneScreen"
        component={CollectionCrovneScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
