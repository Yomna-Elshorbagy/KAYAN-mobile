import React, { useEffect } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { useTheme } from "../../Contexts/ThemeContext";
import { getSkeletonStyles } from "../../Styles/ProductSkeletonStyles";

const AccessorySkeleton = () => {
  const { colors } = useTheme();
  const styles = getSkeletonStyles(colors);

  const animatedValue = new Animated.Value(0);
  const pulseValue = new Animated.Value(1);

  useEffect(() => {
    // Shimmer/Glint animation
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: true,
      })
    ).start();

    // Subtle scale pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1.02,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  const GlintOverlay = () => (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        {
          transform: [{ translateX }, { rotate: "25deg" }, { scale: 2 }],
          backgroundColor: colors.primary, // Gold Glint
          opacity: colors.mode === "light" ? 0.15 : 0.1,
        },
      ]}
    />
  );

  const SkeletonItem = ({
    style,
    children,
  }: {
    style: any;
    children?: React.ReactNode;
  }) => (
    <View style={[style, { overflow: "hidden", position: "relative" }]}>
      {children}
      <GlintOverlay />
    </View>
  );

  return (
    <Animated.View
      style={[styles.card, { transform: [{ scale: pulseValue }] }]}
    >
      {/* Gem-cut Image Placeholder */}
      <View style={styles.gemContainer}>
        <SkeletonItem style={styles.gemShape} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Rating Placeholder */}
        <SkeletonItem style={styles.ratingPlaceholder} />

        {/* Title Placeholder */}
        <SkeletonItem style={styles.titlePlaceholder} />
        <SkeletonItem style={styles.titlePlaceholderShort} />

        {/* Footer */}
        <View style={styles.footer}>
          <SkeletonItem style={styles.pricePlaceholder} />
          <SkeletonItem style={styles.cartBtnPlaceholder} />
        </View>
      </View>
    </Animated.View>
  );
};

export default AccessorySkeleton;
