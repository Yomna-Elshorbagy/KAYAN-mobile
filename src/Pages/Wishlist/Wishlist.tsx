import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Trash2 } from "lucide-react-native";
import Toast from "react-native-toast-message";
import { useTheme } from "../../Contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import {
  fetchWishlist,
  removeWishlistItem,
  clearWishlistItems,
} from "../../Redux/Slices/wishlistSlice";
import { addCartItem } from "../../Redux/Slices/cartSlice";
import WishlistCard from "../../Components/WishlistCard/WishlistCard";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import SharedHeader from "../../Components/SharedHeader/SharedHeader";
import { wishlistStyles } from "../../Styles/WishlistStyles";

const Wishlist = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, []);

  const handleMoveToCart = (product: any) => {
    dispatch(addCartItem({ productId: product._id }));
    dispatch(removeWishlistItem(product._id));
    Toast.show({
      type: "success",
      text1: t("toasts.moved"),
      text2: `${product.title} ${t("wishlist.movedToBagToast")}`,
    });
  };

  const handleRemoveItem = (product: any) => {
    dispatch(removeWishlistItem(product._id));
    Toast.show({
      type: "success",
      text1: t("toasts.removed"),
      text2: `${product.title} ${t("wishlist.removedToast")}`,
    });
  };

  return (
    <View
      style={[wishlistStyles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View>
        <SharedHeader title={t("wishlist.header")} />
      </View>
      <View style={wishlistStyles.header}>
        <View>
          <Text style={[wishlistStyles.title, { color: colors.text }]}>
            {t("wishlist.title")}
          </Text>
          <Text style={{ color: colors.subText }}>
            {items.length} {t("wishlist.items")}
          </Text>
        </View>

        {items.length > 0 && (
          <TouchableOpacity onPress={() => dispatch(clearWishlistItems())}>
            <Trash2 size={22} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
      {/* Wishlist Grid */}
      <FlatList
        key={items.length === 1 ? "one-column" : "two-columns"}
        data={items}
        keyExtractor={(item) => item._id}
        numColumns={items.length === 1 ? 1 : 2}
        columnWrapperStyle={items.length > 1 ? wishlistStyles.row : null}
        contentContainerStyle={wishlistStyles.list}
        renderItem={({ item }) => (
          <View style={wishlistStyles.cardContainer}>
            <WishlistCard
              product={item}
              onRemove={() => handleRemoveItem(item)}
              onMoveToCart={() => handleMoveToCart(item)}
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Wishlist;
