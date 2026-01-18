import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { useTheme } from "../../../Contexts/ThemeContext";
import { HomeStyles } from "../../../Styles/HomeStyles";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import { useAppDispatch, useAppSelector } from "../../../Redux/store";
import { fetchTrendingProducts } from "../../../Redux/Slices/products.thunks";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../../Constants/routes";
import { useTranslation } from "react-i18next";
import { addCartItem } from "../../../Redux/Slices/cartSlice";
import { addWishlistItem, removeWishlistItem } from "../../../Redux/Slices/wishlistSlice";
import Toast from "react-native-toast-message";

export default function NewArriaval() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { trending: products, loading } = useAppSelector((state) => state.products);
  const wishlist = useAppSelector((state) => state.wishlist.items);

  useEffect(() => {
    dispatch(fetchTrendingProducts());
  }, [dispatch]);

  const handleProductPress = (productId: string) => {
    navigation.navigate(ROUTES.PRODUCT_DETAIlS, { id: productId });
  };

  const isProductWishlisted = (productId: string) =>
    wishlist.some((item) => item._id === productId);

  const handleToggleWishlist = (product: any) => {
    if (isProductWishlisted(product._id)) {
      dispatch(removeWishlistItem(product._id));
      Toast.show({
        type: "success",
        text1: t("toasts.removed"),
        text2: `${product.title} ${t("shop.removedFromWishlistToast")}`,
      });
    } else {
      dispatch(addWishlistItem(product._id));
      Toast.show({
        type: "success",
        text1: t("toasts.added"),
        text2: `${product.title} ${t("shop.addedToWishlistToast")}`,
      });
    }
  };

  const handleAddToCart = (product: any) => {
    dispatch(addCartItem({ productId: product._id }));
    Toast.show({
      type: "success",
      text1: t("toasts.added"),
      text2: `${product.title} ${t("shop.addedToBagToast")}`,
    });
  };

  const handleViewAll = () => {
    navigation.navigate(ROUTES.BOTTOM_NAV, { screen: ROUTES.PRODUCTS });
  };

  if (loading && products.length === 0) {
    return (
      <View style={HomeStyles.sectionContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={HomeStyles.sectionContainer}>
      <View style={HomeStyles.sectionHeader}>
        <Text style={[HomeStyles.sectionTitle, { color: colors.text }]}>
          New Arrivals
        </Text>
        <TouchableOpacity onPress={handleViewAll}>
          <Text style={[HomeStyles.viewAllText, { color: colors.primary }]}>
            View All
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        contentContainerStyle={HomeStyles.horizontalList}
        renderItem={({ item }) => (
          <View style={HomeStyles.cardContainer}>
            <ProductCard
              product={item}
              isWishlisted={isProductWishlisted(item._id)}
              onPress={() => handleProductPress(item._id)}
              onAddToCart={() => handleAddToCart(item)}
              onToggleWishlist={() => handleToggleWishlist(item)}
            />
          </View>
        )}
      />
    </View>
  );
}
