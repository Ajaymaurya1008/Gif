import { useFonts } from "expo-font";
import { Stack, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import "@/styles/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useColorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Splash from "@/components/Atoms/Splash";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme as useColorSchemeRN } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

type theme = "light" | "dark";

export default function RootLayout() {
  const queryClient = new QueryClient();
  const { setColorScheme } = useColorScheme();
  const colorScheme = useColorSchemeRN();
  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = (await AsyncStorage.getItem("theme")) || "light";
      if (savedTheme) {
        setColorScheme(savedTheme as theme);
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 1500);
  });

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        {isShowSplashScreen ? (
          <Splash />
        ) : (
          <Stack>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="gif/[id]" />
            <Stack.Screen
              name="search/index"
              options={{ headerShown: false }}
            />
          </Stack>
        )}
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
