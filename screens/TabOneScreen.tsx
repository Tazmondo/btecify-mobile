import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {PlaylistCard} from "../components/PlaylistCard";

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Playlists</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/*<EditScreenInfo path="/screens/TabOneScreen.tsx" />*/}
      
      <PlaylistCard title={"test2"} thumbnail={"http://raspberrypi.local:8000/song/10/thumb"} songCount={10} selected={false}/>
      <PlaylistCard title={"test3"} thumbnail={"http://raspberrypi.local:8000/song/10/thumb"} songCount={10} selected={false}/>
      <PlaylistCard title={"test4"} thumbnail={"http://raspberrypi.local:8000/song/10/thumb"} songCount={10} selected={false}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
