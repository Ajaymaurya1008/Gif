import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Image } from "expo-image";
import { GiphyGif } from "@/types/trendingDatatypes";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { Feather } from "@expo/vector-icons";


export default function Gif() {
  const [isShareLoading, setIsShareLoading] = useState(false);
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const gif: GiphyGif = JSON.parse(params.data as string);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Gif Details",
    });
  }, [navigation]);

  const downloadGif = async () => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        const result = await FileSystem.downloadAsync(
          gif.images.original.url,
          FileSystem.documentDirectory + gif.id + ".gif"
        );

        const base64 = await FileSystem.readAsStringAsync(result.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          gif.id + ".gif",
          "image/gif"
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
            Alert.alert("Download", "Gif Downloaded Successfully");
          })
          .catch((e) => console.log(e));
      }
    } else {
      shareGif();
    }
  };

  const shareGif = async () => {
    setIsShareLoading(true);
    const result = await FileSystem.downloadAsync(
      gif.images.original.url,
      FileSystem.documentDirectory + gif.id + ".gif"
    );
    shareAsync(result.uri);
    setIsShareLoading(false);
  };

  return (
    <View className="bg-gray-300 dark:bg-gray-900 flex-1 items-center pt-8 px-6">
      <View className="w-full p-2 rounded-2xl items-center bg-white dark:bg-gray-700 self-start">
        <Image
          style={{ width: "100%", height: 300, borderRadius: 8 }}
          source={{
            uri: isPlaying
              ? gif.images.fixed_height.url
              : gif.images.fixed_height_still.url,
          }}
        />
        <TouchableOpacity
          onPress={() => setIsPlaying(!isPlaying)}
          className="absolute justify-center items-start bottom-4 right-4 bg-black/50 p-2 rounded-full"
        >
          <Feather
            name={isPlaying ? "pause" : "play"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <View className="mt-8 dark:bg-gray-700 bg-white p-3 w-full rounded-lg">
        <Text className="dark:text-white text-xl font-semibold">
          {gif.title}
        </Text>
      </View>
      <View className="flex-row items-center mt-8 gap-4">
        <TouchableOpacity
          onPress={downloadGif}
          className="grow dark:bg-gray-700 bg-white p-2 rounded-lg flex-row gap-2 items-center"
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/9797/9797374.png",
            }}
          />
          <Text className="text-lg dark:text-white font-semibold">
            Download
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isShareLoading}
          onPress={shareGif}
          className="grow bg-white dark:bg-gray-700 p-2 rounded-lg flex-row gap-2 items-center"
        >
          {isShareLoading ? (
            <ActivityIndicator size={30} />
          ) : (
            <Image
              style={{ width: 30, height: 30 }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/3925/3925154.png",
              }}
            />
          )}
          <Text className="text-lg dark:text-white font-semibold">Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
