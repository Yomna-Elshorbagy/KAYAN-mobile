import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../Contexts/ThemeContext";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { Trash2 } from "lucide-react-native";
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

const Cart = () => {
  const { colors, theme } = useTheme();
  const dispatch = useAppDispatch();
  const { cart, isLoading } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleContinueShopping = () => {
    // Navigate home or products
  };

  if (!cart || cart.products.length === 0) {
    return <EmptyCart onContinueShopping={handleContinueShopping} />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} />

      <SharedHeader title="Shopping Bag" />

      <View style={styles.content}>
        <View style={styles.headerInfo}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: colors.text }]}>
              My Cart
            </Text>
            <Text style={[styles.itemCount, { color: colors.primary }]}>
              ({cart.products.length} Items)
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => dispatch(clearCartItems())}
            style={[styles.clearBtn, { backgroundColor: colors.card }]}
          >
            <Trash2 size={20} color="#FF4D4D" />
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={cart.products}
          keyExtractor={(item) => item.productId._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
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
              onDelete={() =>
                dispatch(removeCartItem(item.productId._id))
              }
            />
          )}
        />
      </View>

      <CartSummary subtotal={cart.totalPrice} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    fontFamily: "Outfit-Bold",
  },
  itemCount: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Outfit-SemiBold",
  },
  clearBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  clearText: {
    color: "#FF4D4D",
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Outfit-Bold",
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default Cart;
