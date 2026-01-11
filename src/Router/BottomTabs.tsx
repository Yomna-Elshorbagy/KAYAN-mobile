import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Animated, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../Contexts/ThemeContext";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import Cart from "../Pages/Cart/Cart";
import Profile from "../Pages/Profile/Profile";
import TabIcon from "../Shared/TabIcon";
import Wishlist from "../Pages/Wishlist/Wishlist";
import { useAppDispatch, useAppSelector } from "../Redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchWishlist } from "../Redux/Slices/wishlistSlice";
import { fetchCart } from "../Redux/Slices/cartSlice";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const { colors } = useTheme();
  const wishlistCount = useAppSelector(
    (state) => state.wishlist.items?.length || 0
  );
  const cartCount = useAppSelector((state) => state.cart?.noOfCartItems || 0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initWishlistAndCart = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        dispatch(fetchWishlist());
        dispatch(fetchCart());
      }
    };

    initWishlistAndCart();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.inputBorder,
          height: 70,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.subText,
        tabBarIcon: ({ focused, color }) => {
          let iconName: any;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Shop":
              iconName = focused ? "search" : "search-outline";
              break;
            case "Wishlist":
              iconName = focused ? "heart" : "heart-outline";
              break;
            case "Cart":
              iconName = focused ? "bag" : "bag-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
          }

          return (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {focused && (
                <Animated.View
                  style={{
                    position: "absolute",
                    bottom: -25,
                    width: 18,
                    height: 3,
                    borderRadius: 2,
                    backgroundColor: colors.primary,
                  }}
                />
              )}

              <TabIcon name={iconName} focused={focused} color={color} />
            </View>
          );
        },

        tabBarLabel: ({ color, focused }) => (
          <Text
            style={{
              color,
              fontSize: 12,
              marginBottom: 6,
              fontWeight: focused ? "600" : "400",
            }}
          >
            {route.name} {/* use name route as label */}
          </Text>
        ),
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Shop" component={Products} />
      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          tabBarBadge: wishlistCount > 0 ? wishlistCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: "#E63946",
            color: "white",
            fontSize: 10,
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: "#E63946",
            color: "white",
            fontSize: 10,
          },
        }}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
