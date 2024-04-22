import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Components/Home';
import Search from './Components/Search';
import Bookmark from './Components/Bookmark';
import { Audio } from 'expo-av';
import User from './Components/User';
import Navigation from './Components/Navigationbar';
import { AntDesign } from '@expo/vector-icons';
import React, { useState,useEffect } from 'react';
import { BlurView } from 'expo-blur';
import Artist from './Components/artist';
export default function App() {
  const [activeView, setActiveView] = useState("Home");
  const [player, setPlayer] = useState(false);
  const [artistData, setArtistData] = useState([]);
  const handleArtistData = (data) => {
    setArtistData(data);
    setActiveView("Artist");
  }
  const handleIconPress = (view) => {
    setActiveView(view);
  }
  const [song_playing_data, setSongPlayingData] = useState([{}]);
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [isFetching, setIsFetching] = useState(true); 
useEffect(() => {
  async function fetchDeezerChart() {
      setIsFetching(true);
      const url1 = 'https://corsproxy.io/?https://api.deezer.com/chart';
      const options1 = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'd88938f18fmsh177b7838d002649p15e49ajsn552e240efc5d',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
      };
      
      try {
        const response = await fetch(url1, options1);
        const result = await response.json();
        setTracks(result.tracks.data);
        setAlbums(result.albums.data);
        setArtists(result.artists.data);
        console.log("Api is Called");
        setIsFetching(false);
      } catch (error) {
        setIsFetching(false);
        console.error(error);
      }

  }

  fetchDeezerChart();
}, [activeView]);
  //my code
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  async function playSound(data) {
    setPlayer(true);
    console.log('Play Sound is run');
      if (song_playing_data.id == data.id && isPlaying) {
      console.log('Pause Sound');
      await sound.pauseAsync();
      setIsPlaying(false);
    }
    else{
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync({uri: `${data.preview}`},);
      setSound(sound);
      console.log('Playing Sound');
      await sound.playAsync();
      setIsPlaying(true);
    }
    setSongPlayingData(data);
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  return (
    <>
      {player &&
      <View className="absolute flex flex-row justify-center items-center top-14 z-10 w-full h-20">
        <View className=" flex flex-row items-center bg-slate-700 w-11/12 h-full rounded-3xl p-5">
          <Text className="text-slate-300 text-xl font-semibold w-1/2">{song_playing_data.title}</Text>
          <View className="flex flex-row justify-end w-6/12  right-1">
          <AntDesign name={isPlaying ? "pausecircle" : "play"} size={38} color="white" onPress={() => playSound(song_playing_data)} />
          </View>
        </View>
      </View>
      }
    <View className={`flex-1 justify-center items-center align-middle w-screen h-screen`}>
      {activeView === "Home" && <Home handleArtistData={handleArtistData} playSound={playSound} isFetching={isFetching} artists={artists} tracks={tracks} player={player}/>}
      {activeView === "Search" && <Search playSound={playSound} player={player} />}
      {activeView === "User" && <User player={player} />}
      {activeView === "Artist" && <Artist data={artistData} player={player} setActiveView={setActiveView} onSound={playSound}/>}
      <View className="absolute bottom-9 w-screen flex-1 items-center">
        {activeView !== "Artist" && <Navigation onclick={handleIconPress} />}
       </View>
      <StatusBar style="auto" />
    </View>
    </>
  );
}
