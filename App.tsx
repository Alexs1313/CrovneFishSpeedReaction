import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StoreProvider } from './[CrovneFishSpeedReaction]/[FishSpeedReactionStore]/context';
import StackNavigation from './[CrovneFishSpeedReaction]/[FishSpeedReactionRoutes]/StackNavigation';
import WelcomeLoader from './[CrovneFishSpeedReaction]/[CrovneFishComponents]/WelcomeLoader';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // effect loader
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 6000);
  }, []);

  return (
    <NavigationContainer>
      <StoreProvider>
        {isLoading ? <WelcomeLoader /> : <StackNavigation />}
      </StoreProvider>
    </NavigationContainer>
  );
};

export default App;
