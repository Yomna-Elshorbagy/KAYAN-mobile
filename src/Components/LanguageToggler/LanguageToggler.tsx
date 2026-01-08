import React, { useEffect } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../../Contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../Contexts/LanguageProvider";
import { LanguageStyles } from "../../Styles/LangageStyles";

export const LanguageToggleButton = () => {
  const { colors } = useTheme();
  const { i18n } = useTranslation();
  const { language, setLanguage } = useLanguage();

  const isArabic = language === "ar";

  const slider = useSharedValue(isArabic ? 1 : 0);

  useEffect(() => {
    slider.value = withTiming(isArabic ? 1 : 0, { duration: 250 });
  }, [isArabic]);

  const animatedSlider = useAnimatedStyle(() => ({
    transform: [{ translateX: slider.value * 42 }],
  }));

  const toggleLang = () => {
    const newLang = isArabic ? "en" : "ar";
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={toggleLang}>
      <View
        style={[
          LanguageStyles.container,
          {
            backgroundColor: colors.inputBackground,
            borderColor: colors.inputBorder,
          },
        ]}
      >
        <Animated.View
          style={[
            LanguageStyles.slider,
            animatedSlider,
            { backgroundColor: colors.primary },
          ]}
        />

        <Text
          style={[
            LanguageStyles.label,
            { color: !isArabic ? colors.text : colors.subText },
          ]}
        >
          EN
        </Text>

        <Text
          style={[
            LanguageStyles.label,
            { color: isArabic ? colors.text : colors.subText },
          ]}
        >
          AR
        </Text>
      </View>
    </TouchableOpacity>
  );
};
