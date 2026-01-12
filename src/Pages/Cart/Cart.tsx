import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../Contexts/ThemeContext";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { Trash2 } from "lucide-react-native";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import {
  fetchCart,
  updateItemQuantity,
  removeCartItem,
  clearCartItems,
} from "../../Redux/Slices/cartSlice";
import CartItem from "../../Components/Cart/CartItem";
import CartSummary from "../../Components/Cart/CartSummary";
import EmptyCart from "../../Components/Cart/EmptyCart";
import SharedHeader from "../../Components/SharedHeader/SharedHeader";
import { cartStyles } from "../../Styles/CartStyles";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../Constants/routes";

type RootStackParamList = {
  Shop: undefined;
  Home: undefined;
  Cart: undefined;
};

const Cart = () => {
  const { colors, theme } = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { cart, isLoading } = useAppSelector((state) => state.cart);

  const navigation = useNavigation<any>();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleContinueShopping = () => {
    navigation.navigate("Shop");
  };

  const handleRemoveItem = (item: any) => {
    dispatch(removeCartItem(item.productId._id));
    Toast.show({
      type: "success",
      text1: t("toasts.removed"),
      text2: `${item.productId.title} ${t("cart.removedToast")}`,
    });
  };

  const handleClearCart = () => {
    dispatch(clearCartItems());
    Toast.show({
      type: "success",
      text1: t("toasts.cleared"),
      text2: t("cart.clearedToast"),
    });
  };

  if (!cart || cart.products.length === 0) {
    return <EmptyCart onContinueShopping={handleContinueShopping} />;
  }

  return (
    <SafeAreaView
      style={[cartStyles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />

      <SharedHeader title={t("cart.bagTitle")} />

      <View style={cartStyles.content}>
        <View style={cartStyles.headerInfo}>
          <View style={{ flex: 1 }}>
            <Text style={[cartStyles.title, { color: colors.text }]}>
              {t("cart.myCart")}
            </Text>
            <Text style={[cartStyles.itemCount, { color: colors.primary }]}>
              ({cart.products.length} {t("cart.items")})
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleClearCart}
            style={[cartStyles.clearBtn, { backgroundColor: colors.card }]}
          >
            <Trash2 size={20} color="#FF4D4D" />
            <Text style={cartStyles.clearText}>{t("cart.clearAll")}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={cart.products}
          keyExtractor={(item) => item.productId._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={cartStyles.listContent}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              onIncrease={() =>
                dispatch(
                  updateItemQuantity({
                    productId: item.productId._id,
                    quantity: item.quantity + 1,
                  })
                )
              }
              onDecrease={() => {
                if (item.quantity > 1) {
                  dispatch(
                    updateItemQuantity({
                      productId: item.productId._id,
                      quantity: item.quantity - 1,
                    })
                  );
                }
              }}
              onDelete={() => handleRemoveItem(item)}
            />
          )}
        />
      </View>

      <CartSummary
        subtotal={cart.totalPrice}
        onCheckout={() => navigation.navigate(ROUTES.CHECKOUT)}
      />
    </SafeAreaView>
  );
};

export default Cart;
