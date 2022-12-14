import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Audio } from "expo-av";
import { changeSoundObject, changeTimings, setCurrentPlayingSong } from './Components/redux/musicSlice';

function usePlaySong() {
    const dispatch = useDispatch();
    const currentSoundObj = useSelector((state) => state.music.currentSoundObj);

    return async function playSound(s) {
        if (currentSoundObj) {
          try {
            currentSoundObj.unloadAsync()
          } catch (e) {
            console.error('e: ', e);
          }
        }
        dispatch(setCurrentPlayingSong(s))
        var { sound } = await Audio.Sound.createAsync(
          { uri: s.url },
          { shouldPlay: true },
          (status) => {
            console.log('status: ', status);
            dispatch(changeTimings({ durationMillis: status.durationMillis, positionMillis: status.positionMillis}))
          });
        sound.setProgressUpdateIntervalAsync(100)
        dispatch(changeSoundObject(sound));
        sound.playAsync()
          .then((res) => {
          })
          .catch((error) => {
            console.error("Playing error", error)
          })
      }
}

export {usePlaySong}
