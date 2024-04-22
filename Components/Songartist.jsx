import { StyleSheet, Text, View,Animated } from 'react-native';
import React, { useState } from 'react';
import { Image, Pressable } from 'react-native';
export default function Songartist({ data, onSound ,singer}) {
  const [animation] = useState(new Animated.Value(1));
  const handleSongPress = () => {
    console.log('Song Pressed');
    onSound(data);

    // Triggering the animation
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };
  const animatedStyle = {
    transform: [{ scale: animation }],
  };
  return (
    <Animated.View style={[styles.container, animatedStyle]} className=" mt-1 z-10">
    <Pressable onPress={handleSongPress}  className="bg-slate-700 w-11/12 h-fit rounded-3xl flex flex-row items-center">
    <View className="flex items-start justify-start m-3">
    <Image source={{ uri: `${data.album.cover_xl}` }} className="h-[60px] w-[60px] rounded-xl object-cover aspect-square" />
    </View>
    <View className="flex flex-col w-2/3">
    <Text className=" text-white text-xl font-semibold">{data.title.toUpperCase()}</Text>
    <Text className=" text-white text-sm font-normal">By: {data.artist.name}</Text>
    {data.artist.name != singer && <Text className=" text-white text-sm font-normal">Contribution: {singer}</Text>}
    </View>
</Pressable>
</Animated.View>
  );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width:'100%',

    }
});
