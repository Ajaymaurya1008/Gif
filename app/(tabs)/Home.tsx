import { View } from "react-native";
import Header from "@/components/Home/Header";
import FlashListContent from "@/components/Home/FlashListContent";
import api from "@/services/axios";
import { GiphyResponse } from "@/types/trendingDatatypes";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function Home() {
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

  return (
    <View className="bg-white dark:bg-gray-900 flex-1 items-center">
      <Header />
      <FlashListContent
        data={data}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
      />
    </View>
  );
}
