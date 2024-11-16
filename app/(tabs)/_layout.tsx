// import { Tabs } from 'expo-router';
// import React from 'react';
// import { Platform } from 'react-native';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//         tabBarStyle: Platform.select({
//           ios: {
//             // Use a transparent background on iOS to show the blur effect
//             position: 'absolute',
//           },
//           default: {},
//         }),
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: 'Explore',
//         }}
//       />
//     </Tabs>
//   );
// }

import { Tabs } from "expo-router";
import { View, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function tabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 50,
          left: "27%",
          right: "28%",
          width: "45%",
          alignSelf: "center",
          backgroundColor: "#fff",
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
        },
        tabBarActiveTintColor: "#000",
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Feather size={24} name="home" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Collection"
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Feather name="bookmark" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Feather name="user" size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
