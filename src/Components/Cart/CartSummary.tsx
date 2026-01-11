import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../Contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { cartSummaryStyles } from "../../Styles/CartStyles";

interface CartSummaryProps {
  subtotal: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const tax = subtotal * 0.05;
  const shipping = 0; // Keeping it free for now
  const total = subtotal + tax + shipping;

  return (
    <View
      style={[
        cartSummaryStyles.container,
        { backgroundColor: colors.card, shadowColor: colors.text },
      ]}
    >
      <SummaryRow label={t("cart.subtotal")} value={`$${subtotal.toFixed(2)}`} />
      <SummaryRow label={t("cart.tax")} value={`$${tax.toFixed(2)}`} />
      <SummaryRow label={t("cart.shipping")} value={t("cart.free")} green />

      <View
        style={[
          cartSummaryStyles.divider,
          { backgroundColor: colors.sage[200] },
        ]}
      />

      <View style={cartSummaryStyles.totalRow}>
        <Text style={[cartSummaryStyles.totalLabel, { color: colors.text }]}>
          {t("cart.totalPrice")}
        </Text>
        <Text style={[cartSummaryStyles.totalValue, { color: colors.primary }]}>
          ${total.toFixed(2)}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          cartSummaryStyles.checkoutBtn,
          { backgroundColor: colors.primary },
        ]}
        activeOpacity={0.8}
      >
        <Text
          style={[cartSummaryStyles.checkoutText, { color: colors.buttonText }]}
        >
          {t("cart.proceedToCheckout")}
        </Text>
      </TouchableOpacity>
    </View>
  );

  function SummaryRow({
    label,
    value,
    green = false,
  }: {
    label: string;
    value: string;
    green?: boolean;
  }) {
    return (
      <View style={cartSummaryStyles.row}>
        <Text style={[cartSummaryStyles.label, { color: colors.subText }]}>
          {label}
        </Text>
        <Text
          style={[
            cartSummaryStyles.value,
            {
              color: green ? "#2D6A4F" : colors.text,
              fontWeight: green ? "700" : "600",
            },
          ]}
        >
          {value}
        </Text>
      </View>
    );
  }
};

export default CartSummary;
