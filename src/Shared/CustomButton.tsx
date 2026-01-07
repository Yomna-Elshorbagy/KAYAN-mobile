import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useTheme } from "../Contexts/ThemeContext";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: "primary" | "outline";
}

const CustomButton = ({ title, onPress, loading, variant = "primary" }: AppButtonProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
      style={[
        styles.button,
        { backgroundColor: variant === "primary" ? colors.primary : "transparent" },
        variant === "outline" && { ...styles.outline, borderColor: colors.primary },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? colors.buttonText : colors.primary} />
      ) : (
        <Text
          style={[
            styles.text,
            { color: variant === "primary" ? colors.buttonText : colors.primary },
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
  },
  outline: {
    borderWidth: 1.5,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
