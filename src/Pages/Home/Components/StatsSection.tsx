import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../../Contexts/ThemeContext";
import { useTranslation } from "react-i18next";

const StatsSection: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const stats = [
    { value: "500+", label: t("stats.uniqueDesigns") },
    { value: "50K+", label: t("stats.happyClients") },
    { value: "15+", label: t("stats.yearsOfExcellence") },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {stats.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={[styles.value, { color: colors.primary }]}>
            {item.value}
          </Text>
          <Text style={[styles.label, { color: colors.subText }]}>
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default StatsSection;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 32,
    justifyContent: "space-around",
  },
  item: {
    alignItems: "center",
  },
  value: {
    fontSize: 28,
    fontWeight: "700",
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    letterSpacing: 1,
    textAlign: "center",
  },
});
