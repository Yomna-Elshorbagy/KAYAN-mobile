import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { HomeStyles } from "../../../Styles/HomeStyles";
import { useTheme } from "../../../Contexts/ThemeContext";

const HeroSection = () => {
  const { colors } = useTheme();

  return (
    <View style={HomeStyles.heroContainer}>
      <ImageBackground
        source={require("../../../../assets/hero_jewelry.png")}
        style={HomeStyles.heroImage}
        resizeMode="cover"
      >
        <View style={HomeStyles.heroOverlay} />
        <View style={HomeStyles.heroContent}>
          <Text style={HomeStyles.heroTitle}>New Collection</Text>
          <Text style={HomeStyles.heroSubtitle}>
            Discover our latest handcrafted elegence.
          </Text>
          <TouchableOpacity
            style={[HomeStyles.heroButton, { backgroundColor: colors.primary }]}
            activeOpacity={0.8}
          >
            <Text style={HomeStyles.heroButtonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HeroSection;
