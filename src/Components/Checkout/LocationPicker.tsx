import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../../Contexts/ThemeContext";
import { locationStylesWeb } from "../../Styles/LocationStyles";

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

  return (
    <View style={locationStylesWeb.container}>
      <View style={locationStylesWeb.header}>
        <TouchableOpacity onPress={onCancel} style={locationStylesWeb.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[locationStylesWeb.title, { color: colors.text }]}>
          Select Location
        </Text>
      </View>

      <View style={locationStylesWeb.content}>
        <Ionicons name="map-outline" size={64} color={colors.subText} />
        <Text style={[locationStylesWeb.message, { color: colors.text }]}>
          Map selection is currently available on mobile devices only.
        </Text>
        <Text style={[locationStylesWeb.subMessage, { color: colors.subText }]}>
          Please enter your address manually on the checkout page.
        </Text>
        <TouchableOpacity
          style={[
            locationStylesWeb.closeBtn,
            { backgroundColor: colors.primary },
          ]}
          onPress={onCancel}
        >
          <Text style={locationStylesWeb.closeText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationPicker;
