import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { colors, device, formatTime, gStyle, spotifyApi } from './commonUtils';
import TouchIcon from './components/TouchIcon';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { setPlaylistSong } from '../Components/redux/musicSlice';
import { usePlaySong } from '../customHooks';

const MusicPlayer = ({ route }) => {
  const navigation = useNavigation();
  const songData = useSelector((state) => state.music.currentPlayingSong) || {};
  const dispatch = useDispatch()
  const playSong = usePlaySong()

  const currentSongData = {
    length: 30,
    title: songData.songName,
    image: songData.image || songData.img,
    artist: songData.singerName,
    songUri: songData.songUri,
  }
  const [favorited, setFavorited] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(false);
  const [artistIconColor, setArtistIconColor] = React.useState(colors.white);
  const [paused, setPaused] = React.useState(false);
  const currentSoundObj = useSelector((state) => state.music.currentSoundObj);
  const allSongs = useSelector((state) => state.music.songDetails);

  const { positionMillis, durationMillis } = useSelector((state) => state.music.timings);

  const favoriteColor = favorited ? colors.brandPrimary : colors.white;
  const [isRepeat, setRepeat] = React.useState(false);
  const [checkRepeat, setCheckRepeat] = React.useState(0);
  const favoriteIcon = favorited ? 'heart' : 'heart-o';
  const isSongOver = (positionMillis + 100) > durationMillis;
  
  const iconPlay = (paused ? 'play-circle' : 'pause-circle');

  useEffect(() => {
    currentSoundObj && setPaused(false)
  }, [currentSoundObj])



  const addArtistToFavorites = () => {
    spotifyApi.followArtists([songData.artistId]).then(() => {
      setArtistIconColor(colors.brandPrimary)
      alert("Artist Followed")
    }).catch((e) => {
      console.error(e)
    })
  }

  const playPreviousSong = () => {
    const currentSongIndex = allSongs.findIndex(song => song.songUri === songData.songUri);
    let nextSongIndex;
    if (currentSongIndex === -1 || currentSongIndex === 0) {
      nextSongIndex = allSongs.length - 1
    } else {
      nextSongIndex = currentSongIndex - 1
    }
    const nextSong = allSongs[nextSongIndex];
    playSong(nextSong)
  }

  const playNextSong = () => {
    const currentSongIndex = allSongs.findIndex(song => song.songUri === songData.songUri);
    let nextSongIndex;
    if ((currentSongIndex === -1) || (currentSongIndex === allSongs.length - 1)) {
      nextSongIndex = 0
    } else {
      nextSongIndex = currentSongIndex + 1
    }
    const nextSong = allSongs[nextSongIndex]
    playSong(nextSong)
  }

  useEffect(()=>{
    isSongOver && playNextSong()
  })

  const handlePlay = () => {
    if (currentSoundObj) {
      if (isSongOver) {
        return currentSoundObj.replayAsync()
      }
      if (paused) {
        currentSoundObj.playAsync()
      } else {
        currentSoundObj.pauseAsync()
      }
      setPaused((paused) => !paused)
    }
  }

  return (
    <View style={gStyle.container}>
      <Image source={{ uri: currentSongData.image }} style={styles.image} />
      <View style={gStyle.p3}>
        <View style={[gStyle.flexRowSpace, styles.containerDetails]}>
          <View style={styles.containerSong}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.song}>
              {currentSongData.title}
            </Text>
            <Text style={styles.artist}>{currentSongData.artist}</Text>
            {/* <TouchIcon
              icon={<FontAwesome color={artistIconColor} name="user-plus" />}
              iconSize={30}
              style={{ marginLeft: -270 }}
              onPress={addArtistToFavorites}
            /> */}
          </View>
        </View>
        <View style={styles.containerVolume}>
          <Slider
            disabled={true}
            value={positionMillis}
            minimumValue={0}
            maximumValue={durationMillis}
            minimumTrackTintColor={colors.white}
            maximumTrackTintColor={colors.grey3}
          />
        </View>
        <View style={styles.containerControls}>
          <TouchIcon
            icon={<Feather color={colors.greyLight} name="list" />}
            onPress={() => {
              dispatch(setPlaylistSong({ songId: songData.songUri }))
              navigation.navigate('Library', { screen: 'Playlist', params: { songUri: currentSongData.songUri } })
            }}
          />
          <View style={gStyle.flexRowCenterAlign}>
            <TouchIcon
              icon={<FontAwesome color={colors.white} name="step-backward" />}
              iconSize={32}
              onPress={playPreviousSong}
            />
            <View style={gStyle.pH3}>
              <TouchIcon
                icon={<FontAwesome color={colors.white} name={iconPlay} />}
                iconSize={isSongOver ? 40 : 64}
                onPress={handlePlay}
              />
            </View>
            <TouchIcon
              icon={<FontAwesome color={colors.white} name="step-forward" />}
              iconSize={32}
              onPress={playNextSong}
            />
          </View>
          <TouchIcon
            icon={<FontAwesome color={isRepeat ? colors.red : colors.greyLight} name="refresh" />}
            onPress={() => currentSoundObj && currentSoundObj.replayAsync()}
          />
        </View>

        {/* <View style={styles.containerBottom}>
          <TouchIcon
            icon={<Feather color={colors.greyLight} name="speaker" />}
            onPress={() => null}
          />
          <TouchIcon
            icon={
              <MaterialIcons color={colors.greyLight} name="playlist-play" />
            }
            onPress={() => null}
          />
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: device.width - 48,
    marginVertical: device.iPhoneNotch ? 60 : 8,
    marginLeft: 23,
    width: device.width - 48
  },
  containerDetails: {
    marginBottom: 16
  },
  containerSong: {
    flex: 6,
  },
  song: {
    fontSize: 22,
    color: colors.white
  },
  artist: {
    color: colors.greyInactive
  },
  containerFavorite: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center'
  },
  containerTime: {
    ...gStyle.flexRowSpace
  },
  time: {
    ...gStyle.textSpotify10,
    color: colors.greyInactive
  },
  containerControls: {
    ...gStyle.flexRowSpace,
    marginTop: device.iPhoneNotch ? 24 : 8
  },
  containerBottom: {
    ...gStyle.flexRowSpace,
    marginTop: device.iPhoneNotch ? 32 : 8
  }
});

export default MusicPlayer;
