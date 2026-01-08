import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface TabIconProps {
  name: any;
  focused: boolean;
  color: string;
}

const TabIcon = ({ name, focused, color }: TabIconProps) => {
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0.6)).current;

  const floatingAnim = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    // ===> base focus animation
    Animated.parallel([
      Animated.spring(scale, {
        toValue: focused ? 1.2 : 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: focused ? 1 : 0.6,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    if (focused) {
      // ===> reset before starting loop
      translateY.setValue(0);

      floatingAnim.current = Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: -5,
            duration: 850,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 850,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );

      floatingAnim.current.start();
    } else {
      // ===> stop animation and reset position
      floatingAnim.current?.stop();
      translateY.setValue(0);
    }
  }, [focused]);

  return (
    <Animated.View
      style={{
        transform: [{ scale }, { translateY }],
        opacity,
      }}
    >
      <Ionicons name={name} size={24} color={color} />
    </Animated.View>
  );
};

export default TabIcon;
