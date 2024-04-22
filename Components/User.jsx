import { Pressable, StyleSheet, Text, View,TextInput } from 'react-native';
import React, { useState } from 'react';
import { BlurView } from 'expo-blur';
import { FontAwesome } from '@expo/vector-icons';
export default function User({player}) {
  const [Name, setName] = useState('User Name');
  const [isEditing, setIsEditing] = useState(false);
  const [PhoneNumber, setPhoneNumber] = useState('+XX XXXXX XXXXX')
  const [About, setAbout] = useState('This is Something About You.');
  const handleButtonPress = () => {
    setIsEditing(!isEditing);
  }
  return (
    <View className=" bg-slate-600 h-full w-full">
      <BlurView blurRadius={4} overlayColor='rgba(0, 0, 255, 0)' blurType="dark" className=" fixed w-screen h-12 z-20 top-0">
      </BlurView>
      <View className={` flex flex-col mt-28 items-center justify-center w-full ${player && "mt-48"} h-64`}>
        <View className=" flex flex-col p-5 w-11/12 h-46 bg-slate-800 rounded-3xl">
      <View className=" flex flex-row  w-full h-20 ">
        <View className="flex flex-col justify-center mr-5 items-center w-20 h-20 rounded-full border-2 border-solid border-white">
      <FontAwesome name="user" size={64} color="white" />
        </View>
        <View className="flex flex-col justify-center h-20">
      <Text className=" text-slate-400 text-xl">Enter your name</Text>
          </View>
      </View>
      <View>
        <TextInput className={` text-white text-2xl mt-5 ${!isEditing && "hidden"} font-semibold`} onChangeText={setName} value={Name}></TextInput>
        <Text className={` text-white text-2xl mt-5 ${isEditing && "hidden"} font-semibold`}>{Name}</Text>
      </View>
        </View>
        <View className=" flex flex-col justify-center bg-slate-800 mt-2 h-24 p-4 w-11/12 rounded-3xl">
          <Text className=" text-slate-400 text-xl font-bold translate-y-4">Phone Number</Text>
          <TextInput className={` text-white text-2xl mt-5 ${!isEditing && "hidden"} font-semibold`} onChangeText={setPhoneNumber} value={PhoneNumber}></TextInput>
        <Text className={` text-white text-2xl mt-5 ${isEditing && "hidden"} font-semibold`}>{PhoneNumber}</Text>
        </View>
        <View className=" flex flex-col justify-center bg-slate-800 mt-2 h-24 p-4 w-11/12 rounded-3xl">
          <Text className=" text-slate-400 text-xl font-bold translate-y-4">About</Text>
          <TextInput className={` text-white text-2xl mt-5 ${!isEditing && "hidden"} font-semibold`} onChangeText={setAbout} value={About}></TextInput>
        <Text className={` text-white text-2xl mt-5 ${isEditing && "hidden"} font-semibold`}>{About}</Text>
        </View>
        <Pressable className=" bg-slate-900 mt-5 w-6/12 h-12 rounded-xl flex justify-center items-center active:bg-slate-800" onPress={handleButtonPress}>
          <Text className=" text-white text-xl font-semibold">{!isEditing && <>Edit Profile</>} {isEditing && <>Done</>}</Text>
        </Pressable>
      </View>

    </View>
  );
}
