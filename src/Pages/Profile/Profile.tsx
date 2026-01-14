import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";

import { useTheme } from "../../Contexts/ThemeContext";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import {
  getProfileThunk,
  updateProfileThunk,
} from "../../Redux/Slices/userSlice";
import { fetchUserOrders } from "../../Redux/Slices/orderSlice";
import { logoutUser } from "../../Redux/Slices/authSlice";
import { getProfileStyles } from "../../Styles/ProfileStyles";
import { ROUTES } from "../../Constants/routes";

// New Components
import Header from "./Components/Header";
import Tabs from "./Components/Tabs";
import InfoView from "./Components/InfoView";
import EditView from "./Components/EditView";
import OrdersView from "./Components/OrdersView";
import TrackingView from "./Components/TrackingView";

type ViewState = "info" | "edit" | "orders" | "tracking";

export default function Profile() {
  const { colors, theme, toggleTheme } = useTheme();
  const styles = getProfileStyles(colors);
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  // Redux States
  const { profile, isLoading: userLoading } = useAppSelector(
    (state) => state.user
  );
  const { orders, loading: ordersLoading } = useAppSelector(
    (state) => state.order
  );

  // Local States
  const [activeView, setActiveView] = useState<ViewState>("info");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const { control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      userName: "",
      mobileNumber: "",
      recoveryEmail: "",
      gender: "male",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const currentGender = watch("gender");

  useEffect(() => {
    dispatch(getProfileThunk());
    dispatch(fetchUserOrders());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      reset({
        userName: profile.userName,
        mobileNumber: profile.mobileNumber || "",
        recoveryEmail: profile.recoveryEmail || "",
        gender: (profile.gender as any) || "male",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [profile, reset]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        t("profile.permissionDenied"),
        t("profile.cameraRollPermissionNeeded")
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const handleLogout = () => {
    Alert.alert(t("profile.logoutTitle"), t("profile.logoutConfirm"), [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("profile.logout"),
        style: "destructive",
        onPress: () => {
          dispatch(logoutUser());
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: ROUTES.LOGIN }],
            })
          );
        },
      },
    ]);
  };

  const onUpdateProfile = async (data: any) => {
    try {
      const formData = new FormData();
      if (data.userName) formData.append("userName", data.userName);
      if (data.mobileNumber) formData.append("mobileNumber", data.mobileNumber);
      if (data.recoveryEmail) formData.append("recoveryEmail", data.recoveryEmail);
      if (data.gender) formData.append("gender", data.gender);

      if (data.newPassword) {
        formData.append("newPassword", data.newPassword);
        formData.append("confirmPassword", data.confirmPassword);
      }

      if (selectedImage) {
        const uri = selectedImage.uri;
        const filename = uri.split("/").pop() || "avatar.jpg";
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : "image/jpeg";

        if (Platform.OS === "web") {
          const response = await fetch(uri);
          const blob = await response.blob();
          formData.append("image", blob, filename);
        } else {
          // @ts-ignore
          formData.append("image", {
            uri: uri,
            name: filename,
            type: type,
          });
        }
      }

      await dispatch(updateProfileThunk(formData)).unwrap();
      Toast.show({
        type: "success",
        text1: t("toasts.success"),
        text2: t("profile.updateSuccess"),
      });
      setSelectedImage(null);
      setActiveView("info");
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: t("toasts.error"),
        text2: err || t("profile.updateFailed"),
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header
          activeView={activeView}
          pickImage={pickImage}
          selectedImage={selectedImage}
          profile={profile}
          colors={colors}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.userName}>
            {profile?.userName || t("profile.userNameDefault")}
          </Text>
          <Text style={styles.userEmail}>{profile?.email}</Text>
        </View>

        {activeView !== "edit" && activeView !== "tracking" && (
          <Tabs
            activeView={activeView}
            setActiveView={setActiveView}
            colors={colors}
          />
        )}

        {activeView === "info" && (
          <InfoView
            profile={profile}
            setActiveView={setActiveView}
            theme={theme}
            toggleTheme={toggleTheme}
            handleLogout={handleLogout}
            colors={colors}
          />
        )}

        {activeView === "edit" && (
          <EditView
            control={control}
            setActiveView={setActiveView}
            currentGender={currentGender}
            setValue={setValue}
            handleSubmit={handleSubmit}
            onUpdateProfile={onUpdateProfile}
            isLoading={userLoading}
            colors={colors}
          />
        )}

        {activeView === "orders" && (
          <OrdersView
            orders={orders}
            isLoading={ordersLoading}
            setSelectedOrder={setSelectedOrder}
            setActiveView={setActiveView}
            colors={colors}
          />
        )}

        {activeView === "tracking" && (
          <TrackingView
            selectedOrder={selectedOrder}
            setActiveView={setActiveView}
            colors={colors}
          />
        )}
      </ScrollView>
    </View>
  );
}
