import {StyleSheet} from 'react-native';

import {View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {PlaylistList} from "../components/PlaylistList";

export default function PlaylistScreen({navigation}: RootTabScreenProps<'Playlists'>) {
  return (
      <View style={styles.container}>
        <PlaylistList playlists={[]}></PlaylistList>
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
