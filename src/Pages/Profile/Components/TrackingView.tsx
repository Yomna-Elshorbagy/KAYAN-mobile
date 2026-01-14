import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { getProfileStyles } from "../../../Styles/ProfileStyles";
import { ThemeColors } from "../../../Constants/theme";

interface TrackingViewProps {
  selectedOrder: any;
  setActiveView: (view: any) => void;
  colors: ThemeColors;
}

const TrackingView: React.FC<TrackingViewProps> = ({
  selectedOrder,
  setActiveView,
  colors,
}) => {
  const { t } = useTranslation();
  const styles = getProfileStyles(colors);

  if (!selectedOrder) return null;

  const steps = [
    {
      id: "placed",
      title: t("profile.orderPlaced"),
      desc: t("profile.orderPlacedDesc"),
    },
    {
      id: "shipping",
      title: t("profile.shipped"),
      desc: t("profile.shippedDesc"),
    },
    {
      id: "completed",
      title: t("profile.delivered"),
      desc: t("profile.deliveredDesc"),
    },
    {
      id: "canceled",
      title: t("profile.canceled"),
      desc: t("profile.canceledDesc"),
    },
    {
      id: "refund",
      title: t("profile.refund"),
      desc: t("profile.refundDesc"),
    },
  ];

  const currentStatusIndex = steps.findIndex(
    (s) => s.id === selectedOrder.status
  );

  return (
    <View style={styles.section}>
      <TouchableOpacity
        style={styles.editHeader}
        onPress={() => setActiveView("orders")}
      >
        <ArrowLeft size={24} color={colors.text} />
        <Text style={styles.editTitle}>{t("profile.trackOrder")}</Text>
      </TouchableOpacity>

      <View style={styles.summaryCard}>
        <Text style={{ fontWeight: "bold", color: colors.text }}>
          {t("profile.orderIDPrefix")} #
          {selectedOrder._id.substring(0, 8).toUpperCase()}
        </Text>
        <Text style={{ color: colors.subText }}>
          {t("profile.status")}: {selectedOrder.status}
        </Text>
      </View>

      <View style={styles.trackingContainer}>
        {steps.map((step, index) => (
          <View key={step.id} style={styles.timelineItem}>
            {index !== steps.length - 1 && <View style={styles.timelineLine} />}
            <View
              style={[
                styles.timelineDot,
                index <= currentStatusIndex && styles.activeTimelineDot,
              ]}
            />
            <View style={styles.timelineContent}>
              <Text
                style={[
                  styles.timelineTitle,
                  index <= currentStatusIndex && { color: colors.primary },
                ]}
              >
                {step.title}
              </Text>
              <Text style={styles.timelineDesc}>{step.desc}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TrackingView;
