import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { ShoppingBag } from "lucide-react-native";
import { useTheme } from "../../Contexts/ThemeContext";
import { emptyCartStyles } from "../../Styles/CartStyles";
import { useTranslation } from "react-i18next";
import SharedHeader from "../SharedHeader/SharedHeader";

interface EmptyCartProps {
  onContinueShopping?: () => void;
}

const EmptyCart: React.FC<EmptyCartProps> = ({ onContinueShopping }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <SafeAreaView
      style={[
        emptyCartStyles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <SharedHeader title={t("cart.bagTitle")} />

      {/* EMPTY STATE */}
      <View style={emptyCartStyles.content}>
        <View
          style={[
            emptyCartStyles.iconWrapper,
            { backgroundColor: colors.sage[100] },
          ]}
        >
          <ShoppingBag size={50} color={colors.primary} />
        </View>

        <Text style={[emptyCartStyles.title, { color: colors.text }]}>
          {t("cart.emptyTitle")}
        </Text>

        <Text style={[emptyCartStyles.subtitle, { color: colors.subText }]}>
          {t("cart.emptySubtitle")}
        </Text>

        <TouchableOpacity
          style={[emptyCartStyles.button, { backgroundColor: colors.primary }]}
          onPress={onContinueShopping}
          activeOpacity={0.8}
        >
          <Text
            style={[emptyCartStyles.buttonText, { color: colors.buttonText }]}
          >
            {t("cart.startShopping")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EmptyCart;
