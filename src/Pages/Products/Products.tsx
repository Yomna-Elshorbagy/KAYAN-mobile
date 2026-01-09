import React, { useEffect, useState, useMemo } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { useForm } from "react-hook-form";
import SharedHeader from "../../Components/SharedHeader/SharedHeader";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useTheme } from "../../Contexts/ThemeContext";
import CustomInput from "../../Shared/CustomInput";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { fetchProducts } from "../../Redux/Slices/products.thunks";
import { styles } from "../../Styles/ProductStyles";

export default function Products() {
  const { colors } = useTheme();
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

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SharedHeader title="Products" />

      <View style={styles.searchSection}>
        <CustomInput
          name="search"
          control={control}
          placeholder="Search for elegant items..."
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
            data={filteredProducts}
            numColumns={2}
            keyExtractor={(item) => item._id}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>
                <ProductCard
                  product={item}
                  onPress={() => console.log("Go to details")}
                  onAddToCart={() => console.log("Add to cart")}
                  onToggleWishlist={() => console.log("Wishlist")}
                />
              </View>
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={{ color: colors.subText }}>No products found</Text>
              </View>
            }
          />
        </View>
      )}
    </View>
  );
}
