import api from "@/services/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { View, ActivityIndicator, Text, Pressable, Switch } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { GiphyGif, GiphyResponse } from "@/types/trendingDatatypes";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const router = useRouter();
  const { colorScheme, toggleColorScheme, setColorScheme } = useColorScheme();

  const getTrendingGifs = async ({ pageParam = 0 }) => {
    const response = await api.get("/gifs/trending", {
      params: {
        limit: 10,
        offset: pageParam,
        rating: "pg",
      },
    });
    return response.data as GiphyResponse;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["trendingGifs"],
      queryFn: getTrendingGifs,
      getNextPageParam: (lastPage, allPages) => {
        const nextOffset = allPages.length * 10;
        return nextOffset < lastPage.pagination.total_count
          ? nextOffset
          : undefined;
      },
      initialPageParam: 0,
      // staleTime: 1000 * 60 * 5,
    });

  const allGifs = data?.pages.flatMap((page) => page.data) ?? [];

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }

  const navigateGif = (gif: GiphyGif) => {
    router.push({
      pathname: `/gif/[id]`,
      params: {
        id: gif.id,
        data: JSON.stringify(gif),
      },
    });
  };

  const isDarkMode = colorScheme === "dark";

  const handleThemeChange = async () => {
    AsyncStorage.setItem("theme", colorScheme === "dark" ? "light" : "dark");
    toggleColorScheme();
  };

  return (
    <View className="bg-white dark:bg-gray-900 flex-1 items-center">
      <View className="dark:bg-slate-800 bg-gray-50 border-slate-300 dark:border-slate-800 border-b w-full px-8 pt-12 pb-4 flex-row justify-between">
        <Text className="dark:text-white text-3xl">GIPHY</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#84beff" }}
          thumbColor={isDarkMode ? "#fff" : "#fff"}
          value={colorScheme === "dark"}
          onValueChange={handleThemeChange}
        />
      </View>
      <View className="flex-1 w-full pt-6 px-6">
        <View className="h-full">
          <FlashList
            data={allGifs}
            numColumns={2}
            estimatedItemSize={150}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => navigateGif(item)}
                className="mb-4 rounded-xl overflow-hidden self-start"
              >
                <Image
                  style={{ width: 150, height: 150 }}
                  contentFit="cover"
                  source={{ uri: item.images.fixed_height.url }}
                  transition={500}
                />
              </Pressable>
            )}
            ListFooterComponent={() =>
              isFetchingNextPage ? (
                <View className="py-4">
                  <ActivityIndicator />
                </View>
              ) : null
            }
          />
        </View>
      </View>
    </View>
  );
}
