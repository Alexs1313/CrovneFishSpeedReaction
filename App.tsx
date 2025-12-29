import { NavigationContainer as CrovneFishNavigation } from '@react-navigation/native';
import {
  useEffect as useCrovneEffect,
  useState as useCrovneState,
} from 'react';
import { StoreProvider } from './CrovneFishSpeedReaction/CrovneFishSpeedReactionStore/context';
import StackNavigation from './CrovneFishSpeedReaction/CrovneFishSpeedReactionNv/StackNavigation';
import WelcomeLoader from './CrovneFishSpeedReaction/CrovneFishSpeedReactionCmpnts/WelcomeLoader';

const App = () => {
  const [isLoading, setIsLoading] = useCrovneState(true);

  useCrovneEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 6000);
  }, []);

  return (
    <CrovneFishNavigation>
      <StoreProvider>
        {isLoading ? <WelcomeLoader /> : <StackNavigation />}
      </StoreProvider>
    </CrovneFishNavigation>
  );
};

export default App;
