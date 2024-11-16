import { View, ActivityIndicator, Pressable } from "react-native";
import api from "@/services/axios";
import { Image } from "expo-image";
import { GiphyResponse, GiphyGif } from "@/types/trendingDatatypes";
import { FlashList } from "@shopify/flash-list";
import { InfiniteData } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { isLoading } from "expo-font";

interface FlashListContentProps {
  data: InfiniteData<GiphyResponse, unknown> | undefined;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  fetchNextPage: () => void;
}

export default function FlashListContent(props: FlashListContentProps) {
  const { data, hasNextPage, isFetchingNextPage, isLoading, fetchNextPage } = props
    const router = useRouter();

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
  return (
    <View className="flex-1 w-full pt-6 px-6 pl-8">
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
  );
}
