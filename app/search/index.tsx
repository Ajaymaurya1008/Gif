import { View, TextInput, Keyboard } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import api from "@/services/axios";
import { GiphyResponse } from "@/types/trendingDatatypes";
import { useInfiniteQuery } from "@tanstack/react-query";
import FlashListContent from "@/components/Home/FlashListContent";
import { debounce } from "@/utils/debounce";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const getSearchResults = async ({ pageParam = 0 }) => {
    console.log(searchText);
    const response = await api.get("/gifs/search", {
      params: {
        q: searchText,
        limit: 10,
        offset: pageParam,
      },
    });
    return response.data as GiphyResponse;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["searchGifs"],
    queryFn: getSearchResults,
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * 10;
      return nextOffset < lastPage.pagination.total_count
        ? nextOffset
        : undefined;
    },
    initialPageParam: 0,
    // staleTime: 1000 * 60 * 5,
  });

  const debouncedSearch = useCallback(
    debounce(() => {
      if (searchText) {
        refetch();
      }
    }, 800),
    [searchText]
  );

  const handleOnChangeText = (text: string) => {
    setSearchText(text);
    debouncedSearch();
  };

  return (
    <View className="bg-white dark:bg-gray-900 flex-1 items-center pt-12">
      <View className="px-6">
        <View className="w-full flex-row bg-gray-100 dark:bg-white mt-4 p-2 rounded-lg gap-2">
          <Feather name="search" size={24} color="#000" />
          <TextInput
            ref={inputRef}
            className="flex-1 h-full text-lg"
            value={searchText}
            onChangeText={(text) => handleOnChangeText(text)}
            placeholder="Search gifs"
          />
        </View>
      </View>
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
