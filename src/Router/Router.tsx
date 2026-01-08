import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { ThemeProvider } from "../Contexts/ThemeContext";
import { ROUTES } from "../Constants/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { AppDispatch, RootState } from "../Redux/store";
import Login from "../Pages/Auth/Login";
import Cart from "../Pages/Cart/Cart";
import Products from "../Pages/Products/Products";
import Checkout from "../Pages/CheckOut/Checkout";
import OrderDetails from "../Pages/OrderDetails/OrderDetails";
import Home from "../Pages/Home/Home";
import { setToken } from "../Redux/Slices/authSlice";
import SignUp from "../Pages/Auth/SignUp";
import BottomTabs from "./BottomTabs";
import Splash from "../Pages/Splash/Splash";
import Onboarding from "../Pages/Onboarding/Onboarding";

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();
const Router = () => {
  const user = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <ThemeProvider>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      </ThemeProvider>
    );
  }

  return (
    <>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {!user ? (
                <>
                  <Stack.Screen name={ROUTES.SPLASH} component={Splash} />
                  <Stack.Screen
                    name={ROUTES.ONBOARDING}
                    component={Onboarding}
                  />
                  <Stack.Screen name={ROUTES.LOGIN} component={Login} />
                  <Stack.Screen name={ROUTES.REGISTER} component={SignUp} />
                </>
              ) : (
                <>
                  {/* to apply navigation bar at the bottom of all pages */}
                  <Stack.Screen
                    name={ROUTES.BOTTOM_NAV}
                    component={BottomTabs}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name={ROUTES.HOME} component={Home} />
                  <Stack.Screen name={ROUTES.PRODUCTS} component={Products} />
                  <Stack.Screen name={ROUTES.CART} component={Cart} />
                  <Stack.Screen name={ROUTES.CHECKOUT} component={Checkout} />
                  <Stack.Screen
                    name={ROUTES.ORDER_DETAILS}
                    component={OrderDetails}
                  />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default Router;
