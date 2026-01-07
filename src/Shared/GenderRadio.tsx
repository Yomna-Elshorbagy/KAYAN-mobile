import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface GenderRadioProps {
  value?: "male" | "female";
  onChange: (value: "male" | "female") => void;
}

const GenderRadio = ({ value, onChange }: GenderRadioProps) => {
  return (
    <View style={styles.container}>
      {["male", "female"].map((gender) => {
        const selected = value === gender;

        return (
          <TouchableOpacity
            key={gender}
            style={styles.option}
            onPress={() => onChange(gender as "male" | "female")}
            activeOpacity={0.7}
          >
            <View style={styles.radioOuter}>
              {selected && <View style={styles.radioInner} />}
            </View>

            <Text style={styles.label}>
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default GenderRadio;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 24,
    marginVertical: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#999",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E5B13D",
  },
  label: {
    fontSize: 16,
  },
});
