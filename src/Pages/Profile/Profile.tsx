import React from "react";
import { Text, View } from "react-native";
import SharedHeader from "../../Components/SharedHeader/SharedHeader";

export default function Profile() {
  return (
    <View>
      <View style={{ flex: 1 }}>
        <SharedHeader title="Profile" />
      </View>{" "}
    </View>
  );
}
