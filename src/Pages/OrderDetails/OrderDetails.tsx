import React from "react";
import { Text, View } from "react-native";
import SharedHeader from "../../Components/SharedHeader/SharedHeader";

export default function OrderDetails() {
  return (
    <View>
        <View style={{ flex: 1 }}>
        <SharedHeader title="Order details" />
      </View>{" "}
    </View>
  );
}
