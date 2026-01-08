import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../Contexts/ThemeContext";
import { HomeHeaderStyles } from "../../Styles/Header";
import { LanguageToggleButton } from "../LanguageToggler/LanguageToggler";

interface SharedHeaderProps {
  title: string;
  showHomeIcon?: boolean;
}

const SharedHeader: React.FC<SharedHeaderProps> = ({
  title,
  showHomeIcon = true,
}) => {
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

      {/* Center: Dynamic Title */}
      <Text style={[HomeHeaderStyles.title, { color: colors.primary }]}>
        {title}
      </Text>

      {/* Right: Icons */}
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

        {showHomeIcon && (
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Ionicons name="home-outline" size={22} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SharedHeader;
