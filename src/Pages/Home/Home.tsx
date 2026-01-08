import React from "react";
import { Text, View } from "react-native";
import HomeHeader from "./Components/HomeHeader";
import StatsSection from "./Components/StatsSection";
import CraftsmanshipSection from "./Components/CraftsmanshipSection";
import { useTheme } from "../../Contexts/ThemeContext";

export default function Home() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HomeHeader />
      <StatsSection />
      <CraftsmanshipSection />
    </View>
  );
}
