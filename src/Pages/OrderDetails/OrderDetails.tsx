import React, { useEffect } from "react";
import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import SharedHeader from "../../Components/SharedHeader/SharedHeader";
import { useTheme } from "../../Contexts/ThemeContext";
import { getCheckoutStyles } from "../../Styles/CheckoutStyles";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { fetchOrderDetails } from "../../Redux/Slices/orderSlice";

export default function OrderDetails() {
  const { colors } = useTheme();
  const styles = getCheckoutStyles(colors);
  const route = useRoute<any>();
  //==> ask for data
  const dispatch = useAppDispatch();
  const orderId = route.params?.id;
  //==> selector to get data
  const { orderDetails, loading } = useAppSelector((state) => state.order);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderDetails(orderId));
    }
  }, [orderId, dispatch]);

  //==> loader until get data
  if (loading || !orderDetails) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SharedHeader title="Order Details" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Order Status Card */}
        <View style={[styles.summaryCard, { marginTop: 20 }]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.summaryTitle}>
              Status: {orderDetails.status}
            </Text>
            <Ionicons name="receipt-outline" size={24} color={colors.primary} />
          </View>
          <Text style={styles.addressLine}>Order ID: {orderDetails._id}</Text>
          <Text style={styles.addressLine}>
            Date: {new Date(orderDetails.createdAt).toLocaleDateString()}
          </Text>
        </View>

        {/* Products Card */}
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryCard}>
          {orderDetails.products.map((item: any) => (
            <View key={item._id} style={styles.orderItem}>
              {/* Note: The backend order might not have full product objects, so we check */}
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.title}</Text>
                <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
                <Text style={styles.itemPrice}>${item.finalPrice}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Shipping Address Review Card */}
        <Text style={styles.sectionTitle}>Shipping Information</Text>
        <View style={styles.summaryCard}>
          <View style={styles.addressDetails}>
            <Text style={styles.itemName}>{orderDetails.fullName}</Text>
            <Text style={styles.addressLine}>{orderDetails.address}</Text>
            <Text style={styles.addressLine}>{orderDetails.phone}</Text>
          </View>
        </View>

        {/* Payment Card */}
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.summaryCard}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="cash-outline"
              size={20}
              color={colors.text}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.itemName}>Cash on Delivery</Text>
          </View>
        </View>

        {/* Price Breakdown */}
        <View style={styles.breakdownContainer}>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Subtotal</Text>
            <Text style={styles.breakdownValue}>
              ${orderDetails.orderPrice.toFixed(2)}
            </Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Shipping</Text>
            <Text style={[styles.breakdownValue, styles.freeShipping]}>
              Free Shipping
            </Text>
          </View>
          <View style={[styles.breakdownRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalValue}>
              ${orderDetails.finalPrice.toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
