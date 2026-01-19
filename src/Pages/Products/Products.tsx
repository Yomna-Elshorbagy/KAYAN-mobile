import React, { useEffect, useState, useMemo } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import SharedHeader from "../../Components/SharedHeader/SharedHeader";
import ProductCard from "../../Components/ProductCard/ProductCard";
import AccessorySkeleton from "../../Components/ProductSkeleton/AccessorySkeleton";
import Pagination from "../../Shared/Pagination";
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
import { ROUTES } from "../../Constants/routes";

export default function Products() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const {
    products: reduxProducts,
    loading,
    error,
  } = useAppSelector((state) => state.products);

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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
    setCurrentPage(1);
  }, [debouncedSearch]);

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

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

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
        <View style={styles.list}>
          <View style={styles.row}>
            <AccessorySkeleton />
            <AccessorySkeleton />
          </View>
          <View style={styles.row}>
            <AccessorySkeleton />
            <AccessorySkeleton />
          </View>
          <View style={styles.row}>
            <AccessorySkeleton />
            <AccessorySkeleton />
          </View>
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
            data={paginatedProducts}
            numColumns={2}
            keyExtractor={(item) => item._id}
            columnWrapperStyle={paginatedProducts.length > 1 ? styles.row : null}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>
                <ProductCard
                  product={item}
                  isWishlisted={isProductWishlisted(item._id)}
                  onPress={() =>
                    navigation.navigate(ROUTES.PRODUCT_DETAIlS, {
                      id: item._id,
                    })
                  }
                  onAddToCart={() => handleAddToCart(item)}
                  onToggleWishlist={() => handleToggleWishlist(item)}
                />
              </View>
            )}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            }
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
