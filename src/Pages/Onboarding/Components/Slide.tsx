import React from "react";
import { View, Text, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from "react-native-reanimated";
import { useTheme } from "../../../Contexts/ThemeContext";
import { OnBoardStyles } from "../../../Styles/OnBoardStyles";

const { width } = Dimensions.get("window");

export interface SlideItem {
  id: string;
  image: any;
  title: string;
  description: string;
}

interface SlideProps {
  item: SlideItem;
  index: number;
  scrollX: SharedValue<number>;
}

const Slide: React.FC<SlideProps> = ({ item, index, scrollX }) => {
  const { colors } = useTheme();

  // Image slow parallax
  const imageStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [30, 0, -30],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.95, 1, 0.95],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }, { scale }],
    };
  });

  // Text fade only
  const textStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      [(index - 0.3) * width, index * width, (index + 0.3) * width],
      [0, 1, 0],
      Extrapolation.CLAMP
    );

    return { opacity };
  });

  return (
    <View style={[OnBoardStyles.slide, { backgroundColor: colors.sage[50] }]}>
      <Animated.Image
        source={item.image}
        style={[OnBoardStyles.image, imageStyle]}
        resizeMode="contain"
      />

      <Animated.View style={[OnBoardStyles.textContainer, textStyle]}>
        <Text style={[OnBoardStyles.title, { color: colors.text }]}>
          {item.title}
        </Text>
        <Text style={[OnBoardStyles.description, { color: colors.subText }]}>
          {item.description}
        </Text>
      </Animated.View>
    </View>
  );
};

export default Slide;
