import { StyleSheet, Text, View, Image, Pressable ,ScrollView} from 'react-native';
import { BlurView } from 'expo-blur';
import React, { useState,useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import Songartist from './Songartist';

export default function Artist({ data, setActiveView, onSound,player }) {
    [tracks, setTracks] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    useEffect(() => {
        async function fetchDeezerChart() {
            setIsFetching(true);
            const url1 = `https://corsproxy.io/?${data.tracklist}`;
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
              console.log("Artist Api is Run");
              setTracks(result.data);
              setIsFetching(false);
            } catch (error) {
              setIsFetching(false);
              console.error(error);
            }
    
        }
    
        fetchDeezerChart();
      }, []);
    return (
        <View className="bg-slate-600 h-screen w-full">
            <BlurView blurRadius={1} className="fixed w-screen h-12 z-20"></BlurView>
            <Image
                source={{ uri: `${data.picture_xl}` }}
                className="absolute h-[500px] w-full top-1 object-cover aspect-square"
                blurRadius={10}
            />
            <Pressable
                className={`bg-black/30 fixed top-5 left-5 w-[40px] h-[40px] p-[3px] ${player ? "mt-32 absolute" : ""} rounded-full`}
                onPress={() => {
                    setActiveView('Home');
                }}
            >
                <AntDesign name={'back'} size={32} color={'white'} />
            </Pressable>
            <View className="bg-slate-400 h-full mt-[300px] rounded-t-[70px] pt-10 px-4">
                <View className="flex flex-col items-center justify-center w-full -translate-y-40 absolute translate-x-4" style={{
                            shadowColor: 'black',
                            shadowOffset: { width: 0, height: -5 },
                            shadowOpacity: 1,
                            shadowRadius: 10,
                        }}>
                    <Image
                        source={{ uri: `${data.picture_xl}` }}
                        className="h-[200px] w-[200px] rounded-full top-1 object-cover aspect-square"
                    />
                </View>
                <View className={`flex flex-row items-center justify-center pt-3`}>
                    <Text className="text-2xl font-extrabold text-white text-center">{data.name.toUpperCase()}</Text>
                </View>
                <ScrollView contentContainerStyle={styles.contentContainer} alwaysBounceVertical className="flex flex-col gap-1 mt-2 overflow-hidden">
                    {isFetching ==true ? <View className="bg-slate-700 w-11/12 h-[80px] rounded-3xl flex flex-row items-center justify-center">
                            <Text className=" text-white text-2xl font-semibold">Loading...</Text>
                        </View> : 
                        <>
                        {tracks.map((track,index) => (
                            <Songartist key={index} data={track} onSound={onSound} singer={data.name}/>

                                
     ) ) } 
     </>}

                        

                </ScrollView>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    contentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 400,
    },
    container:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width:'100%',

    }
  });