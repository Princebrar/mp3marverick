import { StyleSheet, Text, View ,TextInput, ScrollView,FlatList} from 'react-native';
import { BlurView } from 'expo-blur';
import React, { useState,useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Song from './Song';
export default function Search({playSound,player}) {
  const [searchby, setSearchBy] = useState('track');
  const [tracks, setTracks] = useState([]);
  const [text, onChangeText] = useState('');
  const [isFetching, setIsFetching] = useState(true);
    const renderSong = ({ item }) => (
    <View style={styles.gridItem} className="flex flex-wrap w-48 h-60 m-2">
      <Song data={item} onSound={playSound} />
    </View>
  );
  useEffect(() => {
    async function fetchDeezerChart() {
        setIsFetching(true);
        const url1 = `https://corsproxy.io/?https://api.deezer.com/search?q=${searchby}:"${text}"`;
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
          setTracks(result.data);
          console.log("Search Api is Called");
          setIsFetching(false);
        } catch (error) {
          setIsFetching(false);
          console.error(error);
        }
  
    }
  
    fetchDeezerChart();
  }, [text]);
  return (
    <View className=" bg-slate-600 h-full w-full">
      <BlurView blurRadius={1} className="fixed w-screen h-12 z-20"></BlurView>
        <Text className={` text-3xl font-bold text-white mx-5 ${player ? "mt-24" : "mt-4" } mb-4`}>Search</Text>
        <View className="flex flex-col justify-center items-center w-full">
      <View className="flex flex-row w-11/12 bg-white justify-center h-10 items-center rounded-xl px-2">
        <View className="flex flex-col justify-center items-center h-full w-fit px-1">
      <FontAwesome name="search" size={30} color="black" className=" h-full w-full"/>
        </View>
      <TextInput value={text} onChangeText={onChangeText} placeholder='Search for Songs...' className="w-11/12 h-full rounded-md p-2"
      />
      </View>
      <Text className=" text-white text-lg font-light w-full px-5 py-3">Your Search Results are:</Text>
        </View>
        <View className="flex flex-col gap-5 items-center justify-center  overflow-hidden">
          {isFetching ?          <View className="bg-slate-700 w-11/12 h-[80px] rounded-3xl flex flex-row items-center justify-center">
                            <Text className=" text-white text-2xl font-semibold">Loading...</Text>
                        </View>:
                              <FlatList
                              data={tracks}
                              renderItem={renderSong}
                              keyExtractor={(item, index) => index.toString()}
                              numColumns={2} // Set the number of columns here
                              contentContainerStyle={styles.contentContainer}
                            />}

          </View>
    </View>
  );
}
const styles = StyleSheet.create({

  contentContainer: {
    paddingBottom: 340,
  },
});