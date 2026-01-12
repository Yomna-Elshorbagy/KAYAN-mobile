import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../../Contexts/ThemeContext";
import { locationStylesNative } from "../../Styles/LocationStyles";

//===> props
interface LocationPickerProps {
  //=> 1- return order page loc
  onConfirm: (location: {
    latitude: number;
    longitude: number;
    description?: string;
  }) => void;
  onCancel: () => void;
  //=> 2- if there is old location
  initialLocation?: { latitude: number; longitude: number };
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  onConfirm,
  onCancel,
  initialLocation,
}) => {
  const { colors } = useTheme();
  //==> here from location start
  const [region, setRegion] = useState<Region>({
    latitude: initialLocation?.latitude || 30.0444, // default to Cairo
    longitude: initialLocation?.longitude || 31.2357,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  //==> the spot that user selected ==> when mark sign put
  const [selectedPoint, setSelectedPoint] = useState<{
    latitude: number;
    longitude: number;
  } | null>(initialLocation || null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      //==> here ask user for access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        //==> if user refused
        setErrorMsg("Permission to access location was denied");
        setLoading(false);
        return;
      }

      if (!initialLocation) {
        try {
          //==> get the current point of user exist on map and mark it in the previous setRegion and setSelectedPoint
          let location = await Location.getCurrentPositionAsync({});
          const newRegion = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setRegion(newRegion);
          setSelectedPoint({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        } catch (error) {
          console.log("Error getting current location:", error);
        }
      }
      setLoading(false);
    })();
  }, []);

  const handleMapPress = (e: any) => {
    const coords = e.nativeEvent.coordinate;
    setSelectedPoint(coords);
  };

  const handleConfirm = async () => {
    if (selectedPoint) {
      let description = "Selected from Map";
      try {
        // => convert code to string address be readable
        const reverseGeocode = await Location.reverseGeocodeAsync(
          selectedPoint
        );
        if (reverseGeocode.length > 0) {
          const { street, city, country } = reverseGeocode[0];
          description = `${street ? street + ", " : ""}${city || ""}${
            country ? ", " + country : ""
          }`;
        }
      } catch (e) {
        console.log("Reverse geocode failed:", e);
      }
      // => return all needed data to Backend
      onConfirm({ ...selectedPoint, description });
    }
  };

  if (loading) {
    return (
      <View style={locationStylesNative.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 10, color: colors.subText }}>
          Loading Map...
        </Text>
      </View>
    );
  }

  return (
    <View style={locationStylesNative.container}>
      <View style={locationStylesNative.header}>
        <TouchableOpacity
          onPress={onCancel}
          style={locationStylesNative.backBtn}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[locationStylesNative.title, { color: colors.text }]}>
          Select Location
        </Text>
      </View>

      {/* marker if there is selected point  */}
      <MapView
        style={locationStylesNative.map}
        initialRegion={region}
        onPress={handleMapPress}
      >
        {selectedPoint && <Marker coordinate={selectedPoint} />}
      </MapView>

      <View
        style={[
          locationStylesNative.footer,
          { backgroundColor: colors.background },
        ]}
      >
        <Text style={[locationStylesNative.hint, { color: colors.subText }]}>
          Tap on the map to select your delivery point
        </Text>
        <TouchableOpacity
          style={[
            locationStylesNative.confirmBtn,
            {
              backgroundColor: selectedPoint
                ? colors.primary
                : colors.sage[300],
            },
          ]}
          disabled={!selectedPoint}
          onPress={handleConfirm}
        >
          <Text style={locationStylesNative.confirmText}>Confirm Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationPicker;
