import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { getProfileStyles } from "../../../Styles/ProfileStyles";
import { ThemeColors } from "../../../Constants/theme";

interface TabsProps {
  activeView: string;
  setActiveView: (view: any) => void;
  colors: ThemeColors;
}

const Tabs: React.FC<TabsProps> = ({ activeView, setActiveView, colors }) => {
  const { t } = useTranslation();
  const styles = getProfileStyles(colors);

  return (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={[styles.tab, activeView === "info" && styles.activeTab]}
        onPress={() => setActiveView("info")}
      >
        <Text
          style={[
            styles.tabText,
            activeView === "info" && styles.activeTabText,
          ]}
        >
          {t("profile.info")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          (activeView === "orders" || activeView === "tracking") &&
            styles.activeTab,
        ]}
        onPress={() => setActiveView("orders")}
      >
        <Text
          style={[
            styles.tabText,
            (activeView === "orders" || activeView === "tracking") &&
              styles.activeTabText,
          ]}
        >
          {t("profile.orders")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Tabs;
