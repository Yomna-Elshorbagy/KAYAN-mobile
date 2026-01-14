import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardTypeOptions,
} from "react-native";
import { Control, Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../Contexts/ThemeContext";

interface AppInputProps {
  name: string;
  control: Control<any>;
  placeholder: string;
  secureTextEntry?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  keyboardType?: KeyboardTypeOptions;
  label?: string;
}

const CustomInput = ({
  name,
  control,
  placeholder,
  secureTextEntry,
  icon,
  keyboardType,
  label,
}: AppInputProps) => {
  const [show, setShow] = React.useState(false);
  const { colors } = useTheme();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          {label && (
            <Text
              style={{
                color: colors.text,
                marginBottom: 8,
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              {label}
            </Text>
          )}
          <View
            style={[
              styles.inputWrapper,
              {
                backgroundColor: colors.inputBackground,
                borderColor: error ? "red" : colors.inputBorder,
              },
            ]}
          >
            {icon && (
              <Ionicons
                name={icon}
                size={20}
                color={colors.subText}
                style={styles.icon}
              />
            )}

            <TextInput
              placeholder={placeholder}
              placeholderTextColor={colors.placeholder}
              value={value}
              onChangeText={onChange}
              secureTextEntry={secureTextEntry && !show}
              keyboardType={keyboardType}
              style={[styles.input, { color: colors.text }]}
            />

            {secureTextEntry && (
              <TouchableOpacity onPress={() => setShow(!show)}>
                <Ionicons
                  name={show ? "eye-off" : "eye"}
                  size={20}
                  color={colors.subText}
                />
              </TouchableOpacity>
            )}
          </View>

          {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
      )}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 60,
  },
  icon: { marginRight: 12 },
  input: {
    flex: 1,
    fontSize: 16,
  },
  error: { color: "red", marginTop: 4, fontSize: 12, marginLeft: 4 },
});
