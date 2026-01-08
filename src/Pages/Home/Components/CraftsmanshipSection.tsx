import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../../Contexts/ThemeContext";
import { useTranslation } from "react-i18next";

const CraftsmanshipSection: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.dividerRow}>
        <View style={[styles.line, { backgroundColor: colors.sage[300] }]} />
        <Feather name="award" size={22} color={colors.primary} />
        <View style={[styles.line, { backgroundColor: colors.sage[300] }]} />
      </View>

      <Text style={[styles.title, { color: colors.text }]}>
        {t("craftsmanship.title")}
      </Text>

      <Text style={[styles.description, { color: colors.subText }]}>
        {t("craftsmanship.description")}
      </Text>
    </View>
  );
};

export default CraftsmanshipSection;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 44,
    alignItems: "center",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  line: {
    width: 48,
    height: 1,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
});
