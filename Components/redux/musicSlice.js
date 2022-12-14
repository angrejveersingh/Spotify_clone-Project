import { createSlice } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const customizedMiddleware = getDefaultMiddleware({
  SerializableStateInvariantMiddleware: false
});


const initialState = {
  value : 0,
  accessToken: null,
  currentSoundObj: null,
  overBudget:0,
  tempDetail:"",
  tempAmount:0,
  language: "",
  urlDetails : [],
  playlistTracks:[],
  songDetails : [],
  searchDetails:[],
  categories:[],
  albums:[],
  token:"",
  searchedText : "",
  albumTracks:[],
  timings: {
    positionMillis: 0,
    durationMillis: 3000,
  },
  themeColor:['#7F8C8D', '#000000'],
  playlists:[],
  followedArtists:[],
}



export const musicSlice = createSlice({
  
  name: 'music',
  initialState,
  reducers: {
    changeSoundObject: (state, action) => {
      state.currentSoundObj = action.payload;
    },
    changeTimings: (state, action) => {
      state.timings = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload.access_token;
    },
    
    setLanguage: (state, action) => {
      state.language = action.payload.language;
    },

    setPlaylistSong: (state, action) =>{
      state.songToBeAdded = action.payload.songId
    },

    setCurrentPlayingSong: (state, action) =>{
      state.currentPlayingSong = action.payload
    },
    setCategoryPlaylist:(state, action) =>{
      for (let index = 0; index < 10; index++) {
        state.playlistTracks.push({
          singerName: action.payload[index].artistName,
          image: action.payload[index].songImage,
          url: action.payload[index].urlSong,
          songName:action.payload[index].songName,
          artistId:action.payload[index].id,
          songUri:action.payload[index].songUri,
        });
        
      }
    },

    addTransDetails: (state, action) =>{
      
      for (let index = 0; index < 6; index++) {
        state.songDetails.push({
          singerName: action.payload[index].artistName,
          image: action.payload[index].songImage,
          url: action.payload[index].urlSong,
          songName:action.payload[index].songName,
          artistId:action.payload[index].artistId,
          songUri:action.payload[index].songUri,
        });
        
      }
      
      
    },

    addSearchDetails: (state, action) =>{
      
      for (let index = 0; index < 6; index++) {
        state.searchDetails.push({
          singerName: action.payload[index].artistName,
          image: action.payload[index].songImage,
          url: action.payload[index].urlSong,
          songName:action.payload[index].songName,
          artistId:action.payload[index].artistId,
          songUri:action.payload[index].songUri,
        });
        
      }
      
      
    },

    addCategories: (state, action) =>{
      for (let index = 0; index < 4; index++) {
        state.categories.push({
          name: action.payload[index].categoryName,
          image: action.payload[index].image,
          id: action.payload[index].id
        });
        
      }
    },

    setPlaylists: (state, action) =>{
      state.playlists = action.payload
    },

    changeSearchText:(state,action)=>{
      console.log("Redux search",action.payload);
      state.searchedText = action.payload;
    },

    addTrackToPlaylist: (state, action) =>{
      const requiredPlaylist = state.playlists.find(playlist => playlist.id === action.payload.id);
      requiredPlaylist.push(action.payload)
    },

    setFollowedArtists: (state, action) =>{
      state.followedArtists = action.payload
    },

    addAlbums: (state, action) =>{
      for (let index = 0; index < 4; index++) {
        state.albums.push({
          name: action.payload[index].artistName,
          image: action.payload[index].albumImage,
          albumName:action.payload[index].albumName,
          id:action.payload[index].albumId
        });
        
      }
      
      
    },

    addAlbumTracks: (state, action) =>{
      for (let index = 0; index < action.payload.length; index++) {
        state.albumTracks.push({
          artistName: action.payload[index].trackArtistName,
          image: action.payload[index].albumTrackImage,
          albumTrackName:action.payload[index].albumTrackName,
          url: action.payload[index].albumTrackUrl
        });
       
      }
    },
    changeToken: (state, action) => {
      state.token = action.payload;
    },

    setTheme: (state, action) =>{
        state.themeColor = action.payload;
      },
  },
})

 export const { changeToken, addTransDetails, addSearchDetails, setCategoryPlaylist, changeSoundObject, changeTimings, addCategories, changeSearchText, addAlbums, addAlbumTracks, setAccessToken, setLanguage, setPlaylists, setFollowedArtists, setPlaylistSong, setTheme, setCurrentPlayingSong} = musicSlice.actions

export default musicSlice.reducer