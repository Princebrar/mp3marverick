import { View, Pressable, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text } from 'react-native';
import { BlurView } from 'expo-blur';

export default function Navigation({onclick}) {
    const [activeView, setActiveView] = useState("Home");
    const [distance] = useState(new Animated.Value(0));

    const handleIconPress = (view, distanceValue) => {
        onclick(view);
        setActiveView(view);
        Animated.spring(distance, {
            toValue: distanceValue,
            useNativeDriver: false
        }).start();
    };

    const renderIcon = (iconName, view, distanceValue) => {
        const isActive = activeView === view;
        return (
            <Pressable key={view} onPress={() => handleIconPress(view, distanceValue)} style={{ flex: 1, alignItems: 'center', padding: 5 }}>
                <FontAwesome name={iconName} size={32} color={isActive ? "white" : "black"} />
                <Text style={{ color: isActive ? "white" : "black", fontSize: 10, marginTop: 2 }} className={`${isActive ? "visible":"hidden"}`}>{view}</Text>
            </Pressable>
        );
    };

    return (
        <View style={{ width: '100%', alignItems: 'center' }}>
            <View style={{ width: '90%', borderRadius: 100, overflow: 'hidden' }}>
                <BlurView intensity={90} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 }}>
                    <Animated.View style={{ position: 'absolute', backgroundColor: '#d84242', height: 56, width: 56, left: 50, borderRadius: 100, transform: [{ translateX: distance }] }} />
                    {renderIcon("home", "Home", 0)}
                    {renderIcon("search", "Search", 115)}
                    {renderIcon("user", "User", 230)}
                </BlurView>
            </View>
        </View>
    );
}
