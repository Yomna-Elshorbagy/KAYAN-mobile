import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Heart, ShoppingCart, Star } from "lucide-react-native";
import { getCardStyles } from "../../Styles/CardStyles";
import { useTheme } from "../../Contexts/ThemeContext";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import {
  addWishlistItem,
  removeWishlistItem,
} from "../../Redux/Slices/wishlistSlice";

interface ProductCardProps {
  product: {
    _id: string;
    title: string;
    price: number;
    discount?: number;
    imageCover: { secure_url: string };
    rate?: number;
    stock: number;
  };
  onPress?: () => void;
  onAddToCart?: () => void;
  onToggleWishlist?: () => void;
  isWishlisted?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}) => {
  const { colors } = useTheme();
  const styles = getCardStyles(colors);

  const discountedPrice = product.discount
    ? product.price - product.price * (product.discount / 100)
    : product.price;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={onPress}
    >
      {/* Image & Badges */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: product.imageCover.secure_url }}
          style={styles.image}
        />

        {product.discount ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{product.discount}%</Text>
          </View>
        ) : null}

        {product.stock < 1 ? (
          <View
            style={[
              styles.discountBadge,
              { backgroundColor: "#E63946", left: 10, right: "auto" },
            ]}
          >
            <Text style={styles.discountText}>Out of Stock</Text>
          </View>
        ) : null}

        {/* Wishlist */}
        <TouchableOpacity style={styles.wishlistBtn} onPress={onToggleWishlist}>
          <Heart
            size={20}
            color={isWishlisted ? "#E63946" : colors.subText}
            fill={isWishlisted ? "#E63946" : "transparent"}
          />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Reviews */}
        <View style={styles.ratingRow}>
          <Text style={styles.ratingText}>{product.rate || "4.5"}</Text>
          <Star size={14} color="#FFB000" fill="#FFB000" />
        </View>

        <Text numberOfLines={2} style={styles.title}>
          {product.title}
        </Text>

        <View style={styles.footer}>
          <View style={styles.priceColumn}>
            <View style={styles.priceRow}>
              <Text style={styles.price}>${discountedPrice.toFixed(2)}</Text>
              {product.discount ? (
                <Text style={styles.oldPrice}>${product.price.toFixed(2)}</Text>
              ) : null}
            </View>
          </View>

          {/* Add to Cart Icon Button */}
          <TouchableOpacity
            style={[
              styles.cartBtn,
              product.stock < 1 && { backgroundColor: colors.sage[300] },
            ]}
            onPress={product.stock > 0 ? onAddToCart : undefined}
            activeOpacity={product.stock > 0 ? 0.7 : 1}
            disabled={product.stock < 1}
          >
            <ShoppingCart
              size={20}
              color={product.stock > 0 ? colors.buttonText : colors.subText}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
