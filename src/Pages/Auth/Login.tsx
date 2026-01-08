import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { loginSchema, LoginSchemaType } from "../../Utilis/Schema/loginSchema";
import { loginThunk } from "../../Redux/Slices/authSlice";
import CustomInput from "./../../Shared/CustomInput";
import CustomButton from "./../../Shared/CustomButton";
import { useTheme } from "../../Contexts/ThemeContext";
import { LoginStyles } from "../../Styles/LoginStyles";
import { ROUTES } from "../../Constants/routes";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((s) => s.auth);
  const { colors } = useTheme();
  const navigation: any = useNavigation();

  const { control, handleSubmit } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      await dispatch(loginThunk(data)).unwrap();
      await AsyncStorage.setItem("isFirstLaunch", "false");
      navigation.replace(ROUTES.HOME);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error || "Something went wrong",
      });
    }
  };

  return (
    <SafeAreaView
      style={[LoginStyles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={LoginStyles.scrollContent}
      >
        <View style={LoginStyles.headerContainer}>
          <Text style={[LoginStyles.logoText, { color: colors.primary }]}>
            KAYAN
          </Text>
          <Text style={[LoginStyles.subLogoText, { color: colors.subText }]}>
            Luxury Jewelry
          </Text>
        </View>

        <View style={LoginStyles.welcomeContainer}>
          <Text style={[LoginStyles.welcomeText, { color: colors.text }]}>
            Welcome
          </Text>
          <Text style={[LoginStyles.subWelcomeText, { color: colors.subText }]}>
            Sign in to continue shopping
          </Text>
        </View>

        <View style={LoginStyles.formContainer}>
          <CustomInput
            name="email"
            control={control}
            placeholder="Email"
            icon="mail-outline"
            keyboardType="email-address"
          />

          <CustomInput
            name="password"
            control={control}
            placeholder="Password"
            secureTextEntry
            icon="lock-closed-outline"
          />

          <TouchableOpacity style={LoginStyles.forgotPassword}>
            <Text
              style={[
                LoginStyles.forgotPasswordText,
                { color: colors.primary },
              ]}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <CustomButton
            title="Sign In"
            loading={isLoading}
            onPress={handleSubmit(onSubmit)}
          />

          <View style={LoginStyles.footerContainer}>
            <Text style={[LoginStyles.footerText, { color: colors.subText }]}>
              Don't have an account?{" "}
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.REGISTER)}
              >
                <Text style={{ color: colors.primary, fontWeight: "bold" }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </Text>
          </View>

          <CustomButton
            title="Continue as Guest"
            variant="outline"
            onPress={async () => {
              await AsyncStorage.setItem("isFirstLaunch", "false");
              navigation.replace(ROUTES.HOME);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
