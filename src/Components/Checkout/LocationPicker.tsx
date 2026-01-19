import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../../Contexts/ThemeContext";
import { locationStylesWeb } from "../../Styles/LocationStyles";
import { useTranslation } from "react-i18next";

interface LocationPickerProps {
  onConfirm: (location: {
    latitude: number;
    longitude: number;
    description?: string;
  }) => void;
  onCancel: () => void;
  initialLocation?: { latitude: number; longitude: number };
}

/**
 * web fallback for LocationPicker
 * react-native-maps is not supported on web and causes crashes.
 */
const LocationPicker: React.FC<LocationPickerProps> = ({ onCancel }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={locationStylesWeb.container}>
      <View style={locationStylesWeb.header}>
        <TouchableOpacity onPress={onCancel} style={locationStylesWeb.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[locationStylesWeb.title, { color: colors.text }]}>
          {t("location.selectLocation")}
        </Text>
      </View>

      <View style={locationStylesWeb.content}>
        <Ionicons name="map-outline" size={64} color={colors.subText} />
        <Text style={[locationStylesWeb.message, { color: colors.text }]}>
          {t("location.mobileOnly")}
        </Text>
        <Text style={[locationStylesWeb.subMessage, { color: colors.subText }]}>
          {t("location.manualEntry")}
        </Text>
        <TouchableOpacity
          style={[
            locationStylesWeb.closeBtn,
            { backgroundColor: colors.primary },
          ]}
          onPress={onCancel}
        >
          <Text style={locationStylesWeb.closeText}>
            {t("location.goBack")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationPicker;
