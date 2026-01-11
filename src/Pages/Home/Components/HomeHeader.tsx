import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../../../Contexts/ThemeContext";
import { LanguageToggleButton } from "../../../Components/LanguageToggler/LanguageToggler";
import { HomeHeaderStyles } from "../../../Styles/Header";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../../Constants/routes";

const HomeHeader = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const navigation = useNavigation<any>();

  return (
    <View
      style={[
        HomeHeaderStyles.container,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.inputBorder,
        },
      ]}
    >
      {/* Left: Language Toggle */}
      <View style={HomeHeaderStyles.left}>
        <LanguageToggleButton />
      </View>

      {/* Center: Logo / Title */}
      <Text style={[HomeHeaderStyles.title, { color: colors.primary }]}>
        KAYAN
      </Text>

      {/* Right: Action Icon */}
      <View
        style={[
          HomeHeaderStyles.right,
          {
            flexDirection: "row",
            gap: 15,
            justifyContent: "flex-end",
            alignItems: "center",
          },
        ]}
      >
        <TouchableOpacity onPress={toggleTheme}>
          <Ionicons
            name={theme === "dark" ? "sunny-outline" : "moon-outline"}
            size={22}
            color={colors.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(ROUTES.BOTTOM_NAV, { screen: ROUTES.PRODUCTS })
          }
        >
          <Ionicons name="bag-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;
