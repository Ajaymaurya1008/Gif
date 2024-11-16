import { Tabs } from "expo-router";
import { View, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useColorScheme } from "nativewind";

export default function tabLayout() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";
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
          backgroundColor: isDarkMode ? "#000" : "#fff",
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
        },
        tabBarActiveTintColor: isDarkMode ? "#fff" : "#000",
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
