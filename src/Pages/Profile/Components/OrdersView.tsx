import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { ShoppingBag } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { getProfileStyles } from "../../../Styles/ProfileStyles";
import { ThemeColors } from "../../../Constants/theme";

interface OrdersViewProps {
  orders: any[];
  isLoading: boolean;
  setSelectedOrder: (order: any) => void;
  setActiveView: (view: any) => void;
  colors: ThemeColors;
}

const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  isLoading,
  setSelectedOrder,
  setActiveView,
  colors,
}) => {
  const { t } = useTranslation();
  const styles = getProfileStyles(colors);

  return (
    <View style={styles.section}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{ marginTop: 20 }}
        />
      ) : orders.length === 0 ? (
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <ShoppingBag size={48} color={colors.sage[200]} />
          <Text style={{ color: colors.subText, marginTop: 10 }}>
            {t("profile.noOrders")}
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderID}>
                  {t("profile.orderIDPrefix")}-
                  {item._id.substring(0, 8).toUpperCase()}
                </Text>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        item.status === "delivered" ? "#E1F8E9" : "#FFF4E5",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          item.status === "delivered" ? "#2E7D32" : "#D97706",
                      },
                    ]}
                  >
                    {item.status.toUpperCase()}
                  </Text>
                </View>
              </View>
              <View style={styles.orderBody}>
                <Text style={styles.orderDate}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
                <Text style={styles.orderItems}>
                  {item.products.length} {t("profile.items")}
                </Text>
              </View>
              <View style={styles.orderFooter}>
                <Text style={styles.orderTotal}>${item.finalPrice}</Text>
                <TouchableOpacity
                  style={styles.trackingBtn}
                  onPress={() => {
                    setSelectedOrder(item);
                    setActiveView("tracking");
                  }}
                >
                  <Text style={styles.trackingBtnText}>
                    {t("profile.trackOrder")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default OrdersView;
