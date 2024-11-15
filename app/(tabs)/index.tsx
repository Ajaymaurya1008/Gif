import api from "@/services/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { View, Text, Image } from "react-native";

export default function HomeScreen() {
  const getTrendingGifs = async () => {
    const response = await api.get("/gifs/trending", {
      params: {
        limit: 10,
        rating: "pg",
      },
    });
    return response.data;
  };

  const { data: trendingData } = useQuery({
    queryKey: ["trendingGifs"],
    queryFn: getTrendingGifs,
    staleTime: 1000,
  });
  console.log(trendingData?.data);

  return (
    <View className="bg-white flex-1 items-center">
      <View className="bg-slate-800 w-full px-10 pt-12 pb-4">
        <Text className="text-white text-3xl">GIPHY</Text>
      </View>
      <View>
        <Image height={200} width={200} source={{ uri: trendingData?.data[2].images.original.url }} />
      </View>
    </View>
  );
}
