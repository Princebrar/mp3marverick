import { StyleSheet, Text, View,Button, Pressable,Image,ScrollView,FlatList } from 'react-native';
import React, { useState ,useEffect} from 'react';
import { BlurView } from 'expo-blur';
import Song from './Song';
export default function Home({handleArtistData,playSound,isFetching,tracks,artists,albums,player}) {
    
return (
    
    <View className=" bg-slate-500 h-full w-fit flex px-5">
      <BlurView blurRadius={4} overlayColor='rgba(0, 0, 255, 0)' blurType="dark" className=" fixed w-screen h-12 z-20">
      </BlurView>
      <View className={` w-fit flex px-5 ${player ? "mt-20" : "mt-4" }`}>
        <ScrollView contentContainerStyle={styles.contentContainer} className=" overflow-visible">
        <Text className=' text-3xl font-bold my-5 text-white'>Home</Text>
        <Text className=' text-xl font-bold text-white'>Top Songs for You</Text>
        <View className="mt-3 h-[30%] flex w-full flex-row overflow-visible">
        <ScrollView horizontal className="w-fit overflow-visible">
            {isFetching ?<Text className=" text-xl font-bold text-white">Loading...</Text> : tracks.map((track,index) => (
                <Song key={index} data={track} onSound={playSound}/>
            ))}
        </ScrollView>
        </View>
        <Text className=' text-xl font-bold text-white mt-6'>Top Artists for You</Text>
        <View className="mt-3 h-fit flex w-full flex-row overflow-visible">
        <ScrollView horizontal className="w-fit overflow-visible">
            {isFetching ?<Text className=" text-xl font-bold text-white">Loading...</Text> : artists.map((artist,index) => (
              <Pressable key={index} className={` h-40 w-40  mr-3 rounded-full`} onPress={()=>{handleArtistData(artist)}}>
                <Image source={{uri:`${artist.picture_xl}`}} className=" h-full w-full rounded-full object-cover aspect-square"/>
              </Pressable>
            ))}
        </ScrollView>
        </View>
        <Text className=' text-xl font-bold text-white mt-6'>Top Songs in Your Country</Text>
        <View className="mt-3 h-[30%] flex w-full flex-row overflow-visible">
        <ScrollView horizontal className="w-fit overflow-visible">
            {isFetching ?<Text className=" text-xl font-bold text-white">Loading...</Text> : tracks.map((track,index) => (
                <Song key={index} data={track} onSound={playSound}/>
            ))}
        </ScrollView>
        </View>
        </ScrollView>
        </View>
    </View>
);
}
const styles = StyleSheet.create({
    contentContainer: {
      paddingBottom: 250,
    }
  });