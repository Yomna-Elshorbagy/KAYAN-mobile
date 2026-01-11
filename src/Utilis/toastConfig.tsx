import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

export const toastConfig = {
  success: ({ text1, text2 }: any) => (
    <View
      style={{
        width: "90%",
        alignSelf: "center",
        backgroundColor: "#9f987fff",
        padding: 14,
        borderRadius: 18,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
      }}
    >
      <Feather name="check-circle" size={24} color="#fff" />

      <View style={{ flex: 1 }}>
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
          {text1}
        </Text>
        {text2 && (
          <Text style={{ color: "#f0fdf4", marginTop: 3, fontSize: 13 }}>
            {text2}
          </Text>
        )}
      </View>
    </View>
  ),
  error: ({ text1, text2 }: any) => (
    <View
      style={{
        width: "90%",
        alignSelf: "center",
        backgroundColor: "#D63D3D",
        padding: 14,
        borderRadius: 18,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
      }}
    >
      <Feather name="x-circle" size={24} color="#fff" />
      <View style={{ flex: 1 }}>
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
          {text1}
        </Text>
        {text2 && (
          <Text style={{ color: "#fef2f2", marginTop: 3, fontSize: 13 }}>
            {text2}
          </Text>
        )}
      </View>
    </View>
  ),
};
