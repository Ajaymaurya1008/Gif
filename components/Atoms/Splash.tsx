import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

export default function Splash() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <LottieView
        autoPlay
        style={{
          width: 300,
          height: 300,
          backgroundColor: "#fff",
        }}
        source={require("@/assets/images/splash.json")}
      />
    </View>
  );
}

