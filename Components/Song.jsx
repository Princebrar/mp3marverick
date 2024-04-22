import { StyleSheet, Text, View,Animated } from 'react-native';
import React, { useState } from 'react';
import { Image, Pressable } from 'react-native';
export default function Song({ data, onSound }) {
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
    <Animated.View style={[styles.container, animatedStyle]}>
    <Pressable onPress={()=>{handleSongPress()}} className="flex flex-col bg-white/80  rounded-lg h-full overflow-hidden p-2">
    <View className=" h-[75%] w-full rounded-lg overflow-hidden">
    <Image source={{uri:`${data.album.cover_xl}`}} className=" h-full w-full object-cover aspect-square"/>
    </View>
        <View className="w-fit mt-1">
            <Text className=' text-lg font-bold'>{data.title_short}</Text>
            <Text className='text-sm'>{data.artist.name}</Text>
        </View>
    </Pressable>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            borderRadius: 8,
            marginRight: 11,
            overflow: 'hidden',
            padding: 2,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 1,
            shadowRadius: 8,
        },
});
