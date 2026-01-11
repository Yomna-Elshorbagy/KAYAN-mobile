import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import SharedHeader from "../../Components/SharedHeader/SharedHeader";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useTheme } from "../../Contexts/ThemeContext";
import CustomInput from "../../Shared/CustomInput";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { fetchProducts } from "../../Redux/Slices/products.thunks";
import { styles } from "../../Styles/ProductStyles";
import {
  addWishlistItem,
  removeWishlistItem,
} from "../../Redux/Slices/wishlistSlice";
import { addCartItem } from "../../Redux/Slices/cartSlice";

export default function Products() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    products: reduxProducts,
    loading,
    error,
  } = useAppSelector((state) => state.products);

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { control, watch } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const searchValue = watch("search");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchValue || "");
    }, 500);

    return () => clearTimeout(handler);
  }, [searchValue]);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, size: 50 }));
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    if (!debouncedSearch.trim()) return reduxProducts;
    const lowerSearch = debouncedSearch.toLowerCase();
    return reduxProducts.filter(
      (item) =>
        item.title?.toLowerCase().includes(lowerSearch) ||
        item.title?.toLowerCase().includes(lowerSearch)
    );
  }, [reduxProducts, debouncedSearch]);

  // ===> handle add to wishlist
  const wishlist = useAppSelector((state) => state.wishlist.items);

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

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SharedHeader title={t("shop.title")} />

      <View style={styles.searchSection}>
        <CustomInput
          name="search"
          control={control}
          placeholder={t("shop.searchPlaceholder")}
          icon="search"
        />
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text
            style={{
              color: "#FF4D4D",
              textAlign: "center",
              paddingHorizontal: 20,
            }}
          >
            {error}
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            key={filteredProducts.length === 1 ? "one-column" : "two-columns"}
            data={filteredProducts}
            numColumns={filteredProducts.length === 1 ? 1 : 2}
            keyExtractor={(item) => item._id}
            columnWrapperStyle={filteredProducts.length > 1 ? styles.row : null}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>
                <ProductCard
                  product={item}
                  isWishlisted={isProductWishlisted(item._id)}
                  onPress={() => console.log("Go to details")}
                  onAddToCart={() => handleAddToCart(item)}
                  onToggleWishlist={() => handleToggleWishlist(item)}
                />
              </View>
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={{ color: colors.subText }}>
                  {t("shop.noProductsFound")}
                </Text>
              </View>
            }
          />
        </View>
      )}
    </View>
  );
}
