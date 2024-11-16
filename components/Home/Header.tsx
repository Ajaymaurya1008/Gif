import { View, Text, Switch, TouchableOpacity } from "react-native";
import React from "react";
import { useColorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";

export default function Header() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const router = useRouter();
  const isDarkMode = colorScheme === "dark";

  const handleThemeChange = async () => {
    AsyncStorage.setItem("theme", colorScheme === "dark" ? "light" : "dark");
    toggleColorScheme();
  };

  return (
    <View className="dark:bg-slate-800 bg-[#2D80F6] border-slate-300 dark:border-slate-800 border-b w-full px-8 pt-12 pb-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-white  text-3xl">GIPHY</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#84beff" }}
          thumbColor={isDarkMode ? "#fff" : "#fff"}
          value={colorScheme === "dark"}
          onValueChange={handleThemeChange}
        />
      </View>
      <TouchableOpacity
        onPress={() => router.push("/search")}
        className="mt-2 bg-white p-2 rounded-lg flex-row items-center gap-2"
      >
        <Feather name="search" size={24} color="#000" />
        <Text className="text-gray-600 text-lg">Search Giphy</Text>
      </TouchableOpacity>
    </View>
  );
}
