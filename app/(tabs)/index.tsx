import api from "@/services/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { View, ActivityIndicator, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { GiphyResponse } from "@/types/trendingDatatypes";
import { Image } from "expo-image";

export default function HomeScreen() {
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

  return (
    <View className="bg-white flex-1 items-center">
      <View className="bg-slate-800 w-full px-8 pt-12 pb-4">
        <Text className="text-white text-3xl">GIPHY</Text>
      </View>
      <View className="flex-1 w-full pt-10 px-6">
        <View className="h-full">
          <FlashList
            data={allGifs}
            numColumns={2}
            estimatedItemSize={150}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => (
              <View className="mb-4 rounded-xl overflow-hidden self-start">
                <Image
                  style={{ width: 150, height: 150 }}
                  contentFit="cover"
                  source={{ uri: item.images.original.url }}
                  transition={1000}
                />
              </View>
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
