import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import usePlayer from "./hooks/usePlayer";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const isPlayerSetUp = usePlayer()

  if (!isLoadingComplete || !isPlayerSetUp) {
    return null;
  } else {
    return (
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme}/>
          <StatusBar/>
        </SafeAreaProvider>
    );
  }
}
