import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StoreProvider } from './CrovneFishSpeedReaction/CrovneFishSpeedReactionStore/context';
import StackNavigation from './CrovneFishSpeedReaction/CrovneFishSpeedReactionNv/StackNavigation';
import WelcomeLoader from './CrovneFishSpeedReaction/CrovneFishSpeedReactionCmpnts/WelcomeLoader';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

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
