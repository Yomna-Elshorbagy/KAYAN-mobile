import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Trash2 } from "lucide-react-native";
import { useTheme } from "../../Contexts/ThemeContext";
import {
  fetchWishlist,
  removeWishlistItem,
  clearWishlistItems,
} from "../../Redux/Slices/wishlistSlice";
import WishlistCard from "../../Components/WishlistCard/WishlistCard";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import SharedHeader from "../../Components/SharedHeader/SharedHeader";
import { wishlistStyles } from "../../Styles/WishlistStyles";

const Wishlist = () => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, []);

  return (
    <View
      style={[wishlistStyles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View>
        <SharedHeader title="Wishlist" />
      </View>
      <View style={wishlistStyles.header}>
        <View>
          <Text style={[wishlistStyles.title, { color: colors.text }]}>
            Your Wishlist
          </Text>
          <Text style={{ color: colors.subText }}>{items.length} items</Text>
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
              onRemove={() => dispatch(removeWishlistItem(item._id))}
              onMoveToCart={() => {
                // dispatch(addToCart(item))
                // dispatch(removeWishlistItem(item._id));
              }}
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Wishlist;
