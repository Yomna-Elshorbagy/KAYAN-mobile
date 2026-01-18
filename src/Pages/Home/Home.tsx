import React from "react";
import { ScrollView, View } from "react-native";
import HomeHeader from "./Components/HomeHeader";
import HeroSection from "./Components/HeroSection";
import NewArriaval from "./Components/NewArriaval";
import CategoriesSection from "./Components/CategoriesSection";
import StatsSection from "./Components/StatsSection";
import CraftsmanshipSection from "./Components/CraftsmanshipSection";
import { useTheme } from "../../Contexts/ThemeContext";

export default function Home() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HomeHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <HeroSection />
        <StatsSection />
        <CategoriesSection />

        <CraftsmanshipSection />
        <NewArriaval />
      </ScrollView>
    </View>
  );
}
