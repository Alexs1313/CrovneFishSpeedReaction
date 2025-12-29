import { createStackNavigator } from '@react-navigation/stack';

import HomeCrovneScreen from '../CrovneFishSpeedReactionScrns/HomeCrovneScreen';

import AboutCrovneScreen from '../CrovneFishSpeedReactionScrns/AboutCrovneScreen';
import GameCrovneScreen from '../CrovneFishSpeedReactionScrns/GameCrovneScreen';
import ModeCrovneScreen from '../CrovneFishSpeedReactionScrns/ModeCrovneScreen';
import PartyGameCrovneScreen from '../CrovneFishSpeedReactionScrns/PartyGameCrovneScreen';
import StatsCrovneScreen from '../CrovneFishSpeedReactionScrns/StatsCrovneScreen';
import DailyCrovneWallpaperScreen from '../CrovneFishSpeedReactionScrns/DailyCrovneWallpaperScreen';
import CollectionCrovneScreen from '../CrovneFishSpeedReactionScrns/CollectionCrovneScreen';
import OnboardCrovneScreen from '../CrovneFishSpeedReactionScrns/OnboardCrovneScreen';

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
