import React, { useEffect } from "react";
import { View, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import { useNavigation, CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../Constants/routes";
import { splashStyles } from "../../Styles/SplashStyle";
import { useAppDispatch } from "../../Redux/store";
import { setToken } from "../../Redux/Slices/authSlice";

export default function Splash() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const titleOpacity = useSharedValue(0);

  const checkFirstLaunch = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const isFirstLaunch = await AsyncStorage.getItem("isFirstLaunch");

      if (accessToken) {
        dispatch(setToken(accessToken));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: ROUTES.BOTTOM_NAV }],
          })
        );
        return;
      }

      if (isFirstLaunch === null) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: ROUTES.ONBOARDING }],
          })
        );
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: ROUTES.LOGIN }],
          })
        );
      }
    } catch (error) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: ROUTES.ONBOARDING }],
        })
      );
    }
  };

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1200 });
    scale.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1100 }),
        withTiming(0.92, { duration: 1100 })
      ),
      -1,
      true
    );

    titleOpacity.value = withTiming(1, { duration: 1500 });

    const splashTimer = setTimeout(() => {
      checkFirstLaunch();
    }, 2000);

    return () => clearTimeout(splashTimer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const animatedTitleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
  }));

  return (
    <View style={splashStyles.container}>
      <Animated.View style={[splashStyles.logoContainer, animatedStyle]}>
        <Image
          source={require("../../../assets/KAYANlogo.png")}
          style={splashStyles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.Text style={[splashStyles.title, animatedTitleStyle]}>
        {t("splash.title")}
      </Animated.Text>
    </View>
  );
}
