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

        {product.stock < 1 && (
          <View
            style={{
              position: "absolute",
              bottom: 10,
              left: 10,
              backgroundColor: "#E63946",
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
              Out of Stock
            </Text>
          </View>
        )}
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
              borderColor:
                product.stock > 0 ? colors.primary : colors.sage[300],
              backgroundColor:
                product.stock > 0 ? "transparent" : colors.sage[100],
            },
          ]}
          onPress={product.stock > 0 ? onMoveToCart : undefined}
          disabled={product.stock < 1}
        >
          <ShoppingCart
            size={18}
            color={product.stock > 0 ? colors.primary : colors.subText}
          />
          <Text
            style={[
              CardStyles.cartText,
              { color: product.stock > 0 ? colors.primary : colors.subText },
            ]}
          >
            {product.stock > 0 ? "Move to Cart" : "Out of Stock"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WishlistCard;
