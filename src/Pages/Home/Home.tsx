import React from "react";
import { Text, View } from "react-native";
import HomeHeader from "./Components/HomeHeader";

export default function Home() {
  return (
    <View>
      <View style={{ flex: 1 }}>
        <HomeHeader />
      </View>
    </View>
  );
}
