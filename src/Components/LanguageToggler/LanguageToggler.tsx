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

  const getIndex = (lang: string) => {
    if (lang === "en") return 0;
    if (lang === "ar") return 1;
    if (lang === "de") return 2;
    return 0;
  };

  const slider = useSharedValue(getIndex(language));

  useEffect(() => {
    slider.value = withTiming(getIndex(language), { duration: 250 });
  }, [language]);

  const animatedSlider = useAnimatedStyle(() => ({
    transform: [{ translateX: slider.value * 31.3 }],
  }));

  const toggleLang = () => {
    let newLang = "en";
    if (language === "en") newLang = "ar";
    else if (language === "ar") newLang = "de";
    else if (language === "de") newLang = "en";

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
            { color: language === "en" ? colors.white : colors.subText },
          ]}
        >
          EN
        </Text>

        <Text
          style={[
            LanguageStyles.label,
            { color: language === "ar" ? colors.white : colors.subText },
          ]}
        >
          AR
        </Text>

        <Text
          style={[
            LanguageStyles.label,
            { color: language === "de" ? colors.white : colors.subText },
          ]}
        >
          DE
        </Text>
      </View>
    </TouchableOpacity>
  );
};
