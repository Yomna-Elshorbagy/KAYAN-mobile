import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Minus, Plus, Trash2 } from "lucide-react-native";
import { useTheme } from "../../Contexts/ThemeContext";
import { CartProduct } from "../../Interfaces/ICart";
import { cartItemStyles } from "../../Styles/CartStyles";

interface CartItemProps {
  item: CartProduct;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrease,
  onDecrease,
  onDelete,
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        cartItemStyles.container,
        { backgroundColor: colors.card, shadowColor: colors.text },
      ]}
    >
      {/* Product Image */}
      <View style={cartItemStyles.imageContainer}>
        <Image
          source={{ uri: item.productId.imageCover.secure_url }}
          style={cartItemStyles.image}
          resizeMode="cover"
        />
      </View>

      {/* Content */}
      <View style={cartItemStyles.content}>
        <View style={cartItemStyles.headerRow}>
          <Text
            style={[cartItemStyles.title, { color: colors.text }]}
            numberOfLines={2}
          >
            {item.productId.title}
          </Text>
          <TouchableOpacity
            onPress={onDelete}
            style={cartItemStyles.deleteButton}
          >
            <Trash2 size={18} color="#FF4D4D" />
          </TouchableOpacity>
        </View>

        {item.productId.category?.name && (
          <Text style={[cartItemStyles.category, { color: colors.primary }]}>
            {item.productId.category.name}
          </Text>
        )}

        <View style={cartItemStyles.footerRow}>
          <Text style={[cartItemStyles.price, { color: colors.text }]}>
            ${item.price.toFixed(2)}
          </Text>

          {/* Quantity Controls */}
          <View
            style={[
              cartItemStyles.quantityBox,
              {
                backgroundColor: colors.background,
                borderColor: colors.sage[300],
              },
            ]}
          >
            <TouchableOpacity
              onPress={onDecrease}
              style={cartItemStyles.qtyBtn}
            >
              <Minus size={14} color={colors.text} />
            </TouchableOpacity>

            <Text style={[cartItemStyles.quantityText, { color: colors.text }]}>
              {item.quantity}
            </Text>

            <TouchableOpacity
              onPress={onIncrease}
              style={cartItemStyles.qtyBtn}
            >
              <Plus size={14} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
