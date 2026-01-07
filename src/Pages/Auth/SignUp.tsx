import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { signupThunk } from "../../Redux/Slices/authSlice";
import CustomInput from "./../../Shared/CustomInput";
import CustomButton from "./../../Shared/CustomButton";
import { useTheme } from "../../Contexts/ThemeContext";
import { LoginStyles } from "../../Styles/LoginStyles";
import { ROUTES } from "../../Constants/routes";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import {
  signUpSchema,
  SignUpSchemaType,
} from "../../Utilis/Schema/signupSchema";
import GenderRadio from "../../Shared/GenderRadio";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((s) => s.auth);
  const { colors } = useTheme();
  const navigation: any = useNavigation();

  const { control, handleSubmit, setValue } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userName: "",
      email: "",
      recoveryEmail: "",
      password: "",
      Cpassword: "",
      mobileNumber: "",
      gender: undefined,
    },
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    try {
      await dispatch(signupThunk(data)).unwrap();
      navigation.replace(ROUTES.LOGIN);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Sign UP Failed",
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
            Sign Up to continue shopping
          </Text>
        </View>

        <View style={LoginStyles.formContainer}>
          <CustomInput
            name="userName"
            control={control}
            placeholder="Full Name"
            icon="person-outline"
          />

          <CustomInput
            name="email"
            control={control}
            placeholder="Email"
            icon="mail-outline"
            keyboardType="email-address"
          />

          <CustomInput
            name="recoveryEmail"
            control={control}
            placeholder="Recovery Email"
            icon="mail-open-outline"
            keyboardType="email-address"
          />

          <CustomInput
            name="password"
            control={control}
            placeholder="Password"
            secureTextEntry
            icon="lock-closed-outline"
          />

          <CustomInput
            name="Cpassword"
            control={control}
            placeholder="Confirm Password"
            secureTextEntry
            icon="lock-closed-outline"
          />

          <CustomInput
            name="mobileNumber"
            control={control}
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            icon="call-outline"
          />

          <Controller
            control={control}
            name="gender"
            render={({ field: { value, onChange } }) => (
              <GenderRadio value={value} onChange={onChange} />
            )}
          />

          <CustomButton
            title="Sign Up"
            loading={isLoading}
            onPress={handleSubmit(onSubmit)}
          />
          <View style={LoginStyles.footerContainer}>
            <Text style={[LoginStyles.footerText, { color: colors.subText }]}>
              Already have an account?{" "}
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.LOGIN)}
              >
                <Text style={{ color: colors.primary, fontWeight: "bold" }}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
