import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ShoppingBag } from "lucide-react-native";
import { useTheme } from "../../Contexts/ThemeContext";
import { emptyCartStyles } from "../../Styles/CartStyles";

interface EmptyCartProps {
  onContinueShopping?: () => void;
}

const EmptyCart: React.FC<EmptyCartProps> = ({ onContinueShopping }) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        emptyCartStyles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <View
        style={[
          emptyCartStyles.iconContainer,
          { backgroundColor: colors.card },
        ]}
      >
        <View
          style={[
            emptyCartStyles.iconWrapper,
            { backgroundColor: colors.sage[100] },
          ]}
        >
          <ShoppingBag size={40} color={colors.primary} />
        </View>
      </View>

      <Text style={[emptyCartStyles.title, { color: colors.text }]}>
        Your bag is empty
      </Text>

      <Text style={[emptyCartStyles.subtitle, { color: colors.subText }]}>
        Looks like you haven't added anything to your cart yet. Explore our
        latest arrivals.
      </Text>

      <TouchableOpacity
        style={[emptyCartStyles.button, { backgroundColor: colors.primary }]}
        onPress={onContinueShopping}
        activeOpacity={0.8}
      >
        <Text
          style={[emptyCartStyles.buttonText, { color: colors.buttonText }]}
        >
          Start Shopping
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyCart;
