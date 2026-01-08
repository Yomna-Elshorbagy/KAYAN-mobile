import React from "react";
import { View, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from "react-native-reanimated";
import { useTheme } from "../../../Contexts/ThemeContext";
import { OnBoardStyles } from "../../../Styles/OnBoardStyles";
import { SlideItem } from "./Slide";

const { width } = Dimensions.get("window");

interface PaginationProps {
  scrollX: SharedValue<number>;
  slides: SlideItem[];
}

const Pagination: React.FC<PaginationProps> = ({ scrollX, slides }) => {
  const { colors } = useTheme();

  return (
    <View style={OnBoardStyles.paginationContainer}>
      {slides.map((_, index) => {
        const style = useAnimatedStyle(() => {
          const widthDot = interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [6, 18, 6],
            Extrapolation.CLAMP
          );

          return {
            width: widthDot,
            backgroundColor: colors.primary,
            opacity: 0.6,
          };
        });

        return <Animated.View key={index} style={[OnBoardStyles.dot, style]} />;
      })}
    </View>
  );
};

export default Pagination;
