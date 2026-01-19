import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { HomeStyles } from "../../../Styles/HomeStyles";
import { useTheme } from "../../../Contexts/ThemeContext";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={HomeStyles.heroContainer}>
      <ImageBackground
        source={require("../../../../assets/hero_jewelry.png")}
        style={HomeStyles.heroImage}
        resizeMode="cover"
      >
        <View style={HomeStyles.heroOverlay} />
        <View style={HomeStyles.heroContent}>
          <Text style={HomeStyles.heroTitle}>{t("home.heroTitle")}</Text>
          <Text style={HomeStyles.heroSubtitle}>{t("home.heroSubtitle")}</Text>
          <TouchableOpacity
            style={[HomeStyles.heroButton, { backgroundColor: colors.primary }]}
            activeOpacity={0.8}
          >
            <Text style={HomeStyles.heroButtonText}>{t("home.shopNow")}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HeroSection;
