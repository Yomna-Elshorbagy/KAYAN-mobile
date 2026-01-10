import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Trash2, ShoppingCart } from "lucide-react-native";
import { useTheme } from "../../Contexts/ThemeContext";
import { IProduct } from "../../Interfaces/Iproducts";
import { CardStyles } from "../../Styles/WishlistStyles";

interface Props {
  product: IProduct;
  onRemove: () => void;
  onMoveToCart: () => void;
}

const WishlistCard: React.FC<Props> = ({ product, onRemove, onMoveToCart }) => {
  const { colors } = useTheme();

  return (
    <View style={[CardStyles.card, { backgroundColor: colors.card }]}>
      {/* Image */}
      <View style={CardStyles.imageWrapper}>
        <Image
          source={{ uri: product.imageCover?.secure_url }}
          style={CardStyles.image}
        />

        {/* Remove Icon */}
        <TouchableOpacity
          style={[
            CardStyles.removeBtn,
            { backgroundColor: colors.inputBackground },
          ]}
          onPress={onRemove}
        >
          <Trash2 size={16} color="#E63946" />
        </TouchableOpacity>
      </View>

      {/* Info */}
      <View style={CardStyles.content}>
        <Text style={[CardStyles.title, { color: colors.text }]}>
          {product.title}
        </Text>

        <Text style={[CardStyles.price, { color: colors.primary }]}>
          ${product.price}
        </Text>

        <TouchableOpacity
          style={[
            CardStyles.cartBtn,
            {
              borderColor: colors.primary,
            },
          ]}
          onPress={onMoveToCart}
        >
          <ShoppingCart size={18} color={colors.primary} />
          <Text style={[CardStyles.cartText, { color: colors.primary }]}>
            Move to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WishlistCard;
